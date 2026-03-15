'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { TeamStatus } from '@prisma/client'

export async function registerTeam(data: {
  teamName: string
  captainName: string
  email: string
  phone: string
  rankScreenshot?: string
  tournamentId: string
  members: { name: string; inGameName: string; role?: string }[]
}) {
  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: data.tournamentId },
      select: { id: true, status: true },
    })

    if (!tournament) {
      return { success: false, error: 'Turnamen tidak ditemukan' }
    }

    if (tournament.status !== 'OPEN') {
      return { success: false, error: 'Pendaftaran untuk turnamen ini sedang ditutup' }
    }

    const team = await prisma.team.create({
      data: {
        teamName: data.teamName,
        captainName: data.captainName,
        email: data.email,
        phone: data.phone,
        rankScreenshot: data.rankScreenshot,
        tournamentId: data.tournamentId,
        status: TeamStatus.PENDING,
        members: {
          create: data.members.map((member) => ({
            name: member.name,
            inGameName: member.inGameName,
            role: member.role,
          })),
        },
      },
    })

    revalidatePath('/admin/registrants')
    revalidatePath('/admin/dashboard')
    return { success: true, teamId: team.id }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, error: 'Gagal menyimpan pendaftaran. Silakan coba lagi.' }
  }
}
