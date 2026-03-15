import { prisma } from '@/lib/prisma'
import RegistrantsClient from './RegistrantsClient'

async function getTeams() {
  return await prisma.team.findMany({
    include: {
      tournament: {
        select: {
          name: true,
        },
      },
      members: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default async function RegistrantsPage() {
  const teams = await getTeams()

  return <RegistrantsClient teams={teams} />
}
