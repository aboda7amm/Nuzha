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
      title: "السلوك البيئي الصحيح داخل المحميات",
      icon: <Leaf className="w-6 h-6" />,
      href: "#",
    },
    {
      id: "2",
      title: "مقالات",
      icon: <FileText className="w-6 h-6" />,
      href: "#",
    },
    {
      id: "3",
      title: "تقارير المحميات",
      icon: <ClipboardList className="w-6 h-6" />,
      href: "#",
    },
    {
      id: "4",
      title: "نصائح السلامة",
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
            className="bg-white/80 hover:bg-white rounded-full"
          >
            <ArrowRight className="w-5 h-5 text-gray-700" />
          </Button>
          
          <div className="flex flex-col items-center">
            <BookOpen className="w-10 h-10 text-[#4a7c59] mb-2" />
            <h1 className="text-2xl font-bold text-gray-800">التوعية البيئية</h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Sections */}
        <div className="w-full max-w-md mx-auto space-y-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => section.href !== "#" && router.push(section.href)}
              className="w-full bg-white/80 hover:bg-white rounded-2xl p-5 flex items-center justify-between transition-all shadow-sm hover:shadow-md"
            >
              <div className="text-gray-600">{section.icon}</div>
              <span className="text-gray-800 font-medium text-lg">{section.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
