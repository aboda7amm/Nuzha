"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, FileText, Map, AlertTriangle, Settings, Compass, BookOpen } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import { useApp } from "@/contexts/AppContext"

export default function UserGuidePage() {
  const router = useRouter()
  const { theme, language } = useApp()

  const guides = [
    {
      icon: <FileText className="w-6 h-6" />,
      titleAr: "كيفية الحصول على تصريح",
      titleEn: "How to Get a Permit",
      stepsAr: [
        "افتح التطبيق وسجل دخولك",
        "اضغط على أيقونة 'التصاريح' من الصفحة الرئيسية",
        "اختر نوع التصريح المناسب (زيارة، رعي، بحثي، تصوير)",
        "حدد المحمية التي تريد زيارتها",
        "اختر مدة التصريح (يوم، 3 أيام، أسبوع، شهر)",
        "راجع التفاصيل واضغط 'طلب تصريح'",
        "ستحصل على التصريح الإلكتروني فوراً",
        "يمكنك عرض التصريح من قسم 'التصاريح'"
      ],
      stepsEn: [
        "Open the app and log in",
        "Tap 'Permits' icon from home page",
        "Choose appropriate permit type (visit, grazing, research, photography)",
        "Select the reserve you want to visit",
        "Choose permit duration (day, 3 days, week, month)",
        "Review details and tap 'Request Permit'",
        "You'll receive electronic permit instantly",
        "You can view permit from 'Permits' section"
      ]
    },
    {
      icon: <Map className="w-6 h-6" />,
      titleAr: "استخدام الخريطة التفاعلية",
      titleEn: "Using Interactive Map",
      stepsAr: [
        "اضغط على أيقونة 'موقعي' من القائمة السفلية",
        "سيظهر موقعك الحالي على الخريطة",
        "اضغط على أي محمية لعرض معلوماتها",
        "استخدم أزرار التكبير والتصغير للتنقل",
        "يمكنك البحث عن محمية معينة",
        "اضغط على 'الحصول على اتجاهات' للملاحة",
        "الخريطة تعمل بدون إنترنت بعد التحميل"
      ],
      stepsEn: [
        "Tap 'My Location' icon from bottom menu",
        "Your current location will appear on map",
        "Tap any reserve to view its information",
        "Use zoom buttons to navigate",
        "You can search for specific reserve",
        "Tap 'Get Directions' for navigation",
        "Map works offline after download"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      titleAr: "الإبلاغ عن مخالفة بيئية",
      titleEn: "Reporting Environmental Violation",
      stepsAr: [
        "اضغط على 'بلاغ بيئي' من الصفحة الرئيسية",
        "اختر نوع المخالفة من القائمة",
        "اكتب وصف تفصيلي للمخالفة",
        "حدد الموقع على الخريطة أو استخدم موقعك الحالي",
        "أرفق صور أو فيديو كدليل (اختياري)",
        "راجع المعلومات واضغط 'إرسال البلاغ'",
        "ستتلقى رقم متابعة للبلاغ",
        "يمكنك متابعة حالة البلاغ من 'بلاغاتي'"
      ],
      stepsEn: [
        "Tap 'Environmental Report' from home page",
        "Choose violation type from list",
        "Write detailed description of violation",
        "Mark location on map or use current location",
        "Attach photos or video as evidence (optional)",
        "Review information and tap 'Submit Report'",
        "You'll receive tracking number",
        "You can track report status from 'My Reports'"
      ]
    },
    {
      icon: <Compass className="w-6 h-6" />,
      titleAr: "تخطيط رحلة إلى محمية",
      titleEn: "Planning a Reserve Trip",
      stepsAr: [
        "اذهب إلى قسم 'رحلاتي' من القائمة السفلية",
        "اضغط على 'تخطيط رحلة جديدة'",
        "اختر المحمية من القائمة",
        "حدد تاريخ الزيارة وعدد الأشخاص",
        "احصل على تصريح الزيارة",
        "راجع معلومات المحمية والطقس",
        "احفظ الرحلة في قائمتك",
        "ستتلقى تذكير قبل موعد الرحلة"
      ],
      stepsEn: [
        "Go to 'My Trips' from bottom menu",
        "Tap 'Plan New Trip'",
        "Choose reserve from list",
        "Set visit date and number of people",
        "Get visit permit",
        "Review reserve information and weather",
        "Save trip to your list",
        "You'll receive reminder before trip"
      ]
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      titleAr: "استكشاف المحتوى التعليمي",
      titleEn: "Exploring Educational Content",
      stepsAr: [
        "من الصفحة الرئيسية، اضغط على 'المقالات'",
        "تصفح المقالات عن المحميات والحياة البرية",
        "اقرأ 'تقارير المحميات' للمعلومات المفصلة",
        "شاهد 'اللقطات' لصور من المحميات",
        "احفظ المقالات المفضلة لديك",
        "شارك المحتوى مع الأصدقاء",
        "اشترك في التنبيهات للمحتوى الجديد"
      ],
      stepsEn: [
        "From home page, tap 'Articles'",
        "Browse articles about reserves and wildlife",
        "Read 'Reserve Reports' for detailed information",
        "View 'Snapshots' for reserve photos",
        "Save your favorite articles",
        "Share content with friends",
        "Subscribe to alerts for new content"
      ]
    },
    {
      icon: <Settings className="w-6 h-6" />,
      titleAr: "تخصيص إعدادات التطبيق",
      titleEn: "Customizing App Settings",
      stepsAr: [
        "اضغط على 'الإعدادات' من القائمة السفلية",
        "اختر 'المظهر' لتغيير الوضع الفاتح/الداكن",
        "غير اللغة بين العربية والإنجليزية",
        "حدّث معلومات التواصل الخاصة بك",
        "فعّل/عطّل الإشعارات",
        "راجع 'لمعرفة المزيد' للمساعدة",
        "احفظ التغييرات"
      ],
      stepsEn: [
        "Tap 'Settings' from bottom menu",
        "Choose 'Appearance' to change light/dark mode",
        "Switch language between Arabic and English",
        "Update your contact information",
        "Enable/disable notifications",
        "Review 'Learn More' for help",
        "Save changes"
      ]
    }
  ]

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pb-24"
      style={{
        backgroundImage: theme === 'dark'
          ? 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/desert-bg.jpg")'
          : 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("/desert-bg.jpg")',
      }}
    >
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="relative min-h-screen py-8 px-4">
        {/* Header */}
        <div className="w-full max-w-md mx-auto mb-8 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
            className={theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>
            {language === 'ar' ? 'دليل المستخدم' : 'User Guide'}
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Introduction */}
        <Card className={`w-full max-w-md mx-auto mb-6 ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm p-6`}>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {language === 'ar'
              ? 'مرحباً بك في دليل استخدام تطبيق نُزْهه! هذا الدليل يساعدك على الاستفادة من جميع ميزات التطبيق بسهولة.'
              : 'Welcome to Nuzha app user guide! This guide helps you make the most of all app features easily.'
            }
          </p>
        </Card>

        {/* Guides */}
        <div className="w-full max-w-md mx-auto space-y-6">
          {guides.map((guide, index) => (
            <Card key={index} className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm p-5`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'}`}>
                  {guide.icon}
                </div>
                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {language === 'ar' ? guide.titleAr : guide.titleEn}
                </h3>
              </div>
              
              <ol className="space-y-2">
                {(language === 'ar' ? guide.stepsAr : guide.stepsEn).map((step, stepIndex) => (
                  <li key={stepIndex} className="flex gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      theme === 'dark' ? 'bg-green-600/30 text-green-400' : 'bg-green-100 text-green-700'
                    }`}>
                      {stepIndex + 1}
                    </span>
                    <span className={`text-sm flex-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card className={`w-full max-w-md mx-auto mt-6 ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm p-6`}>
          <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>
            {language === 'ar' ? 'نصائح مفيدة' : 'Useful Tips'}
          </h3>
          <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <li className="flex gap-2">
              <span className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>•</span>
              <span>
                {language === 'ar'
                  ? 'احفظ التصاريح على جهازك للوصول إليها بدون إنترنت'
                  : 'Save permits on your device for offline access'
                }
              </span>
            </li>
            <li className="flex gap-2">
              <span className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>•</span>
              <span>
                {language === 'ar'
                  ? 'فعّل خدمات الموقع للحصول على تجربة أفضل'
                  : 'Enable location services for better experience'
                }
              </span>
            </li>
            <li className="flex gap-2">
              <span className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>•</span>
              <span>
                {language === 'ar'
                  ? 'راجع معلومات المحمية قبل الزيارة'
                  : 'Review reserve information before visiting'
                }
              </span>
            </li>
            <li className="flex gap-2">
              <span className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>•</span>
              <span>
                {language === 'ar'
                  ? 'أبلغ عن أي مخالفة بيئية فوراً'
                  : 'Report any environmental violation immediately'
                }
              </span>
            </li>
          </ul>
        </Card>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  )
}
