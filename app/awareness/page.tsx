"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Leaf, FileText, ClipboardList, Shield, Image as ImageIcon, ChevronDown } from "lucide-react"
import { useApp } from "@/contexts/AppContext"
import BottomNav from "@/components/bottom-nav"

export default function AwarenessPage() {
  const router = useRouter()
  const { theme, language, t } = useApp()
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  const sections = [
    {
      id: "1",
      title: language === 'ar' ? "السلوك البيئي الصحيح داخل المحميات" : "Proper Environmental Behavior in Reserves",
      icon: <Leaf className="w-6 h-6" />,
      hasAccordion: true,
      items: [
        { 
          ar: 'عدم رمي النفايات والمحافظة على نظافة المحمية', 
          en: 'Do not litter and keep the reserve clean',
          icon: '♻️'
        },
        { 
          ar: 'عدم إزعاج الحيوانات أو الاقتراب منها بشكل مفرط', 
          en: 'Do not disturb animals or approach them excessively',
          icon: '🦌'
        },
        { 
          ar: 'الالتزام بالمسارات المحددة وعدم الخروج عنها', 
          en: 'Follow designated paths and do not deviate from them',
          icon: '🚶'
        },
        { 
          ar: 'عدم قطف النباتات أو إتلاف البيئة الطبيعية', 
          en: 'Do not pick plants or damage the natural environment',
          icon: '🌿'
        },
        { 
          ar: 'منع إشعال النيران إلا في الأماكن المخصصة', 
          en: 'Prohibit lighting fires except in designated areas',
          icon: '🔥'
        },
      ],
    },
    {
      id: "2",
      title: language === 'ar' ? "مقالات" : "Articles",
      icon: <FileText className="w-6 h-6" />,
      hasAccordion: true,
      items: [
        { 
          ar: 'أهمية المحميات الطبيعية في السعودية', 
          en: 'Importance of Natural Reserves in Saudi Arabia',
          date: '2024-12-01'
        },
        { 
          ar: 'الحياة البرية في محمية الإمام سعود', 
          en: 'Wildlife in Imam Saud Reserve',
          date: '2024-11-28'
        },
        { 
          ar: 'كيف نحمي البيئة أثناء الرحلات', 
          en: 'How to Protect the Environment During Trips',
          date: '2024-11-25'
        },
      ],
    },
    {
      id: "3",
      title: language === 'ar' ? "تقارير المحميات" : "Reserve Reports",
      icon: <ClipboardList className="w-6 h-6" />,
      hasAccordion: true,
      items: [
        { 
          ar: 'تقرير محمية الإمام سعود بن عبدالعزيز 2024', 
          en: 'Imam Saud bin Abdulaziz Reserve Report 2024',
          date: '2024-12-01'
        },
        { 
          ar: 'تقرير محمية جزر فرسان 2024', 
          en: 'Farasan Islands Reserve Report 2024',
          date: '2024-11-15'
        },
        { 
          ar: 'تقرير محمية شدا الأعلى 2024', 
          en: 'Shada Al-A\'la Reserve Report 2024',
          date: '2024-11-01'
        },
      ],
    },
    {
      id: "4",
      title: language === 'ar' ? "اللقطات" : "Snapshots",
      icon: <ImageIcon className="w-6 h-6" />,
      hasAccordion: true,
      items: [
        { 
          ar: 'غزال الريم في محمية الإمام سعود', 
          en: 'Reem Gazelle in Imam Saud Reserve',
          location: '📍 محمية الإمام سعود'
        },
        { 
          ar: 'طيور فرسان المهاجرة', 
          en: 'Farasan Migratory Birds',
          location: '📍 محمية جزر فرسان'
        },
        { 
          ar: 'النمر العربي في شدا الأعلى', 
          en: 'Arabian Leopard in Shada Al-A\'la',
          location: '📍 محمية شدا الأعلى'
        },
      ],
    },
    {
      id: "5",
      title: language === 'ar' ? "نصائح السلامة" : "Safety Tips",
      icon: <Shield className="w-6 h-6" />,
      hasAccordion: true,
      items: [
        { 
          ar: 'إحضار كمية كافية من الماء والطعام', 
          en: 'Bring sufficient water and food',
          icon: '💧'
        },
        { 
          ar: 'ارتداء ملابس مناسبة وواقية من الشمس', 
          en: 'Wear appropriate clothing and sun protection',
          icon: '👕'
        },
        { 
          ar: 'إبلاغ المسؤولين عن موعد وصولك ومغادرتك', 
          en: 'Inform officials of your arrival and departure time',
          icon: '📱'
        },
        { 
          ar: 'عدم الابتعاد عن المجموعة في حالة الرحلات الجماعية', 
          en: 'Do not stray from the group during group trips',
          icon: '👥'
        },
        { 
          ar: 'إحضار أدوات الإسعافات الأولية', 
          en: 'Bring first aid supplies',
          icon: '🎒'
        },
      ],
    },
  ]

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  const handleItemClick = (sectionId: string) => {
    if (sectionId === "2") {
      router.push('/articles')
    } else if (sectionId === "3") {
      router.push('/reserve-reports')
    } else if (sectionId === "4") {
      router.push('/snapshots')
    }
  }

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
      <div className="relative z-10 flex flex-col min-h-screen py-8 px-4 pb-24">
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
            <BookOpen className={`w-10 h-10 ${theme === 'dark' ? 'text-green-400' : 'text-[#4a7c59]'} mb-2`} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{t('awareness')}</h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Sections */}
        <div className="w-full max-w-md mx-auto space-y-3">
          {sections.map((section) => (
            <div 
              key={section.id} 
              className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg`}
            >
              <button
                onClick={() => section.hasAccordion ? toggleAccordion(section.id) : null}
                className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {section.icon}
                  </div>
                  <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} font-medium text-lg ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {section.title}
                  </span>
                </div>
                {section.hasAccordion && (
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${openAccordion === section.id ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  />
                )}
              </button>

              {section.hasAccordion && openAccordion === section.id && (
                <div className={`px-4 pb-4 space-y-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  {section.items?.map((item, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-colors ${(section.id === '2' || section.id === '3' || section.id === '4') ? 'cursor-pointer' : ''}`}
                      onClick={() => (section.id === '2' || section.id === '3' || section.id === '4') && handleItemClick(section.id)}
                    >
                      <div className="flex items-start gap-2">
                        {'icon' in item && <span className="text-lg">{item.icon}</span>}
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                            {language === 'ar' ? item.ar : item.en}
                          </p>
                          {'date' in item && (
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                              {item.date}
                            </p>
                          )}
                          {'location' in item && (
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                              {item.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
