import { prisma } from '@/lib/prisma'
import TournamentsClient from './TournamentsClient'

async function getTournaments() {
  return await prisma.tournament.findMany({
    include: {
      teams: {
        select: {
          id: true,
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default async function TournamentsPage() {
  const tournaments = await getTournaments()

  return <TournamentsClient tournaments={tournaments} />
}
