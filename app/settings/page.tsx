"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Settings as SettingsIcon, Sun, Moon, Globe, Phone, Mail, Info, HelpCircle, BookOpen } from "lucide-react"
import { useApp } from "@/contexts/AppContext"
import BottomNav from "@/components/bottom-nav"

export default function SettingsPage() {
  const router = useRouter()
  const { theme, language, setTheme, setLanguage, t } = useApp()

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

          {/* لمعرفة المزيد */}
          <div className="space-y-3">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-3`}>{t('learn_more_section')}</h2>
            
            <button 
              onClick={() => router.push('/about')}
              className={`w-full ${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'} rounded-2xl p-4 flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} transition-all`}
            >
              <Info className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{t('about_app')}</span>
            </button>

            <button 
              onClick={() => router.push('/faq')}
              className={`w-full ${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'} rounded-2xl p-4 flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} transition-all`}
            >
              <HelpCircle className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{t('faq')}</span>
            </button>

            <button 
              onClick={() => router.push('/user-guide')}
              className={`w-full ${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'} rounded-2xl p-4 flex items-center ${language === 'ar' ? 'justify-between' : 'justify-between flex-row-reverse'} transition-all`}
            >
              <BookOpen className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{t('user_guide')}</span>
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
