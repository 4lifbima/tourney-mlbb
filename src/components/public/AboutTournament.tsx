import { Icon } from '@iconify/react'

export default function AboutTournament() {
  const tournamentInfo = [
    {
      icon: 'carbon:calendar',
      title: 'Tanggal Pelaksanaan',
      description: '20 - 30 Maret 2026',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: 'carbon:trophy',
      title: 'Sistem Kompetisi',
      description: 'Single Elimination & Round Robin',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: 'carbon:user',
      title: 'Peserta',
      description: 'Terbuka untuk semua rank',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: 'carbon:video',
      title: 'Mode Pertandingan',
      description: 'Draft Pick Tournament 5v5',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Icon icon="carbon:information" className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm">Info Turnamen</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tentang Turnamen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Turnamen Mobile Legends terbesar dengan hadiah jutaan rupiah menanti para juara
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tournamentInfo.map((info, index) => (
            <div
              key={index}
              className="card hover:shadow-soft-lg transition-shadow duration-300"
            >
              <div className={`${info.bgColor} w-14 h-14 rounded-btn flex items-center justify-center mb-4`}>
                <Icon icon={info.icon} className={`w-7 h-7 ${info.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
              <p className="text-gray-600">{info.description}</p>
            </div>
          ))}
        </div>

        {/* Prize Pool Breakdown */}
        <div className="mt-16 card bg-gradient-to-br from-primary to-primary-hover text-white">
          <div className="text-center mb-8">
            <Icon icon="carbon:trophy" className="w-16 h-16 mx-auto mb-4 text-gold" />
            <h3 className="text-2xl font-bold mb-2">Total Prize Pool</h3>
            <p className="text-4xl font-bold text-gold">Rp 10.000.000</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/10 rounded-card">
              <Icon icon="emojione-monotone:1st-place-medal" className="w-10 h-10 mx-auto mb-2 text-gold" />
              <p className="font-semibold mb-1">Juara 1</p>
              <p className="text-2xl font-bold text-gold">Rp 5.000.000</p>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-card">
              <Icon icon="emojione-monotone:2nd-place-medal" className="w-10 h-10 mx-auto mb-2 text-silver" />
              <p className="font-semibold mb-1">Juara 2</p>
              <p className="text-2xl font-bold text-silver-light">Rp 3.000.000</p>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-card">
              <Icon icon="emojione-monotone:3rd-place-medal" className="w-10 h-10 mx-auto mb-2 text-bronze" />
              <p className="font-semibold mb-1">Juara 3</p>
              <p className="text-2xl font-bold text-bronze-light">Rp 2.000.000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
