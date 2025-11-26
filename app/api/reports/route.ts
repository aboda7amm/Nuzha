import { NextResponse } from "next/server"

// بيانات تجريبية مخزنة في الذاكرة
const mockReports: any[] = []

export async function GET() {
  try {
    return NextResponse.json(mockReports)
  } catch (error) {
    console.error("[v0] Reports fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch reports",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, protectedAreaId, lat, lng, description, imageUrl } = body

    const newReport = {
      id: `report-${Date.now()}`,
      userId: userId || "demo-user",
      protectedAreaId,
      lat,
      lng,
      description,
      imageUrl,
      status: "NEW",
      createdAt: new Date().toISOString(),
      user: {
        id: userId || "demo-user",
        fullName: "مستخدم تجريبي",
        nationalId: "1234567890",
        phone: "+966500000000"
      },
      protectedArea: protectedAreaId ? {
        id: protectedAreaId,
        name: "محمية تجريبية",
        region: "المنطقة الوسطى",
        zoneType: "GREEN"
      } : null
    }

    mockReports.push(newReport)

    return NextResponse.json(newReport, { status: 201 })
  } catch (error) {
    console.error("[v0] Report creation error:", error)
    return NextResponse.json(
      {
        error: "Failed to create report",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
