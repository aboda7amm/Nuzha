import { NextResponse } from "next/server"

// بيانات تجريبية مخزنة في الذاكرة
const mockPermits: any[] = []

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "demo-user"

    // إرجاع التصاريح المخزنة في الذاكرة
    const userPermits = mockPermits.filter(p => p.userId === userId)
    
    return NextResponse.json(userPermits)
  } catch (error) {
    console.error("[v0] Permits fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch permits",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newPermit = {
      id: `permit-${Date.now()}`,
      userId: body.userId || "demo-user",
      protectedAreaId: body.protectedAreaId,
      type: body.type,
      visitDate: body.visitDate,
      durationHours: body.durationHours,
      livestockCount: body.livestockCount,
      status: "PENDING",
      qrCode: `QR-${Date.now()}`,
      createdAt: new Date().toISOString(),
      protectedArea: {
        id: body.protectedAreaId,
        name: "محمية تجريبية",
        region: "المنطقة الوسطى",
        zoneType: "GREEN"
      },
      user: {
        id: body.userId || "demo-user",
        fullName: "مستخدم تجريبي",
        nationalId: "1234567890",
        phone: "+966500000000"
      }
    }
    
    mockPermits.push(newPermit)
    
    return NextResponse.json(newPermit, { status: 201 })
  } catch (error) {
    console.error("[v0] Permit creation error:", error)
    return NextResponse.json(
      {
        error: "Failed to create permit",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
