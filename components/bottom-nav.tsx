"use client"

import { useRouter, usePathname } from "next/navigation"
import { MapPin, Compass, Book, Settings, Tent, Home } from "lucide-react"
import { useApp } from "@/contexts/AppContext"

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, language, t } = useApp()

  const navItems = [
    {
      id: "home",
      titleKey: "home",
      icon: Home,
      href: "/dashboard",
    },
    {
      id: "tourist-trips",
      titleKey: "touristTrips",
      icon: Tent,
      href: "/tourist-trips",
    },
    {
      id: "trips",
      titleKey: "myTrips",
      icon: Compass,
      href: "/trips",
    },
    {
      id: "awareness",
      titleKey: "awareness",
      icon: Book,
      href: "/awareness",
    },
    {
      id: "map",
      titleKey: "map",
      icon: MapPin,
      href: "/map",
    },
    {
      id: "settings",
      titleKey: "settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className={`fixed bottom-0 left-0 right-0 ${
        theme === 'dark' ? 'bg-[#1a1a1a]/95' : 'bg-[#f5efe1]/95'
      } backdrop-blur-md border-t ${
        theme === 'dark' ? 'border-gray-700/50' : 'border-[#d4c5a9]/50'
      } shadow-lg z-50`}
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className="flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all py-1"
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  active
                    ? theme === 'dark'
                      ? 'bg-green-600/30 text-green-400'
                      : 'bg-green-700/20 text-green-800'
                    : theme === 'dark'
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-semibold transition-all ${
                  active
                    ? theme === 'dark'
                      ? 'text-green-400'
                      : 'text-green-800'
                    : theme === 'dark'
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                {t(item.titleKey)}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
