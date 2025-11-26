import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getOrCreateUser(fullName: string, nationalId: string, phone: string) {
  let user = await prisma.user.findUnique({ where: { nationalId } })

  if (!user) {
    user = await prisma.user.create({
      data: { fullName, nationalId, phone },
    })
  }

  return user
}

export async function getCurrentUser() {
  // For MVP: return a demo user
  return await getOrCreateUser("زائر", "1234567890", "0501234567")
}
