import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user ?? null
}

export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN'
}
