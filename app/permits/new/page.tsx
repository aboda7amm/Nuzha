"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"

interface ProtectedArea {
  id: string
  name: string
}

export default function NewPermitPage() {
  const router = useRouter()
  const [areas, setAreas] = useState<ProtectedArea[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: "VISIT",
    protectedAreaId: "",
    visitDate: "",
    durationHours: "",
    livestockCount: "",
  })

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("/api/protected-areas")
        const data = await response.json()
        setAreas(data)
      } catch (error) {
        console.error("Failed to fetch areas:", error)
      }
    }

    fetchAreas()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/permits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "demo-user",
          protectedAreaId: formData.protectedAreaId,
          type: formData.type,
          visitDate: formData.visitDate,
          durationHours: formData.durationHours ? Number.parseInt(formData.durationHours) : null,
          livestockCount: formData.livestockCount ? Number.parseInt(formData.livestockCount) : null,
        }),
      })

      if (response.ok) {
        router.push("/permits")
      }
    } catch (error) {
      console.error("Failed to create permit:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-6">
          <h1 className="text-3xl font-bold text-primary">إصدار تصريح جديد</h1>
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>نموذج طلب التصريح</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Permit Type */}
              <div className="space-y-2">
                <Label htmlFor="type">نوع التصريح</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VISIT">تنزه</SelectItem>
                    <SelectItem value="GRAZING">رعي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Protected Area */}
              <div className="space-y-2">
                <Label htmlFor="area">اختيار المحمية</Label>
                <Select
                  value={formData.protectedAreaId}
                  onValueChange={(value) => setFormData({ ...formData, protectedAreaId: value })}
                >
                  <SelectTrigger id="area">
                    <SelectValue placeholder="اختر محمية" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Visit Date */}
              <div className="space-y-2">
                <Label htmlFor="date">تاريخ الزيارة</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  required
                />
              </div>

              {/* Duration Hours */}
              <div className="space-y-2">
                <Label htmlFor="duration">مدة الزيارة (ساعات)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  value={formData.durationHours}
                  onChange={(e) => setFormData({ ...formData, durationHours: e.target.value })}
                  placeholder="اتركها فارغة إن لم تكن مطلوبة"
                />
              </div>

              {/* Livestock Count (only for grazing) */}
              {formData.type === "GRAZING" && (
                <div className="space-y-2">
                  <Label htmlFor="livestock">عدد المواشي</Label>
                  <Input
                    id="livestock"
                    type="number"
                    min="0"
                    value={formData.livestockCount}
                    onChange={(e) => setFormData({ ...formData, livestockCount: e.target.value })}
                    placeholder="أدخل عدد المواشي"
                  />
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "جاري الإرسال..." : "إرسال الطلب"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
