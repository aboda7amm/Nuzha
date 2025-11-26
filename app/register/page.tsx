"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import SaudiMap from "@/components/saudi-map"
import DesertLandscape from "@/components/desert-landscape"

type UserType = "citizen" | "resident" | "visitor" | "gulf"

export default function RegisterPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType>("citizen")
  const [formData, setFormData] = useState({
    idNumber: "",
    password: "",
    name: "",
    gulfId: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegister = () => {
    if (!formData.idNumber || !formData.password) {
      alert("الرجاء ملء جميع الحقول المطلوبة")
      return
    }

    localStorage.setItem("userName", formData.name || "زائر")
    localStorage.setItem("userId", formData.idNumber)
    localStorage.setItem("userType", userType)
    router.push("/dashboard")
  }

  const showNameField = userType === "citizen" || userType === "resident"
  const showGulfIdField = userType === "gulf"

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center px-4 relative overflow-hidden"
      style={{ backgroundColor: "#f5efe1" }}
    >
      {/* Main content container */}
      <div className="w-full max-w-sm flex flex-col items-center pt-8 pb-8">
        {/* Saudi Arabia Map */}
        <div className="mb-6">
          <SaudiMap />
        </div>

        {/* App Name */}
        <h1 className="text-5xl font-bold mb-6 text-center" style={{ color: "#1f3c2c" }}>
          نُزْهه
        </h1>

        <div className="w-full flex gap-2 mb-8 flex-wrap justify-center">
          {[
            { value: "citizen" as const, label: "مواطن" },
            { value: "resident" as const, label: "مقيم" },
            { value: "visitor" as const, label: "زائر" },
            { value: "gulf" as const, label: "خليجي" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setUserType(tab.value)}
              className={`py-2 px-4 rounded-full font-semibold text-sm transition-all active:scale-95 ${
                userType === tab.value ? "text-white shadow-md" : "border-2 text-gray-700"
              }`}
              style={
                userType === tab.value
                  ? { backgroundColor: "#234f36" }
                  : { borderColor: "#234f36", color: "#234f36", backgroundColor: "transparent" }
              }
              aria-label={`تسجيل ${tab.label}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Fields Container */}
        <div className="w-full rounded-xl p-6 mb-6 space-y-4" style={{ backgroundColor: "#f5f5dc" }}>
          {/* ID Number Field - shown for all types */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#1f3c2c" }}>
              رقم الهوية
            </label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              placeholder="أدخل رقم الهوية"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: "#ccc", "--tw-ring-color": "#234f36" } as React.CSSProperties}
              aria-label="رقم الهوية"
            />
          </div>

          {/* Name Field - for citizen and resident */}
          {showNameField && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1f3c2c" }}>
                الاسم
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="أدخل اسمك"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                style={{ borderColor: "#ccc", "--tw-ring-color": "#234f36" } as React.CSSProperties}
                aria-label="الاسم"
              />
            </div>
          )}

          {/* Gulf ID Field - only for gulf type */}
          {showGulfIdField && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#1f3c2c" }}>
                هوية خليجية
              </label>
              <input
                type="text"
                name="gulfId"
                value={formData.gulfId}
                onChange={handleInputChange}
                placeholder="أدخل رقم الهوية الخليجية"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                style={{ borderColor: "#ccc", "--tw-ring-color": "#234f36" } as React.CSSProperties}
                aria-label="هوية خليجية"
              />
            </div>
          )}

          {/* Password Field - shown for all types */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#1f3c2c" }}>
              كلمة المرور
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="أدخل كلمة المرور"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
              style={{ borderColor: "#ccc", "--tw-ring-color": "#234f36" } as React.CSSProperties}
              aria-label="كلمة المرور"
            />
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full px-8 py-4 rounded-full text-lg font-semibold shadow-md transition-all active:scale-95 mb-6 text-white"
          style={{ backgroundColor: "#234f36" }}
          aria-label="تسجيل الدخول"
        >
          تسجيل الدخول
        </button>

        {/* Secondary Nafath Login Button - text only */}
        <button
          className="w-full py-3 text-base font-medium rounded-lg transition-colors active:scale-95"
          style={{ color: "#1f3c2c" }}
          aria-label="تسجيل الدخول عبر نفاذ"
        >
          تسجيل الدخول عبر نفاذ
        </button>
      </div>

      {/* Desert Landscape at Bottom */}
      <div className="w-full mt-auto">
        <DesertLandscape />
      </div>
    </div>
  )
}
