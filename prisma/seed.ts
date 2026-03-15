import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@mlbb.com' },
    update: {},
    create: {
      email: 'admin@mlbb.com',
      password: hashedPassword,
      name: 'Admin MLBB',
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // Create Tournament
  const tournament = await prisma.tournament.upsert({
    where: { id: 'tournament-001' },
    update: {},
    create: {
      id: 'tournament-001',
      name: 'MLBB Championship 2026',
      description: 'Turnamen Mobile Legends terbesar tahun 2026 dengan total hadiah Rp 10 juta',
      startDate: new Date('2026-03-20'),
      endDate: new Date('2026-03-30'),
      slot: 128,
      prizePool: 'Rp 10.000.000',
      status: 'OPEN',
    },
  })
  console.log('✅ Created tournament:', tournament.name)

  // Create Sample Teams
  const sampleTeams = [
    {
      teamName: 'Dream Team',
      captainName: 'John Doe',
      email: 'john@dreamteam.com',
      phone: '081234567890',
      members: [
        { name: 'John Doe', inGameName: 'DT_Captain', role: 'Jungler' },
        { name: 'Jane Smith', inGameName: 'DT_Gold', role: 'Gold Laner' },
        { name: 'Bob Wilson', inGameName: 'DT_Mid', role: 'Mid Laner' },
        { name: 'Alice Brown', inGameName: 'DT_Exp', role: 'Exp Laner' },
        { name: 'Charlie Davis', inGameName: 'DT_Roam', role: 'Roamer' },
      ],
    },
    {
      teamName: 'Legend Killers',
      captainName: 'Michael Chen',
      email: 'michael@lk.com',
      phone: '081234567891',
      members: [
        { name: 'Michael Chen', inGameName: 'LK_Dragon', role: 'Jungler' },
        { name: 'David Lee', inGameName: 'LK_Marksman', role: 'Gold Laner' },
        { name: 'Kevin Tan', inGameName: 'LK_Mage', role: 'Mid Laner' },
        { name: 'Ryan Wong', inGameName: 'LK_Fighter', role: 'Exp Laner' },
        { name: 'Steven Lim', inGameName: 'LK_Support', role: 'Roamer' },
      ],
    },
    {
      teamName: 'Phoenix Rising',
      captainName: 'Sarah Johnson',
      email: 'sarah@phoenix.com',
      phone: '081234567892',
      members: [
        { name: 'Sarah Johnson', inGameName: 'PR_Phoenix', role: 'Mid Laner' },
        { name: 'Emily Davis', inGameName: 'PR_Archer', role: 'Gold Laner' },
        { name: 'Lisa Wang', inGameName: 'PR_Assassin', role: 'Jungler' },
        { name: 'Anna Lee', inGameName: 'PR_Tank', role: 'Roamer' },
        { name: 'Michelle Tan', inGameName: 'PR_Warrior', role: 'Exp Laner' },
      ],
    },
  ]

  for (const teamData of sampleTeams) {
    const team = await prisma.team.create({
      data: {
        ...teamData,
        tournamentId: tournament.id,
        status: 'PENDING',
        members: {
          create: teamData.members,
        },
      },
    })
    console.log('✅ Created team:', team.teamName)
  }

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
