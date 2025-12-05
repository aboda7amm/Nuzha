"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowRight, Navigation, MapPin } from "lucide-react"
import dynamic from 'next/dynamic'
import { useApp } from "@/contexts/AppContext"
import BottomNav from "@/components/bottom-nav"

// Import Leaflet dynamically to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full min-h-[500px]">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#c4a35a] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-gray-600">جاري تحميل الخريطة...</p>
      </div>
    </div>
  )
})

export default function MapPage() {
  const router = useRouter()
  const { theme, language, t } = useApp()
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ 
    lat: 24.7136, 
    lng: 46.6753 
  })
  const [lastLocation, setLastLocation] = useState<{ lat: number; lng: number; time: string } | null>(null)
  const [hasRealLocation, setHasRealLocation] = useState(false)

  useEffect(() => {
    // Load last saved location from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lastLocation')
      if (saved) {
        setLastLocation(JSON.parse(saved))
      }

      // Try to get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            setUserLocation(newLocation)
            setHasRealLocation(true)
            
            // Save as last location
            const locationData = {
              ...newLocation,
              time: new Date().toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')
            }
            setLastLocation(locationData)
            localStorage.setItem('lastLocation', JSON.stringify(locationData))
          },
          (error) => {
            console.log("Location access denied, using default location")
          },
        )
      }
    }
  }, [language])

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(newLocation)
          setHasRealLocation(true)
          
          const locationData = {
            ...newLocation,
            time: new Date().toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')
          }
          setLastLocation(locationData)
          localStorage.setItem('lastLocation', JSON.stringify(locationData))
        },
        (error) => {
          alert(language === 'ar' 
            ? "لم يتم السماح بالوصول إلى الموقع. يرجى تفعيل خدمة الموقع من إعدادات المتصفح."
            : "Location access denied. Please enable location services in your browser settings.")
        },
      )
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
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/50' : 'bg-black/20'}`}></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className={`${theme === 'dark' ? 'bg-gray-800/90 hover:bg-gray-800' : 'bg-white/90 hover:bg-white'} rounded-full`}
          >
            <ArrowRight className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} ${language === 'en' ? 'rotate-180' : ''}`} />
          </Button>
          
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-white'} drop-shadow-lg`}>
            {t('map')}
          </h1>
          
          <div className="w-10"></div>
        </div>

        {/* Map Container */}
        <div className="flex-1 mx-4 my-4 rounded-3xl overflow-hidden shadow-2xl relative" style={{ backgroundColor: theme === 'dark' ? '#2d3748' : '#e8dcc8' }}>
          <MapComponent userLocation={userLocation} />

          {/* Map Controls */}
          <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} space-y-2 z-[1000]`}>
            <Button
              onClick={requestLocation}
              className={`w-12 h-12 ${theme === 'dark' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-[#c4a35a] hover:bg-[#b39350]'} text-white rounded-full shadow-lg flex items-center justify-center`}
              title={language === 'ar' ? 'تحديد موقعي الحالي' : 'Get My Location'}
            >
              <Navigation className="w-5 h-5" />
            </Button>
          </div>

          {/* Legend - Top Right */}
          <div className={`absolute top-4 ${language === 'ar' ? 'right-4' : 'left-4'} ${theme === 'dark' ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-2xl shadow-lg p-3 max-w-[200px] z-[1000]`}>
            <h3 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-3 text-sm`}>
              {language === 'ar' ? 'المفاتيح' : 'Legend'}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                  {language === 'ar' ? 'مناطق مسموحة' : 'Allowed Areas'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                  {language === 'ar' ? 'مناطق مشروطة' : 'Conditional Areas'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                  {language === 'ar' ? 'مناطق ممنوعة' : 'Restricted Areas'}
                </span>
              </div>
            </div>
          </div>

          {/* Last Location Info - Bottom */}
          {lastLocation && (
            <div className={`absolute bottom-4 ${language === 'ar' ? 'right-4 left-4' : 'left-4 right-4'} ${theme === 'dark' ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-2xl shadow-lg p-4 z-[1000]`}>
              <div className="flex items-start gap-3">
                <MapPin className={`w-5 h-5 ${theme === 'dark' ? 'text-yellow-400' : 'text-[#c4a35a]'} mt-1 flex-shrink-0`} />
                <div className="flex-1">
                  <h3 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-1 text-sm`}>
                    {language === 'ar' ? 'آخر موقع تم تسجيله' : 'Last Recorded Location'}
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'خط العرض: ' : 'Latitude: '}{lastLocation.lat.toFixed(6)}
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'خط الطول: ' : 'Longitude: '}{lastLocation.lng.toFixed(6)}
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    {lastLocation.time}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Location Status Badge */}
          {!hasRealLocation && (
            <div className={`absolute top-20 ${language === 'ar' ? 'left-4' : 'right-4'} bg-yellow-500/90 backdrop-blur-sm rounded-full shadow-lg px-4 py-2 z-[1000]`}>
              <p className="text-xs text-white font-medium">
                {language === 'ar' 
                  ? 'موقع افتراضي - اضغط على زر الموقع للتحديث'
                  : 'Default Location - Click location button to update'}
              </p>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
