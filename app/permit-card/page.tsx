"use client"

import { Suspense } from "react"
import PermitCardContent from "./PermitCardContent"

export default function PermitCardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>}>
      <PermitCardContent />
    </Suspense>
  )
}
