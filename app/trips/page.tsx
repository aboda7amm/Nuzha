"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Compass, ChevronDown } from "lucide-react"
import { useApp } from "@/contexts/AppContext"

export default function TripsPage() {
  const router = useRouter()
  const { theme, language, t } = useApp()

  const trips = [
    {
      id: "1",
      title: language === 'ar' ? "رحلة سابقة" : "Past Trip",
      reserve: language === 'ar' ? "محمية الإمام سعود بن عبدالعزيز الملكية" : "Imam Saud bin Abdulaziz Royal Reserve",
      type: language === 'ar' ? "نوع الرحلة" : "Trip Type",
      date: language === 'ar' ? "20 نوفمبر - 21 نوفمبر" : "November 20 - November 21",
      animal: "🦌",
    },
    {
      id: "2",
      title: language === 'ar' ? "رحلة سابقة" : "Past Trip",
      reserve: language === 'ar' ? "محمية فرسان" : "Farasan Reserve",
      type: language === 'ar' ? "نوع الرحلة" : "Trip Type",
      date: language === 'ar' ? "9 يناير - 20 يناير" : "January 9 - January 20",
      animal: "🦅",
    },
    {
      id: "3",
      title: language === 'ar' ? "رحلة سابقة" : "Past Trip",
      reserve: language === 'ar' ? "محمية شدا الأعلى" : "Shada Al-A'la Reserve",
      type: language === 'ar' ? "نوع الرحلة" : "Trip Type",
      date: language === 'ar' ? "12 سبتمبر - 17 سبتمبر" : "September 12 - September 17",
      animal: "🐺",
    },
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
            <Compass className={`w-10 h-10 ${theme === 'dark' ? 'text-yellow-400' : 'text-[#c4a35a]'} mb-2`} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{t('trips')}</h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Year Section */}
        <div className="w-full max-w-md mx-auto mb-4">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} ${language === 'ar' ? 'text-right' : 'text-left'}`}>2024 {language === 'ar' ? '←' : '→'}</h2>
        </div>

        {/* Trips List */}
        <div className="w-full max-w-md mx-auto space-y-4 mb-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-5 flex items-center justify-between shadow-sm`}
            >
              <div className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'} space-y-1`}>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{trip.title}</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{trip.reserve}</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{trip.type}</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{trip.date}</p>
              </div>
              <div className={`text-5xl ${language === 'ar' ? 'mr-4' : 'ml-4'}`}>{trip.animal}</div>
            </div>
          ))}
        </div>

        {/* More Button */}
        <div className="w-full max-w-md mx-auto">
          <button className={`w-full text-center ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium flex items-center justify-center gap-2`}>
            {language === 'ar' ? 'المزيد' : 'More'}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
