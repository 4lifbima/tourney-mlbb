import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary/5" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
              <Icon icon="carbon:trophy" className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm">
                Turnamen Mobile Legends Terbesar
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Battle for Glory di{' '}
              <span className="text-primary">Turnamen MLBB</span> Terbesar
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              Buktikan kamu yang terbaik! Raih hadiah jutaan rupiah dan gelar juara
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/daftar" className="btn-primary inline-flex items-center justify-center space-x-2">
                <Icon icon="carbon:user-plus" className="w-5 h-5" />
                <span>Daftar Tim Sekarang</span>
              </Link>
              <Link href="#turnamen" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <span>Lihat Turnamen</span>
                <Icon icon="carbon:arrow-right" className="w-5 h-5" />
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">128+</div>
                <div className="text-sm text-gray-600">Tim Terdaftar</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">Rp 10 Juta</div>
                <div className="text-sm text-gray-600">Prize Pool</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">8</div>
                <div className="text-sm text-gray-600">Slot Tersisa</div>
              </div>
            </div>
          </div>
          
          {/* Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              <Icon
                icon="game-icons:mobile-phone"
                className="w-full h-auto text-primary/20"
                style={{ fontSize: '400px' }}
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Icon
                icon="game-icons:trophy"
                className="w-48 h-48 text-primary"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute top-10 right-10 animate-bounce">
              <Icon icon="game-icons:medal" className="w-16 h-16 text-gold" />
            </div>
            <div className="absolute bottom-10 left-10 animate-bounce" style={{ animationDelay: '0.5s' }}>
              <Icon icon="game-icons:shield" className="w-16 h-16 text-silver" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
