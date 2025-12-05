"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Image as ImageIcon, MapPin, Calendar } from "lucide-react"
import { useApp } from "@/contexts/AppContext"
import BottomNav from "@/components/bottom-nav"

export default function SnapshotsPage() {
  const router = useRouter()
  const { theme, language, t } = useApp()

  const snapshots = [
    {
      id: 1,
      title: language === 'ar' ? 'غزال الريم في محمية الإمام سعود' : 'Reem Gazelle in Imam Saud Reserve',
      location: language === 'ar' ? 'محمية الإمام سعود' : 'Imam Saud Reserve',
      date: '2024-12-05',
      photographer: language === 'ar' ? 'فريق الرصد البيئي' : 'Environmental Monitoring Team',
      icon: '🦌',
      description: language === 'ar' 
        ? 'مجموعة من غزلان الريم تتجول في المحمية'
        : 'A group of Reem gazelles roaming in the reserve',
    },
    {
      id: 2,
      title: language === 'ar' ? 'طيور فرسان المهاجرة' : 'Farasan Migratory Birds',
      location: language === 'ar' ? 'محمية جزر فرسان' : 'Farasan Islands Reserve',
      date: '2024-12-03',
      photographer: language === 'ar' ? 'مصور الحياة البرية' : 'Wildlife Photographer',
      icon: '🦅',
      description: language === 'ar'
        ? 'طيور مهاجرة نادرة تستريح في الجزر'
        : 'Rare migratory birds resting on the islands',
    },
    {
      id: 3,
      title: language === 'ar' ? 'النمر العربي في شدا الأعلى' : 'Arabian Leopard in Shada Al-A\'la',
      location: language === 'ar' ? 'محمية شدا الأعلى' : 'Shada Al-A\'la Reserve',
      date: '2024-11-28',
      photographer: language === 'ar' ? 'كاميرا المراقبة الليلية' : 'Night Vision Camera',
      icon: '🐆',
      description: language === 'ar'
        ? 'لقطة نادرة للنمر العربي المهدد بالانقراض'
        : 'Rare shot of the endangered Arabian Leopard',
    },
    {
      id: 4,
      title: language === 'ar' ? 'الشعاب المرجانية في الجبيل' : 'Coral Reefs in Jubail',
      location: language === 'ar' ? 'محمية الجبيل للأحياء البحرية' : 'Jubail Marine Life Reserve',
      date: '2024-11-25',
      photographer: language === 'ar' ? 'فريق الغوص البحري' : 'Marine Diving Team',
      icon: '🐠',
      description: language === 'ar'
        ? 'شعاب مرجانية ملونة وحياة بحرية متنوعة'
        : 'Colorful coral reefs and diverse marine life',
    },
    {
      id: 5,
      title: language === 'ar' ? 'الكثبان الرملية في عروق بني معارض' : 'Sand Dunes in Uruq Bani Ma\'arid',
      location: language === 'ar' ? 'محمية عروق بني معارض' : 'Uruq Bani Ma\'arid Reserve',
      date: '2024-11-20',
      photographer: language === 'ar' ? 'مصور جوي' : 'Aerial Photographer',
      icon: '🏜️',
      description: language === 'ar'
        ? 'كثبان رملية ذهبية تمتد لمسافات شاسعة'
        : 'Golden sand dunes stretching for vast distances',
    },
    {
      id: 6,
      title: language === 'ar' ? 'المها العربي' : 'Arabian Oryx',
      location: language === 'ar' ? 'محمية الإمام سعود' : 'Imam Saud Reserve',
      date: '2024-11-18',
      photographer: language === 'ar' ? 'فريق الرصد البيئي' : 'Environmental Monitoring Team',
      icon: '🦙',
      description: language === 'ar'
        ? 'المها العربي في بيئته الطبيعية'
        : 'Arabian Oryx in its natural habitat',
    },
    {
      id: 7,
      title: language === 'ar' ? 'النباتات البرية النادرة' : 'Rare Wild Plants',
      location: language === 'ar' ? 'محمية شدا الأعلى' : 'Shada Al-A\'la Reserve',
      date: '2024-11-15',
      photographer: language === 'ar' ? 'عالم نباتات' : 'Botanist',
      icon: '🌺',
      description: language === 'ar'
        ? 'نباتات برية نادرة مستوطنة في المحمية'
        : 'Rare wild plants endemic to the reserve',
    },
    {
      id: 8,
      title: language === 'ar' ? 'السلاحف البحرية' : 'Sea Turtles',
      location: language === 'ar' ? 'محمية جزر فرسان' : 'Farasan Islands Reserve',
      date: '2024-11-10',
      photographer: language === 'ar' ? 'فريق حماية السلاحف' : 'Turtle Protection Team',
      icon: '🐢',
      description: language === 'ar'
        ? 'سلاحف بحرية تضع بيضها على الشاطئ'
        : 'Sea turtles laying eggs on the beach',
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
            <ImageIcon className={`w-10 h-10 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} mb-2`} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
              {language === 'ar' ? 'اللقطات' : 'Snapshots'}
            </h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Gallery Grid */}
        <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-4">
          {snapshots.map((snapshot) => (
            <div
              key={snapshot.id}
              className={`${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'} rounded-2xl p-4 transition-all shadow-sm hover:shadow-md cursor-pointer`}
              onClick={() => {/* TODO: Open image viewer */}}
            >
              <div className="flex flex-col items-center mb-3">
                <div className="text-6xl mb-2">{snapshot.icon}</div>
              </div>
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-2 text-center line-clamp-2`}>
                {snapshot.title}
              </h3>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs">
                  <MapPin className={`w-3 h-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} line-clamp-1`}>
                    {snapshot.location}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Calendar className={`w-3 h-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    {snapshot.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
