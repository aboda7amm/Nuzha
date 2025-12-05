"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Newspaper, Calendar, Eye } from "lucide-react"
import { useApp } from "@/contexts/AppContext"
import BottomNav from "@/components/bottom-nav"

export default function ArticlesPage() {
  const router = useRouter()
  const { theme, language, t } = useApp()

  const articles = [
    {
      id: 1,
      title: language === 'ar' ? 'أهمية المحميات الطبيعية في السعودية' : 'Importance of Natural Reserves in Saudi Arabia',
      excerpt: language === 'ar' 
        ? 'تلعب المحميات الطبيعية دوراً حيوياً في الحفاظ على التنوع البيولوجي والحياة البرية في المملكة...'
        : 'Natural reserves play a vital role in preserving biodiversity and wildlife in the Kingdom...',
      date: '2024-12-01',
      views: 1250,
      category: language === 'ar' ? 'بيئة' : 'Environment',
      image: '🌿',
    },
    {
      id: 2,
      title: language === 'ar' ? 'الحياة البرية في محمية الإمام سعود' : 'Wildlife in Imam Saud Reserve',
      excerpt: language === 'ar'
        ? 'تعد محمية الإمام سعود موطناً لأنواع نادرة من الحيوانات والنباتات...'
        : 'Imam Saud Reserve is home to rare species of animals and plants...',
      date: '2024-11-28',
      views: 980,
      category: language === 'ar' ? 'حياة برية' : 'Wildlife',
      image: '🦌',
    },
    {
      id: 3,
      title: language === 'ar' ? 'كيف نحمي البيئة أثناء الرحلات' : 'How to Protect the Environment During Trips',
      excerpt: language === 'ar'
        ? 'نصائح وإرشادات للحفاظ على البيئة أثناء زيارة المحميات الطبيعية...'
        : 'Tips and guidelines for preserving the environment while visiting natural reserves...',
      date: '2024-11-25',
      views: 1500,
      category: language === 'ar' ? 'توعية' : 'Awareness',
      image: '♻️',
    },
    {
      id: 4,
      title: language === 'ar' ? 'النمر العربي: رمز التراث السعودي' : 'Arabian Leopard: Symbol of Saudi Heritage',
      excerpt: language === 'ar'
        ? 'النمر العربي من أندر الحيوانات في العالم ويعيش في محمياتنا الطبيعية...'
        : 'The Arabian Leopard is one of the rarest animals in the world and lives in our natural reserves...',
      date: '2024-11-20',
      views: 2100,
      category: language === 'ar' ? 'حياة برية' : 'Wildlife',
      image: '🐆',
    },
    {
      id: 5,
      title: language === 'ar' ? 'جزر فرسان: جنة بيئية في البحر الأحمر' : 'Farasan Islands: Environmental Paradise in the Red Sea',
      excerpt: language === 'ar'
        ? 'تتميز جزر فرسان بتنوعها البيولوجي البحري والبري الفريد...'
        : 'Farasan Islands are distinguished by their unique marine and terrestrial biodiversity...',
      date: '2024-11-15',
      views: 1800,
      category: language === 'ar' ? 'محميات' : 'Reserves',
      image: '🏝️',
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
            <Newspaper className={`w-10 h-10 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mb-2`} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
              {language === 'ar' ? 'المقالات' : 'Articles'}
            </h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Articles List */}
        <div className="w-full max-w-md mx-auto space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className={`${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'} rounded-2xl p-5 transition-all shadow-sm hover:shadow-md cursor-pointer`}
              onClick={() => {/* TODO: Navigate to article detail */}}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{article.image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                      {article.category}
                    </span>
                  </div>
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-2`}>
                    {article.title}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3 line-clamp-2`}>
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar className={`w-3 h-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className={`w-3 h-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{article.views}</span>
                      </div>
                    </div>
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
