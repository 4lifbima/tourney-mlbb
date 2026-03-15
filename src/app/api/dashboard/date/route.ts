import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
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

    const data = Object.entries(registrantsByDate).map(([date, count]) => ({
      date,
      count,
    }))

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
