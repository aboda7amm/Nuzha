"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SaudiMap from "@/components/saudi-map"
import { FileText, MapPin, AlertTriangle, Compass, Book, Settings } from "lucide-react"
import { useApp } from "@/contexts/AppContext"

interface MenuItem {
  id: string
  titleKey: string
  icon: React.ReactNode
  href: string
  bgColor: string
  bgColorDark: string
  iconColor: string
  iconColorDark: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { theme, language, t } = useApp()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const menuItems: MenuItem[] = [
    {
      id: "1",
      titleKey: "permits",
      icon: <FileText className="w-12 h-12" />,
      href: "/permits",
      bgColor: "bg-yellow-100",
      bgColorDark: "bg-yellow-900/30",
      iconColor: "text-yellow-600",
      iconColorDark: "text-yellow-400",
    },
    {
      id: "2",
      titleKey: "map",
      icon: <MapPin className="w-12 h-12" />,
      href: "/map",
      bgColor: "bg-green-100",
      bgColorDark: "bg-green-900/30",
      iconColor: "text-green-600",
      iconColorDark: "text-green-400",
    },
    {
      id: "3",
      titleKey: "report",
      icon: <AlertTriangle className="w-12 h-12" />,
      href: "/reports/new",
      bgColor: "bg-orange-100",
      bgColorDark: "bg-orange-900/30",
      iconColor: "text-orange-600",
      iconColorDark: "text-orange-400",
    },
    {
      id: "4",
      titleKey: "trips",
      icon: <Compass className="w-12 h-12" />,
      href: "/trips",
      bgColor: "bg-yellow-100",
      bgColorDark: "bg-yellow-900/30",
      iconColor: "text-yellow-600",
      iconColorDark: "text-yellow-400",
    },
    {
      id: "5",
      titleKey: "awareness",
      icon: <Book className="w-12 h-12" />,
      href: "/awareness",
      bgColor: "bg-blue-100",
      bgColorDark: "bg-blue-900/30",
      iconColor: "text-blue-600",
      iconColorDark: "text-blue-400",
    },
    {
      id: "6",
      titleKey: "settings",
      icon: <Settings className="w-12 h-12" />,
      href: "/settings",
      bgColor: "bg-gray-100",
      bgColorDark: "bg-gray-700/30",
      iconColor: "text-gray-600",
      iconColorDark: "text-gray-300",
    },
  ]

  if (!isClient) return null

  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen pb-96 relative"
      style={{
        backgroundImage: 'url(/desert-full-bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay للحفاظ على وضوح القوائم */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-900/80' : 'bg-[#f5efe1]/60'}`}></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center pt-12">
        {/* Saudi Map */}
        <div className="mb-6">
          <SaudiMap />
        </div>

        {/* App Title */}
        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-900'} mb-8 tracking-wider`}>
          {language === 'ar' ? 'نُزْهه' : 'Nuzha'}
        </h1>

        {/* Menu Grid */}
        <div className="w-full max-w-md px-6">
          <div className="grid grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl transition-transform hover:scale-105 active:scale-95 ${
                  theme === 'dark' ? item.bgColorDark : item.bgColor
                }`}
              >
                <div className={theme === 'dark' ? item.iconColorDark : item.iconColor}>
                  {item.icon}
                </div>
                <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mt-3 text-center`}>
                  {t(item.titleKey)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
