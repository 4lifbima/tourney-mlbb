import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MLBB Tournament - Battle for Glory',
  description: 'Turnamen Mobile Legends terbesar. Buktikan kamu yang terbaik dan raih hadiah jutaan rupiah!',
  keywords: ['Mobile Legends', 'MLBB', 'Tournament', 'Esports', 'Gaming'],
  authors: [{ name: 'MLBB Tournament' }],
  openGraph: {
    title: 'MLBB Tournament - Battle for Glory',
    description: 'Turnamen Mobile Legends terbesar. Buktikan kamu yang terbaik!',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '8px',
              background: '#fff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#b30e05',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
