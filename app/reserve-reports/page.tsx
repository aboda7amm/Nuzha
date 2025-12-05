"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileBarChart, Download, TrendingUp, TrendingDown } from "lucide-react"
import { useApp } from "@/contexts/AppContext"
import BottomNav from "@/components/bottom-nav"

export default function ReserveReportsPage() {
  const router = useRouter()
  const { theme, language, t } = useApp()

  const reports = [
    {
      id: 1,
      title: language === 'ar' ? 'تقرير محمية الإمام سعود بن عبدالعزيز 2024' : 'Imam Saud bin Abdulaziz Reserve Report 2024',
      reserve: language === 'ar' ? 'محمية الإمام سعود' : 'Imam Saud Reserve',
      date: '2024-12-01',
      size: '2.5 MB',
      pages: 45,
      status: 'positive',
      summary: language === 'ar' 
        ? 'تحسن ملحوظ في أعداد الحيوانات البرية بنسبة 15%'
        : 'Notable improvement in wildlife numbers by 15%',
      icon: '🦌',
    },
    {
      id: 2,
      title: language === 'ar' ? 'تقرير محمية جزر فرسان 2024' : 'Farasan Islands Reserve Report 2024',
      reserve: language === 'ar' ? 'محمية جزر فرسان' : 'Farasan Islands Reserve',
      date: '2024-11-15',
      size: '3.1 MB',
      pages: 52,
      status: 'positive',
      summary: language === 'ar'
        ? 'زيادة في التنوع البحري وتحسن جودة المياه'
        : 'Increase in marine diversity and improved water quality',
      icon: '🏝️',
    },
    {
      id: 3,
      title: language === 'ar' ? 'تقرير محمية شدا الأعلى 2024' : 'Shada Al-A\'la Reserve Report 2024',
      reserve: language === 'ar' ? 'محمية شدا الأعلى' : 'Shada Al-A\'la Reserve',
      date: '2024-11-01',
      size: '1.8 MB',
      pages: 38,
      status: 'positive',
      summary: language === 'ar'
        ? 'رصد النمر العربي في عدة مواقع - مؤشر إيجابي'
        : 'Arabian Leopard spotted in multiple locations - positive indicator',
      icon: '🐆',
    },
    {
      id: 4,
      title: language === 'ar' ? 'تقرير محمية عروق بني معارض 2024' : 'Uruq Bani Ma\'arid Reserve Report 2024',
      reserve: language === 'ar' ? 'محمية عروق بني معارض' : 'Uruq Bani Ma\'arid Reserve',
      date: '2024-10-20',
      size: '2.9 MB',
      pages: 48,
      status: 'warning',
      summary: language === 'ar'
        ? 'حاجة لمزيد من الإجراءات لحماية الغطاء النباتي'
        : 'Need for more measures to protect vegetation cover',
      icon: '🌵',
    },
    {
      id: 5,
      title: language === 'ar' ? 'تقرير محمية الجبيل للأحياء البحرية 2024' : 'Jubail Marine Life Reserve Report 2024',
      reserve: language === 'ar' ? 'محمية الجبيل' : 'Jubail Reserve',
      date: '2024-10-10',
      size: '3.5 MB',
      pages: 60,
      status: 'positive',
      summary: language === 'ar'
        ? 'تحسن كبير في جودة المياه وزيادة الشعاب المرجانية'
        : 'Significant improvement in water quality and coral reef increase',
      icon: '🐠',
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
            <FileBarChart className={`w-10 h-10 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} mb-2`} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
              {language === 'ar' ? 'تقارير المحميات' : 'Reserve Reports'}
            </h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Reports List */}
        <div className="w-full max-w-md mx-auto space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'} rounded-2xl p-5 transition-all shadow-sm hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{report.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {report.status === 'positive' ? (
                      <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                        <TrendingUp className="w-3 h-3" />
                        <span>{language === 'ar' ? 'إيجابي' : 'Positive'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                        <TrendingDown className="w-3 h-3" />
                        <span>{language === 'ar' ? 'يحتاج متابعة' : 'Needs Follow-up'}</span>
                      </div>
                    )}
                  </div>
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-2`}>
                    {report.title}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                    {report.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        📅 {report.date}
                      </span>
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        📄 {report.pages} {language === 'ar' ? 'صفحة' : 'pages'}
                      </span>
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        💾 {report.size}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`${theme === 'dark' ? 'text-green-400 hover:bg-green-900/30' : 'text-green-600 hover:bg-green-100'}`}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
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
