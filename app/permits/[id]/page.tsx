"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface Permit {
  id: string
  type: string
  visitDate: string
  status: string
  qrCode: string
  durationHours?: number
  livestockCount?: number
  protectedArea: { name: string }
  user: { fullName: string }
}

export default function PermitDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [permit, setPermit] = useState<Permit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPermit = async () => {
      try {
        const response = await fetch(`/api/permits/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setPermit(data)
        }
      } catch (error) {
        console.error("Failed to fetch permit:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPermit()
    }
  }, [params.id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "موافق عليه"
      case "PENDING":
        return "قيد الانتظار"
      case "REJECTED":
        return "مرفوض"
      default:
        return status
    }
  }

  const getTypeLabel = (type: string) => {
    return type === "VISIT" ? "تنزه" : "رعي"
  }

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-background p-4 flex items-center justify-center">
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    )
  }

  if (!permit) {
    return (
      <div dir="rtl" className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <p className="text-center text-muted-foreground mt-8">التصريح غير موجود</p>
        </div>
      </div>
    )
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-6">
          <h1 className="text-3xl font-bold text-primary">تفاصيل التصريح</h1>
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Permit Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-primary">{permit.protectedArea.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {getTypeLabel(permit.type)} - {new Date(permit.visitDate).toLocaleDateString("ar-SA")}
                </p>
              </div>
              <Badge className={getStatusColor(permit.status)}>{getStatusLabel(permit.status)}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">نوع التصريح</p>
                <p className="font-semibold">{getTypeLabel(permit.type)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الحالة</p>
                <p className="font-semibold">{getStatusLabel(permit.status)}</p>
              </div>
              {permit.durationHours && (
                <div>
                  <p className="text-sm text-muted-foreground">مدة الزيارة</p>
                  <p className="font-semibold">{permit.durationHours} ساعات</p>
                </div>
              )}
              {permit.livestockCount && (
                <div>
                  <p className="text-sm text-muted-foreground">عدد المواشي</p>
                  <p className="font-semibold">{permit.livestockCount}</p>
                </div>
              )}
            </div>

            {/* QR Code */}
            <div className="mt-6 p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">رمز QR</p>
              <p className="font-mono text-sm font-semibold break-all">{permit.qrCode}</p>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <Button onClick={() => router.push("/permits")} variant="outline" className="w-full">
          العودة إلى رحلاتي
        </Button>
      </div>
    </div>
  )
}
