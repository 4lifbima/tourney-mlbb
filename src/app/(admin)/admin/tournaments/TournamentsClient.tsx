'use client'

import { useEffect, useState, useTransition } from 'react'
import {
  Plus,
  Trophy,
  CalendarDays,
  Users,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Tournament, TournamentStatus } from '@prisma/client'
import { createTournament, updateTournament, deleteTournament } from '@/lib/actions'

interface TournamentWithTeams extends Tournament {
  teams: {
    id: string
    status: string
  }[]
}

interface TournamentsClientProps {
  tournaments: TournamentWithTeams[]
}

export default function TournamentsClient({ tournaments: initialTournaments }: TournamentsClientProps) {
  const [tournaments, setTournaments] = useState(initialTournaments)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTournament, setEditingTournament] = useState<TournamentWithTeams | null>(null)
  const [isPending, startTransition] = useTransition()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    slot: '',
    prizePool: '',
    status: 'DRAFT' as TournamentStatus,
  })

  const openModal = (tournament?: TournamentWithTeams) => {
    if (tournament) {
      setEditingTournament(tournament)
      setFormData({
        name: tournament.name,
        description: tournament.description || '',
        startDate: tournament.startDate.toISOString().split('T')[0],
        endDate: tournament.endDate.toISOString().split('T')[0],
        slot: tournament.slot.toString(),
        prizePool: tournament.prizePool || '',
        status: tournament.status,
      })
    } else {
      setEditingTournament(null)
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        slot: '',
        prizePool: '',
        status: 'DRAFT',
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTournament(null)
  }

  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    startTransition(async () => {
      try {
        if (editingTournament) {
          await updateTournament(editingTournament.id, {
            ...formData,
            slot: parseInt(formData.slot, 10),
            startDate: new Date(formData.startDate),
            endDate: new Date(formData.endDate),
          })
          setTournaments(tournaments.map((t) => 
            t.id === editingTournament.id 
              ? { ...t, ...formData, slot: parseInt(formData.slot, 10), startDate: new Date(formData.startDate), endDate: new Date(formData.endDate) }
              : t
          ))
          toast.success('Turnamen berhasil diupdate!')
        } else {
          const newTournament = await createTournament({
            ...formData,
            slot: parseInt(formData.slot, 10),
            startDate: new Date(formData.startDate),
            endDate: new Date(formData.endDate),
          })
          setTournaments([newTournament as unknown as TournamentWithTeams, ...tournaments])
          toast.success('Turnamen berhasil dibuat!')
        }
        closeModal()
      } catch (error) {
        toast.error('Terjadi kesalahan. Silakan coba lagi.')
      }
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus turnamen ini?')) return

    startTransition(async () => {
      try {
        await deleteTournament(id)
        setTournaments(tournaments.filter((t) => t.id !== id))
        toast.success('Turnamen berhasil dihapus!')
      } catch (error) {
        toast.error('Terjadi kesalahan. Silakan coba lagi.')
      }
    })
  }

  const getStatusBadge = (status: TournamentStatus) => {
    const badges = {
      DRAFT: 'bg-gray-100 text-gray-800',
      OPEN: 'bg-green-100 text-green-800',
      CLOSED: 'bg-red-100 text-red-800',
      ONGOING: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-purple-100 text-purple-800',
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status]}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Turnamen</h1>
          <p className="text-gray-600 mt-1">Kelola turnamen yang tersedia</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary inline-flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Tambah Turnamen</span>
        </button>
      </div>

      <div className="grid gap-6">
        {tournaments.length === 0 ? (
          <div className="card text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Belum ada turnamen</p>
          </div>
        ) : (
          tournaments.map((tournament) => (
            <div key={tournament.id} className="card">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold">{tournament.name}</h3>
                    {getStatusBadge(tournament.status)}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{tournament.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <CalendarDays className="w-4 h-4" />
                      <span>
                        {new Date(tournament.startDate).toLocaleDateString('id-ID')} -{' '}
                        {new Date(tournament.endDate).toLocaleDateString('id-ID')}
                      </span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{tournament.teams.length} / {tournament.slot} Tim</span>
                    </span>
                    {tournament.prizePool && (
                      <span className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4 text-gold" />
                        <span>{tournament.prizePool}</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openModal(tournament)}
                    className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-btn transition-colors duration-200"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(tournament.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-btn transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Form turnamen">
          <button
            type="button"
            aria-label="Tutup modal"
            onClick={closeModal}
            className="modal-backdrop"
          />

          <div className="modal-panel max-w-3xl max-h-[92vh] flex flex-col">
            <div className="modal-header">
              <h2 className="text-xl font-bold">
                {editingTournament ? 'Edit Turnamen' : 'Tambah Turnamen Baru'}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-slate-200 p-1.5 text-gray-400 transition-colors hover:text-gray-600"
                aria-label="Tutup"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
              <div className="modal-body space-y-4">
                <div>
                <label className="block text-sm font-medium mb-2">Nama Turnamen</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows={3}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tanggal Selesai</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Jumlah Slot Tim</label>
                  <input
                    type="number"
                    value={formData.slot}
                    onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                    className="input-field"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Prize Pool</label>
                  <input
                    type="text"
                    value={formData.prizePool}
                    onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                    className="input-field"
                    placeholder="Rp 10.000.000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as TournamentStatus })}
                  className="input-field"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="OPEN">Open</option>
                  <option value="CLOSED">Closed</option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              </div>

              <div className="modal-footer">
                <div className="flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="btn-secondary">
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary disabled:opacity-50"
                >
                  {isPending ? 'Menyimpan...' : editingTournament ? 'Update' : 'Simpan'}
                </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
