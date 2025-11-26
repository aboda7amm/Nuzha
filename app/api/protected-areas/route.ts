import { NextResponse } from "next/server"

// بيانات المحميات التجريبية
const mockProtectedAreas = [
  { id: "area-1", name: "محمية الطبيق", region: "الرياض", zoneType: "GREEN", description: "محمية طبيعية خضراء", createdAt: new Date().toISOString() },
  { id: "area-2", name: "محمية الوعول", region: "الشرقية", zoneType: "YELLOW", description: "محمية مشروطة الدخول", createdAt: new Date().toISOString() },
  { id: "area-3", name: "محمية أم الرمة", region: "القصيم", zoneType: "GREEN", description: "محمية طبيعية آمنة", createdAt: new Date().toISOString() },
  { id: "area-4", name: "محمية رجم الحمى", region: "الجوف", zoneType: "RED", description: "محمية محظورة حاليا", createdAt: new Date().toISOString() },
  { id: "area-5", name: "محمية جزر فرسان", region: "جازان", zoneType: "YELLOW", description: "جزر محمية في البحر الأحمر", createdAt: new Date().toISOString() },
]

export async function GET() {
  try {
    return NextResponse.json(mockProtectedAreas)
  } catch (error) {
    console.error("[v0] Protected areas fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch protected areas",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
