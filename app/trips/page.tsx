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
      title: "رحلة سابقة",
      reserve: "محمية الإمام سعود بن عبدالعزيز الملكية",
      type: "نوع الرحلة",
      date: "20 نوفمبر - 21 نوفمبر",
      animal: "🦌", // غزال
    },
    {
      id: "2",
      title: "رحلة سابقة",
      reserve: "محمية فرسان",
      type: "نوع الرحلة",
      date: "9 يناير - 20 يناير",
      animal: "🦅", // طائر
    },
    {
      id: "3",
      title: "رحلة سابقة",
      reserve: "محمية شدا الأعلى",
      type: "نوع الرحلة",
      date: "12 سبتمبر - 17 سبتمبر",
      animal: "🐺", // ضبع
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
            className="bg-white/80 hover:bg-white rounded-full"
          >
            <ArrowRight className="w-5 h-5 text-gray-700" />
          </Button>
          
          <div className="flex flex-col items-center">
            <Compass className="w-10 h-10 text-[#c4a35a] mb-2" />
            <h1 className="text-2xl font-bold text-gray-800">رحلاتي السابقة</h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Year Section */}
        <div className="w-full max-w-md mx-auto mb-4">
          <h2 className="text-lg font-semibold text-gray-700 text-right">2024 ←</h2>
        </div>

        {/* Trips List */}
        <div className="w-full max-w-md mx-auto space-y-4 mb-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white/80 rounded-2xl p-5 flex items-center justify-between shadow-sm"
            >
              <div className="flex-1 text-right space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">{trip.title}</h3>
                <p className="text-sm text-gray-600">{trip.reserve}</p>
                <p className="text-xs text-gray-500">{trip.type}</p>
                <p className="text-xs text-gray-500">{trip.date}</p>
              </div>
              <div className="text-5xl mr-4">{trip.animal}</div>
            </div>
          ))}
        </div>

        {/* More Button */}
        <div className="w-full max-w-md mx-auto">
          <button className="w-full text-center text-gray-700 font-medium flex items-center justify-center gap-2">
            المزيد
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
