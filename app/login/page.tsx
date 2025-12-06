"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [nationalId, setNationalId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // التحقق من بيانات الأمن البيئي
    if (nationalId === "123456789" && password === "123456789") {
      localStorage.setItem("userRole", "environmental-security")
      router.push("/drone-control")
    } else if (nationalId && password) {
      // مستخدم عادي
      localStorage.setItem("userRole", "user")
      router.push("/")
    } else {
      setError("الرجاء إدخال رقم الهوية وكلمة المرور")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white text-center">
            <div className="mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-4xl">🌿</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">نُزْهه</h1>
              <p className="text-green-100">منصة إدارة المحميات البيئية</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">تسجيل الدخول</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* National ID Input */}
              <div>
                <label htmlFor="nationalId" className="block text-sm font-semibold text-gray-700 mb-2">
                  رقم الهوية الوطنية
                </label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    id="nationalId"
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="أدخل رقم الهوية"
                    className="w-full pr-11 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="w-full pr-11 pl-11 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                دخول
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center space-y-3">
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                نسيت كلمة المرور؟
              </button>
              <div className="text-sm text-gray-600">
                ليس لديك حساب؟{" "}
                <button 
                  onClick={() => router.push("/register")}
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  سجل الآن
                </button>
              </div>
            </div>

            {/* Demo Info */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800 font-semibold mb-2">🔐 للوصول إلى لوحة الأمن البيئي:</p>
              <p className="text-xs text-blue-700">رقم الهوية: 123456789</p>
              <p className="text-xs text-blue-700">كلمة المرور: 123456789</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© 2025 نُزْهه - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  )
}
