"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, User, Printer, Share2 } from "lucide-react"
import QRCode from "react-qr-code"
import { useApp } from "@/contexts/AppContext"
import "./permit-card.css"

export default function PermitCardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cardRef = useRef<HTMLDivElement>(null)
  const [permitId, setPermitId] = useState("")
  const { theme, language, t } = useApp()

  const permitType = searchParams.get("type") || "visit"
  const reserve = searchParams.get("reserve") || (language === 'ar' ? "محمية فرسان" : "Farasan Reserve")
  const duration = searchParams.get("duration") || "1day"
  const livestockCount = searchParams.get("livestock") || ""

  useEffect(() => {
    // Generate unique permit ID
    const id = `NZH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    setPermitId(id)
  }, [])

  const getPermitTitle = () => {
    const titles = {
      ar: {
        visit: "تصريح زيارة",
        grazing: "تصريح رعي",
        research: "تصريح بحثي",
        photography: "تصريح تصوير"
      },
      en: {
        visit: "Visit Permit",
        grazing: "Grazing Permit",
        research: "Research Permit",
        photography: "Photography Permit"
      }
    }
    return titles[language][permitType as keyof typeof titles.ar] || (language === 'ar' ? "تصريح دخول المحمية" : "Reserve Entry Permit")
  }

  const getDurationText = () => {
    const durations = {
      ar: {
        "1day": "يوم واحد",
        "3days": "3 أيام",
        "week": "أسبوع",
        "month": "شهر"
      },
      en: {
        "1day": "1 Day",
        "3days": "3 Days",
        "week": "Week",
        "month": "Month"
      }
    }
    return durations[language][duration as keyof typeof durations.ar] || duration
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    const shareData = {
      title: language === 'ar' ? 'تصريح دخول المحمية - نُزهة' : 'Reserve Entry Permit - Nuzha',
      text: language === 'ar' 
        ? `تصريح دخول ${reserve} - رقم التصريح: ${permitId}`
        : `Entry permit for ${reserve} - Permit ID: ${permitId}`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert(language === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  // QR Code data
  const qrData = JSON.stringify({
    id: permitId,
    type: permitType,
    reserve: reserve,
    duration: duration,
    date: new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US'),
    holder: language === 'ar' ? 'عبدالرحمن العتيبي' : 'Abdulrahman Al-Otaibi',
  })

  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/desert-full-bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-900/80' : 'bg-[#f5efe1]/90'}`}></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen py-8 px-4">
        {/* Header */}
        <div className="w-full max-w-md mx-auto mb-8 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className={`${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-800' : 'bg-white/80 hover:bg-white'} rounded-full`}
          >
            <ArrowRight className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} ${language === 'en' ? 'rotate-180' : ''}`} />
          </Button>
          
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
            {t('permits')}
          </h1>
          
          <div className="w-10"></div>
        </div>

        {/* Page Title */}
        <div className="w-full max-w-md mx-auto mb-6">
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} text-center`}>
            {t('permit_card')}
          </h2>
        </div>

        {/* Permit Card */}
        <div 
          ref={cardRef}
          id="permit-card" 
          className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{
            color: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(255, 255, 255)'
          }}
        >
          {/* Green Header */}
          <div className="bg-green-700 text-white py-6 px-6 text-center" style={{backgroundColor: 'rgb(21, 128, 61)', color: 'rgb(255, 255, 255)'}}>
            <h2 className="text-2xl font-bold">
              {t('reserve_entry_permit')}
            </h2>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-6">
            {/* User Info Section */}
            <div className={`flex items-center gap-4 pb-4 border-b border-gray-200 ${language === 'en' ? 'flex-row' : 'flex-row'}`}>
              {/* Avatar */}
              <div className="w-28 h-28 bg-gray-300 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                <User className="w-14 h-14 text-gray-500" />
              </div>

              {/* User Details */}
              <div className="flex-1 space-y-3">
                <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Cairo, sans-serif'}}>
                  {language === 'ar' ? 'عبدالرحمن العتيبي' : 'Abdulrahman Al-Otaibi'}
                </h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{t('id_number')}:</p>
                  <p className="text-lg font-bold text-gray-800">1234567890</p>
                </div>
              </div>
            </div>

            {/* Date and QR Section */}
            <div className={`flex ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} items-start gap-4`}>
              <div className={`space-y-1 flex-1 ${language === 'en' ? 'text-left' : 'text-right'}`}>
                <p className="text-sm text-gray-500">{t('issue_date')}</p>
                <p className="text-base font-bold text-gray-800">
                  {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  {language === 'ar' ? 'رقم التصريح' : 'Permit Number'}
                </p>
                <p className="text-sm font-bold text-gray-800 font-mono">{permitId}</p>
              </div>
              
              {/* QR Code */}
              {permitId && (
                <div className="bg-white p-3 rounded-xl border-2 border-gray-200 shadow-sm">
                  <QRCode 
                    value={qrData} 
                    size={100}
                    level="H"
                  />
                </div>
              )}
            </div>

            {/* Permit Details */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 space-y-3">
              <div className={`flex ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} items-center py-2 border-b border-gray-200`}>
                <span className="text-base text-gray-600">
                  {language === 'ar' ? 'نوع التصريح:' : 'Permit Type:'}
                </span>
                <span className="text-lg font-bold text-gray-900">{getPermitTitle()}</span>
              </div>
              <div className={`flex ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} items-center py-2 border-b border-gray-200`}>
                <span className="text-base text-gray-600">
                  {language === 'ar' ? 'المحمية:' : 'Reserve:'}
                </span>
                <span className="text-lg font-bold text-gray-900">{reserve}</span>
              </div>
              <div className={`flex ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} items-center py-2`}>
                <span className="text-base text-gray-600">
                  {language === 'ar' ? 'المدة:' : 'Duration:'}
                </span>
                <span className="text-lg font-bold text-gray-900">{getDurationText()}</span>
              </div>
              {livestockCount && (
                <div className={`flex ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} items-center py-2 border-t border-gray-200`}>
                  <span className="text-base text-gray-600">
                    {language === 'ar' ? 'عدد رؤوس الماشية:' : 'Livestock Count:'}
                  </span>
                  <span className="text-lg font-bold text-gray-900">{livestockCount}</span>
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-500 mb-3">{t('permit_status')}:</p>
              <div className="inline-block bg-gradient-to-r from-green-700 to-green-600 text-white px-16 py-5 rounded-2xl shadow-lg" style={{backgroundColor: 'rgb(21, 128, 61)', color: 'rgb(255, 255, 255)'}}>
                <p className="text-3xl font-bold">{t('active')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md mx-auto mt-6 grid grid-cols-2 gap-3 print:hidden">
          <Button
            className="bg-gradient-to-r from-[#c4a35a] to-[#d4b36a] hover:from-[#b39350] hover:to-[#c4a35a] text-white py-6 rounded-2xl text-lg font-semibold shadow-lg flex items-center justify-center gap-2"
            onClick={handlePrint}
          >
            <Printer className="w-5 h-5" />
            {language === 'ar' ? 'طباعة البطاقة' : 'Print Card'}
          </Button>

          <Button
            variant="outline"
            className="py-6 rounded-2xl text-lg font-semibold border-2 flex items-center justify-center gap-2"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
            {language === 'ar' ? 'مشاركة' : 'Share'}
          </Button>
        </div>
      </div>
    </div>
  )
}
