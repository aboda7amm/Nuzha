"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ChevronDown } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import { useApp } from "@/contexts/AppContext"
import { useState } from "react"

export default function FAQPage() {
  const router = useRouter()
  const { theme, language } = useApp()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      questionAr: "ما هو تطبيق نُزْهه؟",
      questionEn: "What is Nuzha App?",
      answerAr: "تطبيق نُزْهه هو منصة رقمية شاملة تهدف إلى تسهيل استكشاف المحميات الطبيعية في المملكة العربية السعودية. يوفر التطبيق معلومات تفصيلية عن المحميات، إصدار التصاريح الإلكترونية، خرائط تفاعلية، والإبلاغ عن المخالفات البيئية.",
      answerEn: "Nuzha is a comprehensive digital platform aimed at facilitating the exploration of natural reserves in Saudi Arabia. The app provides detailed information about reserves, electronic permit issuance, interactive maps, and reporting environmental violations."
    },
    {
      questionAr: "كيف أحصل على تصريح دخول للمحمية؟",
      questionEn: "How do I get a reserve entry permit?",
      answerAr: "يمكنك الحصول على تصريح دخول بسهولة من خلال التطبيق: 1) اذهب إلى قسم 'التصاريح' 2) اختر نوع التصريح (زيارة، رعي، بحثي، تصوير) 3) حدد المحمية والمدة 4) قدم الطلب. سيتم معالجة طلبك فوراً وستحصل على التصريح الإلكتروني.",
      answerEn: "You can easily obtain an entry permit through the app: 1) Go to 'Permits' section 2) Choose permit type (visit, grazing, research, photography) 3) Select reserve and duration 4) Submit request. Your request will be processed instantly and you'll receive the electronic permit."
    },
    {
      questionAr: "هل التطبيق مجاني؟",
      questionEn: "Is the app free?",
      answerAr: "نعم، تطبيق نُزْهه مجاني بالكامل للتحميل والاستخدام. جميع الخدمات الأساسية متاحة مجاناً بما في ذلك التصاريح، الخرائط، والمعلومات عن المحميات.",
      answerEn: "Yes, Nuzha app is completely free to download and use. All basic services are available for free including permits, maps, and information about reserves."
    },
    {
      questionAr: "كيف أبلغ عن مخالفة بيئية؟",
      questionEn: "How do I report an environmental violation?",
      answerAr: "للإبلاغ عن مخالفة بيئية: 1) اذهب إلى قسم 'بلاغ بيئي' 2) اختر نوع المخالفة (صيد غير قانوني، إلقاء نفايات، حريق، إلخ) 3) اكتب وصف تفصيلي 4) حدد الموقع على الخريطة 5) أرفق صور أو فيديو إن أمكن 6) أرسل البلاغ. سيتم متابعة بلاغك من قبل الجهات المختصة.",
      answerEn: "To report an environmental violation: 1) Go to 'Environmental Report' section 2) Choose violation type (illegal hunting, waste dumping, fire, etc.) 3) Write detailed description 4) Mark location on map 5) Attach photos or video if possible 6) Submit report. Your report will be followed up by relevant authorities."
    },
    {
      questionAr: "ما هي أنواع التصاريح المتاحة؟",
      questionEn: "What types of permits are available?",
      answerAr: "يوفر التطبيق أربعة أنواع من التصاريح: 1) تصريح زيارة: للسياحة والاستكشاف 2) تصريح رعي: للرعاة المرخصين 3) تصريح بحثي: للباحثين والأكاديميين 4) تصريح تصوير: للمصورين المحترفين. كل تصريح له متطلبات ومدة محددة.",
      answerEn: "The app offers four types of permits: 1) Visit permit: for tourism and exploration 2) Grazing permit: for licensed herders 3) Research permit: for researchers and academics 4) Photography permit: for professional photographers. Each permit has specific requirements and duration."
    },
    {
      questionAr: "هل يمكنني استخدام التطبيق بدون إنترنت؟",
      questionEn: "Can I use the app offline?",
      answerAr: "بعض الميزات تعمل بدون إنترنت مثل عرض التصاريح المحفوظة والخرائط التي تم تحميلها مسبقاً. لكن للحصول على تصاريح جديدة، الإبلاغ عن مخالفات، أو تحديث المعلومات، ستحتاج إلى اتصال بالإنترنت.",
      answerEn: "Some features work offline such as viewing saved permits and previously downloaded maps. However, to obtain new permits, report violations, or update information, you'll need an internet connection."
    },
    {
      questionAr: "كم عدد المحميات المتاحة في التطبيق؟",
      questionEn: "How many reserves are available in the app?",
      answerAr: "يغطي التطبيق أكثر من 15 محمية طبيعية في مختلف مناطق المملكة، بما في ذلك محمية الإمام سعود بن عبدالعزيز، محمية جزر فرسان، محمية عروق بني معارض، ومحميات أخرى. نعمل باستمرار على إضافة محميات جديدة.",
      answerEn: "The app covers more than 15 natural reserves across different regions of the Kingdom, including Imam Saud bin Abdulaziz Reserve, Farasan Islands Reserve, Uruq Bani Ma'arid Reserve, and others. We continuously work on adding new reserves."
    },
    {
      questionAr: "كيف أتواصل مع الدعم الفني؟",
      questionEn: "How do I contact technical support?",
      answerAr: "يمكنك التواصل مع فريق الدعم الفني عبر البريد الإلكتروني: info@nuzha.sa أو من خلال قسم 'الإعدادات' ثم 'التواصل' في التطبيق. نحن نرد على جميع الاستفسارات خلال 24 ساعة.",
      answerEn: "You can contact technical support via email: info@nuzha.sa or through 'Settings' then 'Contact' section in the app. We respond to all inquiries within 24 hours."
    },
    {
      questionAr: "هل معلوماتي الشخصية آمنة؟",
      questionEn: "Is my personal information safe?",
      answerAr: "نعم، نحن نأخذ خصوصية وأمان بياناتك على محمل الجد. جميع المعلومات الشخصية مشفرة ومحمية وفقاً لأعلى معايير الأمان. لا نشارك بياناتك مع أي جهة خارجية دون موافقتك.",
      answerEn: "Yes, we take your privacy and data security seriously. All personal information is encrypted and protected according to the highest security standards. We don't share your data with any third party without your consent."
    },
    {
      questionAr: "ماذا أفعل إذا نسيت كلمة المرور؟",
      questionEn: "What do I do if I forget my password?",
      answerAr: "في صفحة تسجيل الدخول، اضغط على 'نسيت كلمة المرور'. أدخل رقم هويتك أو بريدك الإلكتروني المسجل، وسنرسل لك رابط لإعادة تعيين كلمة المرور.",
      answerEn: "On the login page, click 'Forgot Password'. Enter your registered ID number or email, and we'll send you a link to reset your password."
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
            {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
          </h1>
          <div className="w-10"></div>
        </div>

        {/* FAQs */}
        <div className="w-full max-w-md mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm overflow-hidden`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 flex items-start justify-between gap-3 text-right hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <span className={`font-semibold flex-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {language === 'ar' ? faq.questionAr : faq.questionEn}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  } ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                />
              </button>
              
              {openIndex === index && (
                <div className={`px-4 pb-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`text-sm leading-relaxed mt-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'ar' ? faq.answerAr : faq.answerEn}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <div className="w-full max-w-md mx-auto mt-8">
          <Card className={`${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm p-6 text-center`}>
            <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>
              {language === 'ar' ? 'لم تجد إجابة لسؤالك؟' : "Didn't find your answer?"}
            </h3>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'ar' ? 'تواصل مع فريق الدعم الفني' : 'Contact technical support team'}
            </p>
            <p className={`text-base font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
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
