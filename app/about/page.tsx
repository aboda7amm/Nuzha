"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Shield, Map, Users, Leaf, Award, Heart } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import { useApp } from "@/contexts/AppContext"

export default function AboutPage() {
  const router = useRouter()
  const { theme, language } = useApp()

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      titleAr: "حماية البيئة",
      titleEn: "Environmental Protection",
      descAr: "نساهم في حماية المحميات الطبيعية والحياة البرية في المملكة",
      descEn: "We contribute to protecting natural reserves and wildlife in the Kingdom"
    },
    {
      icon: <Map className="w-8 h-8" />,
      titleAr: "استكشاف سهل",
      titleEn: "Easy Exploration",
      descAr: "اكتشف أكثر من 15 محمية طبيعية بسهولة عبر خرائط تفاعلية",
      descEn: "Discover over 15 natural reserves easily through interactive maps"
    },
    {
      icon: <Users className="w-8 h-8" />,
      titleAr: "مجتمع واعٍ",
      titleEn: "Aware Community",
      descAr: "انضم لمجتمع من محبي الطبيعة والمهتمين بالبيئة",
      descEn: "Join a community of nature lovers and environmental enthusiasts"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      titleAr: "تصاريح إلكترونية",
      titleEn: "Digital Permits",
      descAr: "احصل على تصاريح الزيارة والرعي بشكل إلكتروني فوري",
      descEn: "Get visit and grazing permits digitally and instantly"
    },
    {
      icon: <Award className="w-8 h-8" />,
      titleAr: "محتوى تعليمي",
      titleEn: "Educational Content",
      descAr: "مقالات وتقارير ومعلومات شاملة عن المحميات والحياة البرية",
      descEn: "Articles, reports and comprehensive information about reserves and wildlife"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      titleAr: "بلاغات بيئية",
      titleEn: "Environmental Reports",
      descAr: "ساهم في حماية البيئة من خلال الإبلاغ عن المخالفات",
      descEn: "Contribute to environmental protection by reporting violations"
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
            {language === 'ar' ? 'عن تطبيق نُزْهه' : 'About Nuzha App'}
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* App Logo and Description */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm p-6 text-center`}>
            <div className="mb-4">
              <h2 className={`text-5xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>
                نُزْهه
              </h2>
              <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Nuzha - Natural Reserves App
              </p>
            </div>
            <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'ar' 
                ? 'تطبيق نُزْهه هو منصة رقمية شاملة لاستكشاف وحماية المحميات الطبيعية في المملكة العربية السعودية. نوفر لك تجربة متكاملة للتعرف على التنوع البيئي الفريد والمساهمة في الحفاظ عليه للأجيال القادمة.'
                : 'Nuzha is a comprehensive digital platform for exploring and protecting natural reserves in Saudi Arabia. We provide you with an integrated experience to learn about unique environmental diversity and contribute to preserving it for future generations.'
              }
            </p>
          </Card>

          {/* Vision and Mission */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>
              {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
            </h3>
            <p className={`text-base leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'ar'
                ? 'أن نكون المنصة الرائدة في تعزيز الوعي البيئي وتسهيل الوصول إلى المحميات الطبيعية، مع المساهمة الفعالة في حماية التنوع الحيوي في المملكة.'
                : 'To be the leading platform in promoting environmental awareness and facilitating access to natural reserves, while actively contributing to protecting biodiversity in the Kingdom.'
              }
            </p>

            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>
              {language === 'ar' ? 'مهمتنا' : 'Our Mission'}
            </h3>
            <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'ar'
                ? 'نسعى لتوفير تجربة رقمية متميزة تربط المواطنين والزوار بالمحميات الطبيعية، وتمكينهم من المساهمة في حمايتها من خلال التوعية والمشاركة الفعالة.'
                : 'We strive to provide an exceptional digital experience that connects citizens and visitors with natural reserves, empowering them to contribute to their protection through awareness and active participation.'
              }
            </p>
          </Card>

          {/* Features */}
          <div className="space-y-4">
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>
              {language === 'ar' ? 'مميزات التطبيق' : 'App Features'}
            </h3>
            {features.map((feature, index) => (
              <Card key={index} className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm p-4`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'}`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {language === 'ar' ? feature.titleAr : feature.titleEn}
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? feature.descAr : feature.descEn}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Statistics */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>
              {language === 'ar' ? 'إحصائيات التطبيق' : 'App Statistics'}
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                  15+
                </div>
                <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'ar' ? 'محمية' : 'Reserves'}
                </div>
              </div>
              <div>
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                  50+
                </div>
                <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'ar' ? 'نوع حيواني' : 'Animal Species'}
                </div>
              </div>
              <div>
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                  100+
                </div>
                <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'ar' ? 'نوع نباتي' : 'Plant Species'}
                </div>
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm p-6 text-center`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'ar'
                ? 'للاستفسارات والدعم الفني'
                : 'For inquiries and technical support'
              }
            </p>
            <p className={`text-base font-semibold mt-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
              info@nuzha.sa
            </p>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  )
}
