import {
  Users,
  Clock3,
  CircleCheck,
  CircleX,
  Ticket,
  Trophy,
} from 'lucide-react'
import { getDashboardStats } from '@/lib/actions'
import DashboardCharts from './DashboardCharts'

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  const statCards = [
    {
      title: 'Total Pendaftar',
      value: stats.totalRegistrants,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Tim Pending',
      value: stats.pendingRegistrants,
      icon: Clock3,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Tim Diterima',
      value: stats.acceptedRegistrants,
      icon: CircleCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Tim Ditolak',
      value: stats.rejectedRegistrants,
      icon: CircleX,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Slot Tersisa',
      value: stats.availableSlots,
      icon: Ticket,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total Turnamen',
      value: stats.totalTournaments,
      icon: Trophy,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-soft-lg">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-300">Overview statistik turnamen</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} w-14 h-14 rounded-btn flex items-center justify-center`}>
                <stat.icon className="w-7 h-7" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <DashboardCharts />
    </div>
  )
}
