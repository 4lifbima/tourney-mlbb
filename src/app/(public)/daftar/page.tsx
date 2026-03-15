import Link from 'next/link'
import { Icon } from '@iconify/react'
import RegistrationForm from '@/components/public/RegistrationForm'
import { prisma } from '@/lib/prisma'

async function getActiveTournament() {
  try {
    return await prisma.tournament.findFirst({
      where: {
        status: 'OPEN',
      },
      orderBy: {
        startDate: 'asc',
      },
    })
  } catch (error) {
    console.error('Error fetching active tournament:', error)
    return null
  }
}

export const dynamic = 'force-dynamic'

export default async function RegistrationPage() {
  const tournament = await getActiveTournament()

  if (!tournament) {
    return (
      <section className="section-padding pt-28">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl card text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-btn bg-primary/10">
              <Icon icon="carbon:warning" className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Pendaftaran Belum Dibuka</h1>
            <p className="mt-3 text-gray-600">
              Saat ini belum ada turnamen dengan status OPEN. Silakan cek lagi nanti atau hubungi admin.
            </p>
            <Link href="/" className="btn-secondary mt-6 inline-flex items-center justify-center">
              Kembali ke Landing Page
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <main className="pt-8">
      <RegistrationForm tournamentId={tournament.id} />
    </main>
  )
}
