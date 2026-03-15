'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Trophy,
  LayoutDashboard,
  Users,
  CalendarRange,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { signOut } from 'next-auth/react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Turnamen',
    href: '/admin/tournaments',
    icon: CalendarRange,
  },
  {
    name: 'Pendaftar',
    href: '/admin/registrants',
    icon: Users,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <Trophy className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold text-slate-900">MLBB Admin</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg border border-slate-200 p-2 text-slate-700"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-950/45 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-800/70 bg-slate-950 text-slate-100 transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-800 px-6 py-6">
            <Link
              href="/admin/dashboard"
              className="group flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="rounded-2xl bg-primary/20 p-2 text-primary transition-colors group-hover:bg-primary/30">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Control Center</p>
                <p className="text-lg font-semibold tracking-wide">MLBB Admin</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const ItemIcon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ItemIcon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-slate-800 p-4">
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
