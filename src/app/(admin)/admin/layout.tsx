import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuth = await isAdmin()
  
  if (!isAuth) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-transparent lg:flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-72 min-h-screen">
        <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-10 lg:py-10">
          <div className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-soft backdrop-blur-sm sm:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
