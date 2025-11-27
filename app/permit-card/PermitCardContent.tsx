"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, User } from "lucide-react"
import "./permit-card.css"

export default function PermitCardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const permitType = searchParams.get("type") || "تصريح زيارة"
  const reserve = searchParams.get("reserve") || "محمية فرسان"
  const duration = searchParams.get("duration") || "يوم واحد"
  const livestockCount = searchParams.get("livestock") || ""

  const getPermitTitle = () => {
    switch(permitType) {
      case "visit": return "تصريح زيارة"
      case "grazing": return "تصريح رعي"
      case "research": return "تصريح بحثي"
      case "photography": return "تصريح تصوير"
      default: return "تصريح دخول المحمية"
    }
  }

  const getDurationText = () => {
    switch(duration) {
      case "1day": return "يوم واحد"
      case "3days": return "3 أيام"
      case "week": return "أسبوع"
      case "month": return "شهر"
      default: return duration
    }
  }

  return (
    <div 
      dir="rtl" 
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
      <div className="absolute inset-0 bg-[#f5efe1]/90"></div>

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
          
          <h1 className="text-2xl font-bold text-gray-800">التصاريح</h1>
          
          <div className="w-10"></div>
        </div>

        {/* Page Title */}
        <div className="w-full max-w-md mx-auto mb-6">
          <h2 className="text-xl font-semibold text-gray-800 text-center">بطاقة تصريح</h2>
        </div>

        {/* Permit Card */}
        <div 
          id="permit-card" 
          className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{
            color: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(255, 255, 255)'
          }}
        >
          {/* Green Header */}
          <div className="bg-green-700 text-white py-6 px-6 text-center" style={{backgroundColor: 'rgb(21, 128, 61)', color: 'rgb(255, 255, 255)'}}>
            <h2 className="text-2xl font-bold">تصريح دخول المحمية</h2>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-6">
            {/* User Info Section */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              {/* Avatar */}
              <div className="w-28 h-28 bg-gray-300 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                <User className="w-14 h-14 text-gray-500" />
              </div>

              {/* User Details */}
              <div className="flex-1 space-y-3">
                <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Cairo, sans-serif'}}>عبدالرحمن العتيبي</h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">رقم الهوية:</p>
                  <p className="text-lg font-bold text-gray-800">1234567890</p>
                </div>
              </div>
            </div>

            {/* Date Section */}
            <div className="space-y-1">
              <p className="text-sm text-gray-500">تاريخ الإصدار</p>
              <p className="text-base font-bold text-gray-800">{new Date().toLocaleDateString('ar-SA')}</p>
            </div>

            {/* Permit Details */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-base text-gray-600">نوع التصريح:</span>
                <span className="text-lg font-bold text-gray-900">{getPermitTitle()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-base text-gray-600">المحمية:</span>
                <span className="text-lg font-bold text-gray-900">{reserve}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-base text-gray-600">المدة:</span>
                <span className="text-lg font-bold text-gray-900">{getDurationText()}</span>
              </div>
              {livestockCount && (
                <div className="flex justify-between items-center py-2 border-t border-gray-200">
                  <span className="text-base text-gray-600">عدد رؤوس الماشية:</span>
                  <span className="text-lg font-bold text-gray-900">{livestockCount}</span>
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-500 mb-3">حالة التصريح:</p>
              <div className="inline-block bg-gradient-to-r from-green-700 to-green-600 text-white px-16 py-5 rounded-2xl shadow-lg" style={{backgroundColor: 'rgb(21, 128, 61)', color: 'rgb(255, 255, 255)'}}>
                <p className="text-3xl font-bold">فعّال</p>
              </div>
            </div>

            {/* Permit ID */}
            <div className="text-center pt-2 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">رقم التصريح:</p>
              <p className="text-xl font-bold text-gray-900 font-mono">
                {Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
