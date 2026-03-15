'use client'

import { useState, useTransition, useMemo, useEffect } from 'react'
import {
  Download,
  Search,
  Users,
  Eye,
  Check,
  X,
  Trash2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Team, TeamStatus, Member } from '@prisma/client'
import { updateTeamStatus, deleteTeam } from '@/lib/actions'

interface TeamWithMembers extends Team {
  tournament: {
    name: string
  }
  members: Member[]
}

interface RegistrantsClientProps {
  teams: TeamWithMembers[]
}

export default function RegistrantsClient({ teams: initialTeams }: RegistrantsClientProps) {
  const [teams, setTeams] = useState(initialTeams)
  const [filter, setFilter] = useState<'all' | TeamStatus>('all')
  const [search, setSearch] = useState('')
  const [selectedTeam, setSelectedTeam] = useState<TeamWithMembers | null>(null)
  const [isPending, startTransition] = useTransition()

  const closeDetailModal = () => setSelectedTeam(null)

  useEffect(() => {
    if (!selectedTeam) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDetailModal()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedTeam])

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchesFilter = filter === 'all' || team.status === filter
      const matchesSearch =
        team.teamName.toLowerCase().includes(search.toLowerCase()) ||
        team.captainName.toLowerCase().includes(search.toLowerCase()) ||
        team.email.toLowerCase().includes(search.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [teams, filter, search])

  const handleUpdateStatus = async (teamId: string, status: TeamStatus) => {
    startTransition(async () => {
      try {
        await updateTeamStatus(teamId, status)
        setTeams(teams.map((t) => (t.id === teamId ? { ...t, status } : t)))
        toast.success(`Status tim berhasil diubah menjadi ${status}`)
      } catch (error) {
        toast.error('Terjadi kesalahan. Silakan coba lagi.')
      }
    })
  }

  const handleDelete = async (teamId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus tim ini?')) return

    startTransition(async () => {
      try {
        await deleteTeam(teamId)
        setTeams(teams.filter((t) => t.id !== teamId))
        toast.success('Tim berhasil dihapus!')
      } catch (error) {
        toast.error('Terjadi kesalahan. Silakan coba lagi.')
      }
    })
  }

  const handleExportCSV = () => {
    const headers = ['No', 'Nama Tim', 'Kapten', 'Email', 'WhatsApp', 'Status', 'Turnamen']
    const csvData = filteredTeams.map((team, index) => [
      index + 1,
      team.teamName,
      team.captainName,
      team.email,
      team.phone,
      team.status,
      team.tournament.name,
    ])

    const csvContent = [
      headers.join(','),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `pendaftar-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Data berhasil diekspor!')
  }

  const getStatusBadge = (status: TeamStatus) => {
    const badges = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      ACCEPTED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status]}`}>
        {status}
      </span>
    )
  }

  const stats = {
    all: teams.length,
    PENDING: teams.filter((t) => t.status === 'PENDING').length,
    ACCEPTED: teams.filter((t) => t.status === 'ACCEPTED').length,
    REJECTED: teams.filter((t) => t.status === 'REJECTED').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Pendaftar</h1>
          <p className="text-gray-600 mt-1">Kelola pendaftaran tim turnamen</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="btn-secondary inline-flex items-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama tim, kapten, atau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'PENDING', 'ACCEPTED', 'REJECTED'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-btn font-medium transition-colors duration-200 ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'Semua' : status}
                <span className="ml-2 text-sm opacity-75">({stats[status]})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:hidden">
        {filteredTeams.length === 0 ? (
          <div className="card text-center py-10">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">Tidak ada data pendaftar</p>
          </div>
        ) : (
          filteredTeams.map((team) => (
            <div key={team.id} className="card space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">{team.teamName}</p>
                  <p className="text-sm text-gray-600">{team.captainName}</p>
                  <p className="text-xs text-gray-500 mt-1">{team.tournament.name}</p>
                </div>
                {getStatusBadge(team.status)}
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{team.email}</p>
                <p>{team.phone}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTeam(team)}
                  className="btn-secondary inline-flex items-center gap-2 !px-3 !py-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>Detail</span>
                </button>
                {team.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(team.id, 'ACCEPTED')}
                      className="inline-flex items-center gap-2 rounded-btn bg-green-600 px-3 py-2 text-sm font-medium text-white"
                    >
                      <Check className="h-4 w-4" />
                      <span>Terima</span>
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(team.id, 'REJECTED')}
                      className="inline-flex items-center gap-2 rounded-btn bg-red-600 px-3 py-2 text-sm font-medium text-white"
                    >
                      <X className="h-4 w-4" />
                      <span>Tolak</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(team.id)}
                  className="inline-flex items-center gap-2 rounded-btn bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="card overflow-hidden hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tim / Kapten
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Turnamen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Tidak ada data pendaftar</p>
                  </td>
                </tr>
              ) : (
                filteredTeams.map((team) => (
                  <tr key={team.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{team.teamName}</p>
                        <p className="text-sm text-gray-600">{team.captainName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{team.email}</p>
                        <p className="text-gray-600">{team.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{team.tournament.name}</span>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(team.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedTeam(team)}
                          className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-btn transition-colors duration-200"
                          title="Detail"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {team.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(team.id, 'ACCEPTED')}
                              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-btn transition-colors duration-200"
                              title="Terima"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(team.id, 'REJECTED')}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-btn transition-colors duration-200"
                              title="Tolak"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(team.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-btn transition-colors duration-200"
                          title="Hapus"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTeam && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Detail tim">
          <button
            type="button"
            aria-label="Tutup modal"
            onClick={closeDetailModal}
            className="modal-backdrop"
          />

          <div className="modal-panel max-w-3xl max-h-[92vh] flex flex-col">
            <div className="modal-header">
              <h2 className="text-xl font-bold">Detail Tim</h2>
              <button
                type="button"
                onClick={closeDetailModal}
                className="rounded-lg border border-slate-200 p-1.5 text-gray-400 transition-colors hover:text-gray-600"
                aria-label="Tutup"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="modal-body space-y-6">
              {/* Team Info */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-bold">{selectedTeam.teamName}</h3>
                  {getStatusBadge(selectedTeam.status)}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Kapten</p>
                    <p className="font-medium">{selectedTeam.captainName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedTeam.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">WhatsApp</p>
                    <p className="font-medium">{selectedTeam.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Turnamen</p>
                    <p className="font-medium">{selectedTeam.tournament.name}</p>
                  </div>
                </div>
              </div>

              {/* Members */}
              <div>
                <h4 className="font-bold mb-3 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Anggota Tim</span>
                </h4>
                <div className="space-y-3">
                  {selectedTeam.members.map((member, index) => (
                    <div key={member.id} className="p-3 bg-gray-50 rounded-btn">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.inGameName}</p>
                        </div>
                        {member.role && (
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {member.role}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {selectedTeam.status === 'PENDING' && (
                <div className="modal-footer -mx-5 -mb-5">
                  <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedTeam.id, 'REJECTED')
                      closeDetailModal()
                    }}
                    className="btn-secondary inline-flex items-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Tolak</span>
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedTeam.id, 'ACCEPTED')
                      closeDetailModal()
                    }}
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>Terima</span>
                  </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
