'use client'

import { useRouter } from 'next/navigation'
import { useApp } from '@/contexts/AppContext'
import { FileText, MapPin, AlertTriangle, Newspaper, FileBarChart, Image, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import BottomNav from '@/components/bottom-nav'
import SaudiMap from '@/components/saudi-map'

export default function Dashboard() {
  const router = useRouter()
  const { language, theme } = useApp()
  const [isClient, setIsClient] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const t = (key: string) => {
    const translations: Record<string, { ar: string; en: string }> = {
      permits: { ar: 'التصاريح', en: 'Permits' },
      map: { ar: 'موقعي', en: 'Map' },
      reports: { ar: 'البلاغات', en: 'Reports' },
      articles: { ar: 'المقالات', en: 'Articles' },
      articlesDesc: { ar: 'مقالات عن المحميات والحياة البرية', en: 'Articles about reserves and wildlife' },
      reserveReports: { ar: 'تقارير المحميات', en: 'Reserve Reports' },
      reserveReportsDesc: { ar: 'تقارير مفصلة عن المحميات', en: 'Detailed reports about reserves' },
      snapshots: { ar: 'اللقطات', en: 'Snapshots' },
      snapshotsDesc: { ar: 'لقطات من المحميات الطبيعية', en: 'Snapshots from natural reserves' },
    }
    return translations[key]?.[language] || key
  }

  const menuItems = [
    {
      id: 1,
      titleKey: 'permits',
      icon: <FileText className="w-12 h-12" />,
      href: '/permits',
      bgColor: 'bg-yellow-100',
      bgColorDark: 'bg-yellow-900/30',
      iconColor: 'text-yellow-600',
      iconColorDark: 'text-yellow-400',
    },
    {
      id: 2,
      titleKey: 'map',
      icon: <MapPin className="w-12 h-12" />,
      href: '/map',
      bgColor: 'bg-green-100',
      bgColorDark: 'bg-green-900/30',
      iconColor: 'text-green-600',
      iconColorDark: 'text-green-400',
    },
    {
      id: 3,
      titleKey: 'reports',
      icon: <AlertTriangle className="w-12 h-12" />,
      href: '/reports/new',
      bgColor: 'bg-orange-100',
      bgColorDark: 'bg-orange-900/30',
      iconColor: 'text-orange-600',
      iconColorDark: 'text-orange-400',
    },
  ]

  const contentSections = [
    {
      id: 'articles',
      titleKey: 'articles',
      descKey: 'articlesDesc',
      icon: <Newspaper className="w-6 h-6" />,
      iconColor: 'text-blue-600',
      iconColorDark: 'text-blue-400',
      bgColor: 'bg-white/80',
      bgColorDark: 'bg-gray-800/80',
      items: [
        { ar: 'أهمية المحميات الطبيعية', en: 'Importance of Natural Reserves', date: '2024-12-01' },
        { ar: 'الحياة البرية في السعودية', en: 'Wildlife in Saudi Arabia', date: '2024-11-28' },
        { ar: 'كيف نحمي البيئة', en: 'How to Protect the Environment', date: '2024-11-25' },
      ],
    },
    {
      id: 'reports',
      titleKey: 'reserveReports',
      descKey: 'reserveReportsDesc',
      icon: <FileBarChart className="w-6 h-6" />,
      iconColor: 'text-green-600',
      iconColorDark: 'text-green-400',
      bgColor: 'bg-white/80',
      bgColorDark: 'bg-gray-800/80',
      items: [
        { ar: 'تقرير محمية الإمام سعود 2024', en: 'Imam Saud Reserve Report 2024', date: '2024-12-01' },
        { ar: 'تقرير محمية فرسان 2024', en: 'Farasan Reserve Report 2024', date: '2024-11-15' },
        { ar: 'تقرير محمية شدا الأعلى 2024', en: 'Shada Al-A\'la Reserve Report 2024', date: '2024-11-01' },
      ],
    },
    {
      id: 'snapshots',
      titleKey: 'snapshots',
      descKey: 'snapshotsDesc',
      icon: <Image className="w-6 h-6" />,
      iconColor: 'text-purple-600',
      iconColorDark: 'text-purple-400',
      bgColor: 'bg-white/80',
      bgColorDark: 'bg-gray-800/80',
      items: [
        { ar: 'غزال الريم في محمية الإمام', en: 'Reem Gazelle in Imam Reserve', location: '📍' },
        { ar: 'طيور فرسان المهاجرة', en: 'Farasan Migratory Birds', location: '📍' },
        { ar: 'النمر العربي في شدا', en: 'Arabian Leopard in Shada', location: '📍' },
      ],
    },
  ]

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  if (!isClient) {
    return null
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pb-20"
      style={{
        backgroundImage: theme === 'dark'
          ? 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/desert-bg.jpg")'
          : 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("/desert-bg.jpg")',
      }}
    >
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="relative min-h-screen flex flex-col items-center pt-8 pb-24">
        {/* Saudi Map */}
        <div className="w-48 h-48 mb-2">
          <SaudiMap />
        </div>

        {/* App Title */}
        <h1 className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>
          {language === 'ar' ? 'نُزْهه' : 'Nuzha'}
        </h1>

        {/* Quick Services Section */}
        <div className="w-full max-w-md px-4 mb-6">
          <h2 className={`text-xl font-bold mb-6 tracking-wide ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`}>
            {language === 'ar' ? 'الخدمات السريعة' : 'Quick Services'}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={`${theme === 'dark' ? item.bgColorDark : item.bgColor} rounded-3xl p-6 flex flex-col items-center justify-center transition-all hover:scale-105 shadow-md`}
              >
                <div className={theme === 'dark' ? item.iconColorDark : item.iconColor}>
                  {item.icon}
                </div>
                <p className={`text-xs font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mt-2 text-center`}>
                  {t(item.titleKey)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections (Accordion) */}
        <div className="w-full max-w-md px-4 space-y-3">
          {contentSections.map((section) => (
            <div key={section.id} className={`${theme === 'dark' ? section.bgColorDark : section.bgColor} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg`}>
              <button
                onClick={() => toggleAccordion(section.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={theme === 'dark' ? section.iconColorDark : section.iconColor}>
                    {section.icon}
                  </div>
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {t(section.titleKey)}
                    </h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t(section.descKey)}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === section.id ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                />
              </button>

              {openAccordion === section.id && (
                <div className={`px-4 pb-4 space-y-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'} hover:scale-[1.02] transition-transform cursor-pointer`}
                      onClick={() => router.push('/awareness')}
                    >
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        {language === 'ar' ? item.ar : item.en}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                        {'date' in item ? item.date : item.location}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  )
}
