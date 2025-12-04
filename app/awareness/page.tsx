"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Leaf, FileText, ClipboardList, Shield } from "lucide-react"
import { useApp } from "@/contexts/AppContext"

export default function AwarenessPage() {
  const router = useRouter()
  const { theme, language, t } = useApp()

  const sections = [
    {
      id: "1",
      title: language === 'ar' ? "السلوك البيئي الصحيح داخل المحميات" : "Proper Environmental Behavior in Reserves",
      icon: <Leaf className="w-6 h-6" />,
      href: "#",
    },
    {
      id: "2",
      title: language === 'ar' ? "مقالات" : "Articles",
      icon: <FileText className="w-6 h-6" />,
      href: "#",
    },
    {
      id: "3",
      title: language === 'ar' ? "تقارير المحميات" : "Reserve Reports",
      icon: <ClipboardList className="w-6 h-6" />,
      href: "#",
    },
    {
      id: "4",
      title: language === 'ar' ? "نصائح السلامة" : "Safety Tips",
      icon: <Shield className="w-6 h-6" />,
      href: "#",
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
            <ArrowRight className={`w-5 h-5 text-gray-700 ${language === 'en' ? 'rotate-180' : ''}`} />
          </Button>
          
          <div className="flex flex-col items-center">
            <BookOpen className={`w-10 h-10 ${theme === 'dark' ? 'text-green-400' : 'text-[#4a7c59]'} mb-2`} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{t('awareness')}</h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Sections */}
        <div className="w-full max-w-md mx-auto space-y-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => section.href !== "#" && router.push(section.href)}
              className={`w-full ${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'} rounded-2xl p-5 flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} transition-all shadow-sm hover:shadow-md`}
            >
              <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{section.icon}</div>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} font-medium text-lg`}>{section.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
