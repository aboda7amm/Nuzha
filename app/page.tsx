"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import SaudiMap from "@/components/saudi-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("visitor")

  // حقول زائر/خليجي
  const [visitorData, setVisitorData] = useState({
    identityType: "passport", // passport or gcc
    idNumber: "",
    nationality: "",
    password: ""
  })

  // حقول مواطن/مقيم
  const [citizenData, setCitizenData] = useState({
    idType: "",
    password: ""
  })

  const handleLogin = () => {
    localStorage.setItem("userName", activeTab === "visitor" ? "زائر" : "مواطن")
    localStorage.setItem("userId", "demo-user")
    router.push("/dashboard")
  }

  return (
    <div 
      dir="rtl" 
      className="min-h-screen flex flex-col items-center px-4 relative"
      style={{
        backgroundImage: 'url(/desert-bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        filter: 'saturate(1.4) brightness(1.05)'
      }}
    >
      {/* Overlay للتحكم بالشفافية */}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-sm"></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center flex-1 justify-center py-8">
        {/* Saudi Arabia Map */}
        <div className="mb-8">
          <SaudiMap />
        </div>

        {/* App Name */}
        <h1 className="text-5xl font-bold mb-12 text-center text-primary tracking-wide">نُزْهه</h1>

        {/* Tabs Container with white background */}
        <div className="w-full bg-background/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="visitor" className="text-base">زائر / خليجي</TabsTrigger>
              <TabsTrigger value="citizen" className="text-base">مواطن / مقيم</TabsTrigger>
            </TabsList>

            {/* زائر / خليجي Tab */}
            <TabsContent value="visitor" className="space-y-4">
              {/* Radio buttons for identity type at the top - horizontal layout */}
              <div>
                <RadioGroup
                  value={visitorData.identityType}
                  onValueChange={(value) => setVisitorData({ ...visitorData, identityType: value })}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="passport" id="passport" />
                    <Label htmlFor="passport" className="text-sm cursor-pointer">
                      جواز السفر
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="gcc" id="gcc-visitor" />
                    <Label htmlFor="gcc-visitor" className="text-sm cursor-pointer">
                      هوية خليجية
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitor-id-number" className="text-sm">
                  {visitorData.identityType === "passport" ? "جواز السفر" : "رقم الهوية"}
                </Label>
                <Input
                  id="visitor-id-number"
                  placeholder=""
                  value={visitorData.idNumber}
                  onChange={(e) => setVisitorData({ ...visitorData, idNumber: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitor-nationality" className="text-sm">
                  الجنسية
                </Label>
                <Input
                  id="visitor-nationality"
                  placeholder=""
                  value={visitorData.nationality}
                  onChange={(e) => setVisitorData({ ...visitorData, nationality: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitor-password" className="text-sm">
                  كلمة المرور
                </Label>
                <Input
                  id="visitor-password"
                  type="password"
                  placeholder=""
                  value={visitorData.password}
                  onChange={(e) => setVisitorData({ ...visitorData, password: e.target.value })}
                  className="w-full"
                />
              </div>
            </TabsContent>

            {/* مواطن / مقيم Tab */}
            <TabsContent value="citizen" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="citizen-id-type" className="text-sm">
                  الهوية / الإقامة
                </Label>
                <Input
                  id="citizen-id-type"
                  placeholder=""
                  value={citizenData.idType}
                  onChange={(e) => setCitizenData({ ...citizenData, idType: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="citizen-password" className="text-sm">
                  كلمة المرور
                </Label>
                <Input
                  id="citizen-password"
                  type="password"
                  placeholder=""
                  value={citizenData.password}
                  onChange={(e) => setCitizenData({ ...citizenData, password: e.target.value })}
                  className="w-full"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:bg-primary/90 transition-all active:scale-95 mt-6 mb-4"
            aria-label="تسجيل الدخول"
          >
            تسجيل الدخول
          </button>

          {/* Nafath Login Link */}
          <button
            className="w-full py-3 text-base font-medium text-primary underline rounded-lg transition-colors hover:bg-secondary/50 active:scale-95"
            aria-label="تسجيل الدخول عبر نفاذ"
          >
            تسجيل الدخول عبر نفاذ
          </button>
        </div>
      </div>
    </div>
  )
}
