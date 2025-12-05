"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Tent, 
  Calendar, 
  MapPin, 
  Star, 
  Camera, 
  Clock,
  TrendingUp,
  Award,
  Heart,
  Share2,
  Plus,
  FileText
} from "lucide-react"
import { useApp } from "@/contexts/AppContext"
import BottomNav from "@/components/bottom-nav"

export default function TripsPage() {
  const router = useRouter()
  const { theme, language } = useApp()
  const [activeTab, setActiveTab] = useState<'past' | 'upcoming' | 'stats'>('past')

  const pastTrips = [
    {
      id: 1,
      reserve: language === 'ar' ? 'محمية الإمام سعود بن عبدالعزيز' : 'Imam Saud bin Abdulaziz Reserve',
      date: '2024-11-15',
      permitNumber: 'P-2024-1234',
      rating: 5,
      photos: 12,
      notes: language === 'ar' ? 'رحلة رائعة، شاهدنا غزال الريم!' : 'Amazing trip, saw Reem gazelles!',
      icon: '🦌',
    },
    {
      id: 2,
      reserve: language === 'ar' ? 'محمية جزر فرسان' : 'Farasan Islands Reserve',
      date: '2024-10-20',
      permitNumber: 'P-2024-0987',
      rating: 4,
      photos: 25,
      notes: language === 'ar' ? 'شواطئ جميلة وطيور مهاجرة' : 'Beautiful beaches and migratory birds',
      icon: '🏝️',
    },
    {
      id: 3,
      reserve: language === 'ar' ? 'محمية عروق بني معارض' : 'Uruq Bani Ma\'arid Reserve',
      date: '2024-09-10',
      permitNumber: 'P-2024-0756',
      rating: 5,
      photos: 18,
      notes: language === 'ar' ? 'كثبان رملية خلابة وتجربة تخييم ممتعة' : 'Stunning sand dunes and great camping',
      icon: '🏜️',
    },
  ]

  const upcomingTrips = [
    {
      id: 1,
      reserve: language === 'ar' ? 'محمية شدا الأعلى' : 'Shada Al-A\'la Reserve',
      date: '2024-12-20',
      permitNumber: 'P-2024-1567',
      daysLeft: 15,
      icon: '⛰️',
    },
    {
      id: 2,
      reserve: language === 'ar' ? 'محمية الجبيل للأحياء البحرية' : 'Jubail Marine Life Reserve',
      date: '2025-01-10',
      permitNumber: 'P-2025-0012',
      daysLeft: 36,
      icon: '🐠',
    },
  ]

  const stats = {
    totalTrips: 8,
    reservesVisited: 5,
    totalDistance: 1250,
    favoriteReserve: language === 'ar' ? 'محمية الإمام سعود' : 'Imam Saud Reserve',
    badges: [
      { name: language === 'ar' ? 'مستكشف مبتدئ' : 'Novice Explorer', icon: '🌟', earned: true },
      { name: language === 'ar' ? 'محب الطبيعة' : 'Nature Lover', icon: '🌿', earned: true },
      { name: language === 'ar' ? 'مصور محترف' : 'Pro Photographer', icon: '📸', earned: true },
      { name: language === 'ar' ? 'مستكشف متقدم' : 'Advanced Explorer', icon: '🏆', earned: false },
    ],
  }

  const favorites = [
    { name: language === 'ar' ? 'محمية الإمام سعود' : 'Imam Saud Reserve', icon: '🦌' },
    { name: language === 'ar' ? 'محمية جزر فرسان' : 'Farasan Islands', icon: '🏝️' },
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
            <Tent className={`w-10 h-10 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} mb-2`} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
              {language === 'ar' ? 'رحلاتي' : 'My Trips'}
            </h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Tabs */}
        <div className="w-full max-w-md mx-auto mb-6">
          <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-2 flex gap-2`}>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                activeTab === 'past'
                  ? theme === 'dark'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-600 text-white'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {language === 'ar' ? 'السابقة' : 'Past'}
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                activeTab === 'upcoming'
                  ? theme === 'dark'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-600 text-white'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {language === 'ar' ? 'القادمة' : 'Upcoming'}
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                activeTab === 'stats'
                  ? theme === 'dark'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-600 text-white'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {language === 'ar' ? 'إحصائيات' : 'Stats'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-md mx-auto space-y-4">
          {/* Past Trips */}
          {activeTab === 'past' && (
            <>
              {pastTrips.map((trip) => (
                <div
                  key={trip.id}
                  className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-5 shadow-sm`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-4xl">{trip.icon}</div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-1`}>
                        {trip.reserve}
                      </h3>
                      <div className="flex items-center gap-3 text-xs mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className={`w-3 h-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{trip.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className={`w-3 h-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{trip.permitNumber}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < trip.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : theme === 'dark'
                                ? 'text-gray-600'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                        {trip.notes}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`${theme === 'dark' ? 'text-blue-400 hover:bg-blue-900/30' : 'text-blue-600 hover:bg-blue-100'}`}
                        >
                          <Camera className="w-4 h-4 mr-1" />
                          {trip.photos} {language === 'ar' ? 'صورة' : 'photos'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`${theme === 'dark' ? 'text-green-400 hover:bg-green-900/30' : 'text-green-600 hover:bg-green-100'}`}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Upcoming Trips */}
          {activeTab === 'upcoming' && (
            <>
              {upcomingTrips.map((trip) => (
                <div
                  key={trip.id}
                  className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-5 shadow-sm`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-4xl">{trip.icon}</div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-1`}>
                        {trip.reserve}
                      </h3>
                      <div className="flex items-center gap-3 text-xs mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className={`w-3 h-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{trip.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className={`w-3 h-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{trip.permitNumber}</span>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {trip.daysLeft} {language === 'ar' ? 'يوم متبقي' : 'days left'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                className={`w-full ${theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-2xl py-6`}
                onClick={() => router.push('/tours')}
              >
                <Plus className="w-5 h-5 mr-2" />
                {language === 'ar' ? 'خطط رحلة جديدة' : 'Plan New Trip'}
              </Button>
            </>
          )}

          {/* Stats */}
          {activeTab === 'stats' && (
            <>
              {/* Overview Stats */}
              <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-5 shadow-sm`}>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
                  {language === 'ar' ? 'نظرة عامة' : 'Overview'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-3`}>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className={`w-4 h-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {language === 'ar' ? 'إجمالي الرحلات' : 'Total Trips'}
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                      {stats.totalTrips}
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-3`}>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {language === 'ar' ? 'المحميات' : 'Reserves'}
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                      {stats.reservesVisited}
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-3`}>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className={`w-4 h-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {language === 'ar' ? 'المسافة' : 'Distance'}
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                      {stats.totalDistance} {language === 'ar' ? 'كم' : 'km'}
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-3`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className={`w-4 h-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {language === 'ar' ? 'المفضلة' : 'Favorite'}
                      </span>
                    </div>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                      {stats.favoriteReserve}
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-5 shadow-sm`}>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
                  {language === 'ar' ? 'الإنجازات' : 'Achievements'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {stats.badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`${
                        badge.earned
                          ? theme === 'dark'
                            ? 'bg-green-900/30 border-green-600'
                            : 'bg-green-50 border-green-300'
                          : theme === 'dark'
                          ? 'bg-gray-700/30 border-gray-600'
                          : 'bg-gray-100 border-gray-300'
                      } border-2 rounded-xl p-3 flex flex-col items-center text-center`}
                    >
                      <span className="text-3xl mb-2">{badge.icon}</span>
                      <p className={`text-xs font-medium ${
                        badge.earned
                          ? theme === 'dark'
                            ? 'text-green-400'
                            : 'text-green-700'
                          : theme === 'dark'
                          ? 'text-gray-500'
                          : 'text-gray-500'
                      }`}>
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorites */}
              <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-5 shadow-sm`}>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
                  {language === 'ar' ? 'المحميات المفضلة' : 'Favorite Reserves'}
                </h3>
                <div className="space-y-2">
                  {favorites.map((fav, index) => (
                    <div
                      key={index}
                      className={`${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-3 flex items-center gap-3`}
                    >
                      <span className="text-2xl">{fav.icon}</span>
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                        {fav.name}
                      </span>
                      <Heart className={`w-4 h-4 ml-auto ${theme === 'dark' ? 'fill-red-400 text-red-400' : 'fill-red-500 text-red-500'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
