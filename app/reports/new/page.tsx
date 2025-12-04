"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, AlertTriangle, Upload, X, Image, Video } from "lucide-react"
import { useApp } from "@/contexts/AppContext"

export default function NewReportPage() {
  const router = useRouter()
  const { theme, language, t } = useApp()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    protectedArea: "",
    title: "",
    description: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Create preview for images and videos
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
  }

  const protectedAreas = language === 'ar'
    ? [
        "محمية الإمام تركي بن عبدالله الملكية",
        "محمية الملك عبدالعزيز الملكية",
        "محمية الملك سلمان الملكية",
        "محمية الأمير محمد بن سلمان الملكية",
        "محمية حرة الحرة",
      ]
    : [
        "Imam Turki bin Abdullah Royal Reserve",
        "King Abdulaziz Royal Reserve",
        "King Salman Royal Reserve",
        "Prince Mohammed bin Salman Royal Reserve",
        "Harrat Al-Harrah Reserve",
      ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "demo-user",
          protectedAreaId: formData.protectedArea,
          description: `${formData.title}\n\n${formData.description}`,
          lat: null,
          lng: null,
          imageUrl: null,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => router.push("/dashboard"), 2000)
      }
    } catch (error) {
      console.error("Failed to create report:", error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div 
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: 'url(/desert-bg-report.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-900/70' : 'bg-[#f5efe1]/60'}`}></div>
        <div className={`relative z-10 ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-3xl p-8 max-w-md mx-4 text-center`}>
          <div className="text-green-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-800'} mb-2`}>
            {language === 'ar' ? 'تم إرسال البلاغ بنجاح!' : 'Report Submitted Successfully!'}
          </h2>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            {language === 'ar' ? 'سيتم إعادة توجيهك قريباً...' : 'Redirecting soon...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/desert-bg-report.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-900/70' : 'bg-[#f5efe1]/60'}`}></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen py-8 px-4">
        {/* Header */}
        <div className="w-full max-w-md mb-8 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className={`${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-800' : 'bg-white/80 hover:bg-white'} rounded-full`}
          >
            <ArrowRight className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} ${language === 'en' ? 'rotate-180' : ''}`} />
          </Button>
          
          <div className="flex flex-col items-center">
            <AlertTriangle className={`w-10 h-10 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'} mb-2`} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{t('report')}</h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Form Card */}
        <div className={`w-full max-w-md ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-3xl p-8 shadow-lg`}>
          <h2 className={`text-xl font-bold text-center ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-6`}>{t('report')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Protected Area Select */}
            <div className="space-y-2">
              <Select
                value={formData.protectedArea}
                onValueChange={(value) => setFormData({ ...formData, protectedArea: value })}
                required
              >
                <SelectTrigger className={`w-full bg-white border-gray-200 rounded-xl h-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <SelectValue placeholder={language === 'ar' ? "اختر المحمية" : "Select Reserve"} />
                </SelectTrigger>
                <SelectContent>
                  {protectedAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Input
                id="title"
                placeholder={language === 'ar' ? "عنوان البلاغ" : "Report Title"}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className={`bg-white border-gray-200 rounded-xl h-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Textarea
                id="description"
                placeholder={language === 'ar' ? "تفاصيل البلاغ" : "Report Details"}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className={`bg-white border-gray-200 rounded-xl min-h-32 ${language === 'ar' ? 'text-right' : 'text-left'} resize-none`}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label className="text-gray-700 text-sm">
                {language === 'ar' ? 'إرفاق صورة أو فيديو (اختياري)' : 'Attach Image or Video (Optional)'}
              </Label>
              
              {!selectedFile ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'اضغط لاختيار صورة أو فيديو' : 'Click to select image or video'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {language === 'ar' ? 'PNG, JPG, MP4 (حتى 10MB)' : 'PNG, JPG, MP4 (up to 10MB)'}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div className="relative bg-gray-100 rounded-xl p-4">
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {selectedFile.type.startsWith('image/') ? (
                    <div className="flex items-center gap-3">
                      <Image className="w-8 h-8 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-700">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      {filePreview && (
                        <img src={filePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Video className="w-8 h-8 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-700">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-green-800 hover:bg-green-900 text-white rounded-full h-12 text-lg font-semibold mt-6"
            >
              {loading 
                ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') 
                : (language === 'ar' ? 'تأكيد' : 'Confirm')
              }
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
