import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
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

    const data = [
      { status: 'Pending', count: statusCount.PENDING },
      { status: 'Accepted', count: statusCount.ACCEPTED },
      { status: 'Rejected', count: statusCount.REJECTED },
    ]

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
