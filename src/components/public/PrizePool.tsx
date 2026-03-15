import { Icon } from '@iconify/react'

export default function PrizePool() {
  const prizes = [
    {
      rank: 'Juara 1',
      amount: 'Rp 5.000.000',
      icon: 'carbon:trophy-filled',
      color: 'text-gold',
      bgColor: 'bg-gold/10',
      borderColor: 'border-gold',
    },
    {
      rank: 'Juara 2',
      amount: 'Rp 3.000.000',
      icon: 'carbon:medal',
      color: 'text-silver',
      bgColor: 'bg-silver/10',
      borderColor: 'border-silver',
    },
    {
      rank: 'Juara 3',
      amount: 'Rp 2.000.000',
      icon: 'carbon:medal',
      color: 'text-bronze',
      bgColor: 'bg-bronze/10',
      borderColor: 'border-bronze',
    },
  ]

  const additionalPrizes = [
    {
      title: 'Best MVP',
      amount: 'Rp 500.000',
      icon: 'carbon:star',
    },
    {
      title: 'Best Gold Laner',
      amount: 'Rp 500.000',
      icon: 'carbon:shield',
    },
    {
      title: 'Best Roamer',
      amount: 'Rp 500.000',
      icon: 'carbon:favorite',
    },
  ]

  return (
    <section id="hadiah" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Icon icon="carbon:trophy" className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm">Hadiah Menarik</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prize Pool
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Total hadiah puluhan juta rupiah menanti para juara
          </p>
        </div>

        {/* Main Prizes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className={`relative card border-2 ${prize.borderColor} hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Rank Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className={`${prize.bgColor} ${prize.color} w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-soft`}>
                  <Icon icon={prize.icon} className="w-8 h-8" />
                </div>
              </div>
              
              <div className="pt-8 text-center">
                <h3 className="text-xl font-bold mb-4">{prize.rank}</h3>
                <p className={`text-3xl font-bold ${prize.color}`}>{prize.amount}</p>
                
                {/* Decorative */}
                <div className="mt-6 flex justify-center space-x-2">
                  <Icon icon="carbon:star" className={`w-5 h-5 ${prize.color}`} />
                  <Icon icon="carbon:star" className={`w-5 h-5 ${prize.color}`} />
                  <Icon icon="carbon:star" className={`w-5 h-5 ${prize.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Prizes */}
        <div className="card bg-gray-50">
          <h3 className="text-xl font-bold text-center mb-8">
            Penghargaan Individual
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalPrizes.map((prize, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-white rounded-card shadow-soft"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-btn flex items-center justify-center">
                  <Icon icon={prize.icon} className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{prize.title}</p>
                  <p className="text-primary font-bold">{prize.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
