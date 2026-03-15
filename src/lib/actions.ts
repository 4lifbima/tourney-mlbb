'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { TeamStatus, TournamentStatus } from '@prisma/client'

export async function getTournaments() {
  return await prisma.tournament.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      teams: {
        select: {
          id: true,
          status: true,
        },
      },
    },
  })
}

export async function getTournamentById(id: string) {
  return await prisma.tournament.findUnique({
    where: { id },
    include: {
      teams: {
        include: {
          members: true,
        },
      },
    },
  })
}

export async function createTournament(data: {
  name: string
  description?: string
  startDate: Date
  endDate: Date
  slot: number
  prizePool?: string
  status: TournamentStatus
}) {
  const tournament = await prisma.tournament.create({
    data,
  })
  revalidatePath('/admin/tournaments')
  return tournament
}

export async function updateTournament(
  id: string,
  data: {
    name?: string
    description?: string
    startDate?: Date
    endDate?: Date
    slot?: number
    prizePool?: string
    status?: TournamentStatus
  }
) {
  const tournament = await prisma.tournament.update({
    where: { id },
    data,
  })
  revalidatePath('/admin/tournaments')
  return tournament
}

export async function deleteTournament(id: string) {
  await prisma.tournament.delete({
    where: { id },
  })
  revalidatePath('/admin/tournaments')
}

export async function getTeams() {
  return await prisma.team.findMany({
    include: {
      tournament: {
        select: {
          name: true,
        },
      },
      members: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getTeamById(id: string) {
  return await prisma.team.findUnique({
    where: { id },
    include: {
      tournament: true,
      members: true,
    },
  })
}

export async function updateTeamStatus(
  id: string,
  status: TeamStatus
) {
  const team = await prisma.team.update({
    where: { id },
    data: { status },
  })
  revalidatePath('/admin/registrants')
  return team
}

export async function deleteTeam(id: string) {
  await prisma.team.delete({
    where: { id },
  })
  revalidatePath('/admin/registrants')
}

export async function getDashboardStats() {
  const tournaments = await prisma.tournament.findMany({
    include: {
      teams: {
        select: {
          status: true,
        },
      },
    },
  })

  const totalRegistrants = tournaments.reduce(
    (acc, t) => acc + t.teams.length,
    0
  )
  const pendingRegistrants = tournaments.reduce(
    (acc, t) =>
      acc + t.teams.filter((team) => team.status === TeamStatus.PENDING).length,
    0
  )
  const acceptedRegistrants = tournaments.reduce(
    (acc, t) =>
      acc + t.teams.filter((team) => team.status === TeamStatus.ACCEPTED).length,
    0
  )
  const rejectedRegistrants = tournaments.reduce(
    (acc, t) =>
      acc + t.teams.filter((team) => team.status === TeamStatus.REJECTED).length,
    0
  )

  const totalSlots = tournaments.reduce((acc, t) => acc + t.slot, 0)
  const filledSlots = acceptedRegistrants
  const availableSlots = totalSlots - filledSlots

  return {
    totalRegistrants,
    pendingRegistrants,
    acceptedRegistrants,
    rejectedRegistrants,
    availableSlots,
    totalTournaments: tournaments.length,
  }
}

export async function getRegistrantsByDate() {
  const teams = await prisma.team.findMany({
    select: {
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
  })

  const registrantsByDate = teams.reduce((acc: Record<string, number>, team) => {
    const date = team.createdAt.toISOString().split('T')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  return Object.entries(registrantsByDate).map(([date, count]) => ({
    date,
    count,
  }))
}

export async function getRegistrantsByStatus() {
  const teams = await prisma.team.findMany({
    select: {
      status: true,
    },
  })

  const statusCount = teams.reduce(
    (acc: Record<string, number>, team) => {
      acc[team.status] = (acc[team.status] || 0) + 1
      return acc
    },
    { PENDING: 0, ACCEPTED: 0, REJECTED: 0 }
  )

  return [
    { status: 'Pending', count: statusCount.PENDING },
    { status: 'Accepted', count: statusCount.ACCEPTED },
    { status: 'Rejected', count: statusCount.REJECTED },
  ]
}
