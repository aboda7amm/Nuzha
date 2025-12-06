"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark'
type Language = 'ar' | 'en'

interface AppContextType {
  theme: Theme
  language: Language
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [language, setLanguageState] = useState<Language>('ar')

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    const savedLanguage = localStorage.getItem('language') as Language
    
    if (savedTheme) {
      setThemeState(savedTheme)
      // Apply theme class immediately
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    
    if (savedLanguage) {
      setLanguageState(savedLanguage)
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = savedLanguage
    }
  }, [])

  // Save theme to localStorage and apply to document
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    
    // Apply theme class to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Save language to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem('language', newLanguage)
    
    // Update document direction
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLanguage
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <AppContext.Provider value={{ theme, language, setTheme, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Translations
const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'home': 'الرئيسية',
    'permits': 'التصاريح',
    'trips': 'رحلاتي',
    'myTrips': 'رحلاتي',
    'touristTrips': 'الرحلات السياحية',
    'report': 'بلاغ بيئي',
    'awareness': 'التوعية البيئية',
    'settings': 'الإعدادات',
    'map': 'موقعي',
    
    // Dashboard
    'welcome': 'مرحباً بك في نُزْهه',
    'dashboard_subtitle': 'استكشف المحميات الطبيعية في المملكة',
    'quick_access': 'الوصول السريع',
    'request_permit': 'طلب تصريح',
    'view_map': 'عرض الخريطة',
    'report_issue': 'إبلاغ عن مشكلة',
    'learn_more': 'تعلم المزيد',
    
    // Permits
    'permit_type': 'نوع التصريح',
    'visit_permit': 'تصريح زيارة',
    'grazing_permit': 'تصريح رعي',
    'research_permit': 'تصريح بحثي',
    'photography_permit': 'تصريح تصوير',
    'reserve': 'المحميات',
    'duration': 'مدة التصريح',
    '1day': 'يوم واحد',
    '3days': '3 أيام',
    'week': 'أسبوع',
    'month': 'شهر',
    'submit_request': 'طلب تصريح',
    
    // Permit Card
    'permit_card': 'بطاقة تصريح',
    'reserve_entry_permit': 'تصريح دخول المحمية',
    'id_number': 'رقم الهوية',
    'issue_date': 'تاريخ الإصدار',
    'permit_status': 'حالة التصريح',
    'active': 'فعّال',
    'download_card': 'تحميل البطاقة',
    
    // Settings
    'appearance': 'المظهر',
    'light_mode': 'الوضع الفاتح',
    'dark_mode': 'الوضع الداكن',
    'language': 'اللغة',
    'contact': 'التواصل',
    'learn_more_section': 'لمعرفة المزيد',
    'learnMore': 'معرفة المزيد',
    'aboutApp': 'عن تطبيق نُزْهه',
    'about_app': 'عن تطبيق نزهه',
    'faq': 'الأسئلة الشائعة',
    'userGuide': 'دليل المستخدم',
    'user_guide': 'دليل المستخدم',
    
    // Map
    'interactive_map': 'الخريطة التفاعلية',
    'my_location': 'موقعي',
    
    // Reports
    'environmental_reports': 'البلاغات البيئية',
    'report_type': 'نوع البلاغ',
    'illegal_hunting': 'صيد غير قانوني',
    'waste_dumping': 'إلقاء نفايات',
    'fire': 'حريق',
    'other': 'أخرى',
    'description': 'الوصف',
    'describe_issue': 'صف المشكلة بالتفصيل...',
    'location': 'الموقع',
    'attach_media': 'إرفاق صور أو فيديو',
    'submit_report': 'إرسال البلاغ',
    
    // Awareness
    'environmental_awareness': 'التوعية البيئية',
    
    // Common
    'back': 'رجوع',
    'save': 'حفظ',
    'cancel': 'إلغاء',
    'confirm': 'تأكيد',
    'close': 'إغلاق',
  },
  en: {
    // Navigation
    'home': 'Home',
    'permits': 'Permits',
    'trips': 'Trips',
    'myTrips': 'My Trips',
    'touristTrips': 'Tourist Trips',
    'report': 'Reports',
    'awareness': 'Awareness',
    'settings': 'Settings',
    'map': 'Map',
    
    // Dashboard
    'welcome': 'Welcome to Nuzha',
    'dashboard_subtitle': 'Explore Natural Reserves in Saudi Arabia',
    'quick_access': 'Quick Access',
    'request_permit': 'Request Permit',
    'view_map': 'View Map',
    'report_issue': 'Report Issue',
    'learn_more': 'Learn More',
    
    // Permits
    'permit_type': 'Permit Type',
    'visit_permit': 'Visit Permit',
    'grazing_permit': 'Grazing Permit',
    'research_permit': 'Research Permit',
    'photography_permit': 'Photography Permit',
    'reserve': 'Reserves',
    'duration': 'Duration',
    '1day': '1 Day',
    '3days': '3 Days',
    'week': 'Week',
    'month': 'Month',
    'submit_request': 'Submit Request',
    
    // Permit Card
    'permit_card': 'Permit Card',
    'reserve_entry_permit': 'Reserve Entry Permit',
    'id_number': 'ID Number',
    'issue_date': 'Issue Date',
    'permit_status': 'Permit Status',
    'active': 'Active',
    'download_card': 'Download Card',
    
    // Settings
    'appearance': 'Appearance',
    'light_mode': 'Light Mode',
    'dark_mode': 'Dark Mode',
    'language': 'Language',
    'contact': 'Contact',
    'learn_more_section': 'Learn More',
    'learnMore': 'Learn More',
    'aboutApp': 'About Nuzha App',
    'about_app': 'About Nuzha App',
    'faq': 'FAQ',
    'userGuide': 'User Guide',
    'user_guide': 'User Guide',
    
    // Map
    'interactive_map': 'Interactive Map',
    'my_location': 'My Location',
    
    // Reports
    'environmental_reports': 'Environmental Reports',
    'report_type': 'Report Type',
    'illegal_hunting': 'Illegal Hunting',
    'waste_dumping': 'Waste Dumping',
    'fire': 'Fire',
    'other': 'Other',
    'description': 'Description',
    'describe_issue': 'Describe the issue in detail...',
    'location': 'Location',
    'attach_media': 'Attach Photos or Video',
    'submit_report': 'Submit Report',
    
    // Awareness
    'environmental_awareness': 'Environmental Awareness',
    
    // Common
    'back': 'Back',
    'save': 'Save',
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'close': 'Close',
  }
}
