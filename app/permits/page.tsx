"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useApp } from "@/contexts/AppContext"

export default function PermitsPage() {
  const router = useRouter()
  const { theme, language, t } = useApp()
  const [permitType, setPermitType] = useState("")
  const [reserve, setReserve] = useState("")
  const [duration, setDuration] = useState("")
  const [livestockCount, setLivestockCount] = useState("")

  const reserves = [
    "محمية الإمام سعود بن عبدالعزيز الملكية",
    "محمية فرسان",
    "محمية شدا الأعلى",
    "محمية حرة الحرة",
    "جزر فرسان",
  ]

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
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-900/80' : 'bg-[#f5efe1]/70'}`}></div>

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
          
          <div className="flex flex-col items-center">
            <FileText className={`w-10 h-10 ${theme === 'dark' ? 'text-yellow-400' : 'text-[#c4a35a]'} mb-2`} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{t('permits')}</h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Form Title */}
        <div className="w-full max-w-md mx-auto mb-6">
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {t('submit_request')}
          </h2>
        </div>

        {/* Form Fields */}
        <div className="w-full max-w-md mx-auto space-y-4">
          {/* نوع التصريح */}
          <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-4`}>
            <Select value={permitType} onValueChange={setPermitType}>
              <SelectTrigger className={`w-full border-0 bg-transparent ${language === 'ar' ? 'text-right' : 'text-left'} ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                <SelectValue placeholder={t('permit_type')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visit">{t('visit_permit')}</SelectItem>
                <SelectItem value="grazing">{t('grazing_permit')}</SelectItem>
                <SelectItem value="research">{t('research_permit')}</SelectItem>
                <SelectItem value="photography">{t('photography_permit')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* المحميات */}
          <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-4`}>
            <Select value={reserve} onValueChange={setReserve}>
              <SelectTrigger className={`w-full border-0 bg-transparent ${language === 'ar' ? 'text-right' : 'text-left'} ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                <SelectValue placeholder={t('reserve')} />
              </SelectTrigger>
              <SelectContent>
                {reserves.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* مدة التصريح */}
          <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-4`}>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className={`w-full border-0 bg-transparent ${language === 'ar' ? 'text-right' : 'text-left'} ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                <SelectValue placeholder={t('duration')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1day">{t('1day')}</SelectItem>
                <SelectItem value="3days">{t('3days')}</SelectItem>
                <SelectItem value="week">{t('week')}</SelectItem>
                <SelectItem value="month">{t('month')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* عدد الماشية - يظهر فقط لتصريح الرعي */}
          {permitType === "grazing" && (
            <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-4`}>
              <input
                type="number"
                value={livestockCount}
                onChange={(e) => setLivestockCount(e.target.value)}
                placeholder={language === 'ar' ? "عدد الماشية" : "Number of Livestock"}
                className={`w-full border-0 bg-transparent ${language === 'ar' ? 'text-right' : 'text-left'} ${theme === 'dark' ? 'text-gray-200 placeholder:text-gray-400' : 'text-gray-800 placeholder:text-gray-500'} outline-none`}
              />
            </div>
          )}

          {/* السعر */}
          <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-4 flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'}`}>
            <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>
              {language === 'ar' ? 'السعر:' : 'Price:'}
            </span>
            <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
              {language === 'ar' ? 'يُحدد من قبل الجهات المعنية' : 'Determined by authorities'}
            </span>
          </div>

          {/* Submit Button */}
          <Button
            onClick={() => {
              if (permitType && reserve && duration) {
                router.push(`/permit-card?type=${permitType}&reserve=${encodeURIComponent(reserve)}&duration=${duration}`)
              }
            }}
            disabled={!permitType || !reserve || !duration}
            className={`w-full py-6 rounded-2xl text-lg font-semibold transition-all ${
              !permitType || !reserve || !duration
                ? theme === 'dark' 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : theme === 'dark'
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-[#c4a35a] hover:bg-[#b39350] text-white'
            }`}
          >
            {t('submit_request')}
          </Button>
        </div>
      </div>
    </div>
  )
}
