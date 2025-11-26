import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const permit = await prisma.permit.findUnique({
      where: { id },
      include: { protectedArea: true, user: true },
    })

    if (!permit) {
      return NextResponse.json({ error: "Permit not found" }, { status: 404 })
    }

    return NextResponse.json(permit)
  } catch (error) {
    console.error("[v0] Permit detail fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch permit",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
