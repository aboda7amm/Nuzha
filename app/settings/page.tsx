"use client"

import type React from "react"
import { useState } from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Settings as SettingsIcon, Sun, Moon, Globe, Phone, Mail, Info, HelpCircle, BookOpen, ChevronDown, ChevronUp } from "lucide-react"
import { useApp } from "@/contexts/AppContext"
import BottomNav from "@/components/bottom-nav"

export default function SettingsPage() {
  const router = useRouter()
  const { theme, language, setTheme, setLanguage, t } = useApp()
  
  // State for accordion
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
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
            <SettingsIcon className={`w-10 h-10 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'} mb-2`} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{t('settings')}</h1>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Settings Content */}
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* المظهر */}
          <div className="space-y-3">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-3`}>{t('appearance')}</h2>
            
            <button
              onClick={() => setTheme("light")}
              className={`w-full flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} p-4 rounded-2xl transition-all ${
                theme === "light" 
                  ? "bg-white shadow-md" 
                  : theme === 'dark' 
                    ? "bg-gray-800/60" 
                    : "bg-white/60"
              }`}
            >
              <Sun className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{t('light_mode')}</span>
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`w-full flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} p-4 rounded-2xl transition-all ${
                theme === "dark" 
                  ? "bg-gray-700 shadow-md" 
                  : "bg-white/60"
              }`}
            >
              <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{t('dark_mode')}</span>
            </button>
          </div>

          {/* اللغة */}
          <div className="space-y-3">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-3`}>{t('language')}</h2>
            
            <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-4 flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'}`}>
              <Globe className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
              <Select value={language} onValueChange={(val) => setLanguage(val as 'ar' | 'en')}>
                <SelectTrigger className={`w-48 border-0 bg-transparent ${language === 'ar' ? 'text-right' : 'text-left'} ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* التواصل */}
          <div className="space-y-3">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-3`}>{t('contact')}</h2>
            
            <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-4 flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'}`}>
              <Phone className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium tracking-wider`}>**********</span>
            </div>

            <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl p-4 flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'}`}>
              <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>***@gov.sa</span>
            </div>
          </div>

          {/* لمعرفة المزيد - Accordion */}
          <div className="space-y-3">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-3`}>{t('learn_more_section')}</h2>
            
            {/* عن تطبيق نزهه */}
            <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl overflow-hidden transition-all`}>
              <button 
                onClick={() => toggleSection('about')}
                className={`w-full p-4 flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} transition-all`}
              >
                <div className="flex items-center gap-3">
                  <Info className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <div className="flex items-center gap-3">
                  <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{t('about_app')}</span>
                  {openSection === 'about' ? (
                    <ChevronUp className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </div>
              </button>
              
              {openSection === 'about' && (
                <div className={`px-4 pb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
                  <p className="mb-3">
                    {language === 'ar' 
                      ? 'تطبيق نُزْهه هو منصة رقمية شاملة لاستكشاف وحماية المحميات الطبيعية في المملكة العربية السعودية. نوفر لك تجربة متكاملة للتعرف على التنوع البيئي الفريد والمساهمة في الحفاظ عليه للأجيال القادمة.'
                      : 'Nuzha is a comprehensive digital platform for exploring and protecting natural reserves in Saudi Arabia. We provide you with an integrated experience to learn about unique biodiversity and contribute to preserving it for future generations.'
                    }
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold">{language === 'ar' ? 'مميزات التطبيق:' : 'App Features:'}</p>
                    <ul className={`${language === 'ar' ? 'pr-4' : 'pl-4'} space-y-1`}>
                      <li>• {language === 'ar' ? 'استكشاف أكثر من 15 محمية طبيعية' : 'Explore 15+ natural reserves'}</li>
                      <li>• {language === 'ar' ? 'تصاريح إلكترونية فورية' : 'Instant electronic permits'}</li>
                      <li>• {language === 'ar' ? 'خرائط تفاعلية' : 'Interactive maps'}</li>
                      <li>• {language === 'ar' ? 'محتوى تعليمي شامل' : 'Comprehensive educational content'}</li>
                      <li>• {language === 'ar' ? 'نظام بلاغات بيئية' : 'Environmental reporting system'}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* الأسئلة الشائعة */}
            <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl overflow-hidden transition-all`}>
              <button 
                onClick={() => toggleSection('faq')}
                className={`w-full p-4 flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} transition-all`}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <div className="flex items-center gap-3">
                  <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{t('faq')}</span>
                  {openSection === 'faq' ? (
                    <ChevronUp className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </div>
              </button>
              
              {openSection === 'faq' && (
                <div className={`px-4 pb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
                  <div>
                    <p className="font-semibold mb-1">{language === 'ar' ? 'كيف أحصل على تصريح؟' : 'How do I get a permit?'}</p>
                    <p className="text-xs">{language === 'ar' ? 'من الصفحة الرئيسية، اضغط على "التصاريح" واختر نوع التصريح والمحمية والمدة.' : 'From home page, tap "Permits" and choose permit type, reserve, and duration.'}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{language === 'ar' ? 'هل التطبيق مجاني؟' : 'Is the app free?'}</p>
                    <p className="text-xs">{language === 'ar' ? 'نعم، التطبيق مجاني تماماً. بعض التصاريح قد تتطلب رسوم رمزية.' : 'Yes, the app is completely free. Some permits may require nominal fees.'}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{language === 'ar' ? 'كيف أبلغ عن مخالفة؟' : 'How do I report a violation?'}</p>
                    <p className="text-xs">{language === 'ar' ? 'اضغط على "البلاغات" من الصفحة الرئيسية، اختر نوع المخالفة، وأرفق الصور.' : 'Tap "Reports" from home page, choose violation type, and attach photos.'}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{language === 'ar' ? 'كم عدد المحميات؟' : 'How many reserves?'}</p>
                    <p className="text-xs">{language === 'ar' ? 'يغطي التطبيق أكثر من 15 محمية طبيعية في المملكة.' : 'The app covers 15+ natural reserves in the Kingdom.'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* دليل المستخدم */}
            <div className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} rounded-2xl overflow-hidden transition-all`}>
              <button 
                onClick={() => toggleSection('guide')}
                className={`w-full p-4 flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} transition-all`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <div className="flex items-center gap-3">
                  <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{t('user_guide')}</span>
                  {openSection === 'guide' ? (
                    <ChevronUp className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </div>
              </button>
              
              {openSection === 'guide' && (
                <div className={`px-4 pb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
                  <div>
                    <p className="font-semibold mb-2">{language === 'ar' ? 'الخطوات الأساسية:' : 'Basic Steps:'}</p>
                    <ol className={`${language === 'ar' ? 'pr-4' : 'pl-4'} space-y-1 text-xs`}>
                      <li>1. {language === 'ar' ? 'سجل دخولك أو أنشئ حساب جديد' : 'Login or create new account'}</li>
                      <li>2. {language === 'ar' ? 'تصفح المحميات من الخريطة' : 'Browse reserves from map'}</li>
                      <li>3. {language === 'ar' ? 'احصل على تصريح الزيارة' : 'Get visit permit'}</li>
                      <li>4. {language === 'ar' ? 'خطط رحلتك من قسم "رحلاتي"' : 'Plan trip from "My Trips"'}</li>
                      <li>5. {language === 'ar' ? 'استمتع بزيارتك وساهم في حماية البيئة' : 'Enjoy visit and help protect environment'}</li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{language === 'ar' ? 'نصائح مفيدة:' : 'Useful Tips:'}</p>
                    <ul className={`${language === 'ar' ? 'pr-4' : 'pl-4'} space-y-1 text-xs`}>
                      <li>• {language === 'ar' ? 'احفظ التصاريح للوصول بدون إنترنت' : 'Save permits for offline access'}</li>
                      <li>• {language === 'ar' ? 'فعّل خدمات الموقع للتجربة الأفضل' : 'Enable location for best experience'}</li>
                      <li>• {language === 'ar' ? 'راجع معلومات المحمية قبل الزيارة' : 'Review reserve info before visit'}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
