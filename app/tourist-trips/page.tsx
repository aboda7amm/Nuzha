"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, Tent, MapPin, Calendar, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/AppContext"
import BottomNav from "@/components/bottom-nav"

export default function TouristTripsPage() {
  const router = useRouter()
  const { theme, language, t } = useApp()

  const trips = [
    {
      id: "1",
      title: language === 'ar' ? "رحلة استكشاف محمية الإمام سعود" : "Imam Saud Reserve Exploration",
      reserve: language === 'ar' ? "محمية الإمام سعود بن عبدالعزيز الملكية" : "Imam Saud bin Abdulaziz Royal Reserve",
      duration: language === 'ar' ? "3 أيام / ليلتين" : "3 Days / 2 Nights",
      date: language === 'ar' ? "15 - 17 يناير 2025" : "January 15 - 17, 2025",
      capacity: language === 'ar' ? "20 مقعد متاح" : "20 Seats Available",
      price: language === 'ar' ? "يحدد من قبل الجهة المعنية" : "Determined by Relevant Authority",
      rating: 4.8,
      image: "🦌",
      features: language === 'ar' 
        ? ["مرشد سياحي", "وجبات", "معدات تخييم", "نقل"]
        : ["Tour Guide", "Meals", "Camping Equipment", "Transportation"],
      status: "available",
    },
    {
      id: "2",
      title: language === 'ar' ? "رحلة مراقبة الطيور في فرسان" : "Bird Watching in Farasan",
      reserve: language === 'ar' ? "محمية فرسان" : "Farasan Reserve",
      duration: language === 'ar' ? "يومين / ليلة واحدة" : "2 Days / 1 Night",
      date: language === 'ar' ? "22 - 23 يناير 2025" : "January 22 - 23, 2025",
      capacity: language === 'ar' ? "15 مقعد متاح" : "15 Seats Available",
      price: language === 'ar' ? "يحدد من قبل الجهة المعنية" : "Determined by Relevant Authority",
      rating: 4.9,
      image: "🦅",
      features: language === 'ar'
        ? ["مرشد متخصص", "معدات مراقبة", "وجبات", "نقل بحري"]
        : ["Expert Guide", "Observation Equipment", "Meals", "Sea Transport"],
      status: "available",
    },
    {
      id: "3",
      title: language === 'ar' ? "مغامرة جبلية في شدا الأعلى" : "Mountain Adventure in Shada Al-A'la",
      reserve: language === 'ar' ? "محمية شدا الأعلى" : "Shada Al-A'la Reserve",
      duration: language === 'ar' ? "4 أيام / 3 ليالي" : "4 Days / 3 Nights",
      date: language === 'ar' ? "5 - 8 فبراير 2025" : "February 5 - 8, 2025",
      capacity: language === 'ar' ? "مكتمل" : "Fully Booked",
      price: language === 'ar' ? "يحدد من قبل الجهة المعنية" : "Determined by Relevant Authority",
      rating: 4.7,
      image: "🐺",
      features: language === 'ar'
        ? ["تسلق جبال", "مرشد محترف", "معدات كاملة", "وجبات"]
        : ["Mountain Climbing", "Professional Guide", "Full Equipment", "Meals"],
      status: "full",
    },
    {
      id: "4",
      title: language === 'ar' ? "رحلة التصوير الفوتوغرافي" : "Photography Expedition",
      reserve: language === 'ar' ? "محمية حرة الحرة" : "Harrat Al-Harrah Reserve",
      duration: language === 'ar' ? "يومين / ليلة واحدة" : "2 Days / 1 Night",
      date: language === 'ar' ? "12 - 13 فبراير 2025" : "February 12 - 13, 2025",
      capacity: language === 'ar' ? "10 مقاعد متاحة" : "10 Seats Available",
      price: language === 'ar' ? "يحدد من قبل الجهة المعنية" : "Determined by Relevant Authority",
      rating: 4.6,
      image: "📸",
      features: language === 'ar'
        ? ["مصور محترف", "ورشة تصوير", "وجبات", "نقل"]
        : ["Professional Photographer", "Photography Workshop", "Meals", "Transportation"],
      status: "available",
    },
  ]

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen pb-24 relative"
      style={{
        backgroundImage: 'url(/desert-full-bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-900/85' : 'bg-[#f5efe1]/70'} z-0`}></div>

      {/* Content */}
      <div className="relative z-10 px-6 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className={`${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-800' : 'bg-white/80 hover:bg-white'} rounded-full`}
          >
            <ArrowRight className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} ${language === 'en' ? 'rotate-180' : ''}`} />
          </Button>

          <div className="flex flex-col items-center">
            <Tent className={`w-10 h-10 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'} mb-2`} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
              {t('touristTrips')}
            </h1>
          </div>

          <div className="w-10"></div>
        </div>

        {/* Subtitle */}
        <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          {language === 'ar' ? 'اكتشف الرحلات المنظمة للمحميات الطبيعية' : 'Discover Organized Trips to Natural Reserves'}
        </p>

        {/* Trips List */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className={`${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl p-5 shadow-lg`}
            >
              {/* Trip Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{trip.image}</div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-1`}>
                    {trip.title}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className={`w-4 h-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'} fill-current`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {trip.rating}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  trip.status === 'available'
                    ? theme === 'dark'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-green-100 text-green-700'
                    : theme === 'dark'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {trip.capacity}
                </div>
              </div>

              {/* Trip Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {trip.reserve}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {trip.date} • {trip.duration}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {trip.features.map((feature, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Price and Button */}
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                    {trip.price}
                  </span>

                </div>
                <Button
                  disabled={trip.status === 'full'}
                  className={`${
                    trip.status === 'available'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-400 cursor-not-allowed'
                  } rounded-full px-6`}
                >
                  {trip.status === 'available'
                    ? language === 'ar' ? 'احجز الآن' : 'Book Now'
                    : language === 'ar' ? 'مكتمل' : 'Full'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
