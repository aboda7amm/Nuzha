"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    try {
      // Create or get demo user
      localStorage.setItem("userName", "زائر")
      localStorage.setItem("userId", "demo-user")

      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogin}
      disabled={loading}
      className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:bg-primary/90 transition-all active:scale-95 mb-6"
      aria-label="تسجيل الدخول"
    >
      {loading ? "جاري التحميل..." : "تسجيل الدخول"}
    </Button>
  )
}
