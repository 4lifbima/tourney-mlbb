import { Icon } from '@iconify/react'

export default function TermsConditions() {
  const terms = [
    {
      icon: 'carbon:user',
      text: 'Setiap tim minimal terdiri dari 5 pemain utama dan 1 pemain cadangan',
    },
    {
      icon: 'carbon:trophy',
      text: 'Minimal rank Epic II untuk berpartisipasi',
    },
    {
      icon: 'carbon:id-management',
      text: 'Setiap pemain wajib memiliki akun Mobile Legends aktif',
    },
    {
      icon: 'carbon:calendar',
      text: 'Peserta wajib hadir 30 menit sebelum jadwal pertandingan',
    },
    {
      icon: 'hugeicons:versus',
      text: 'Pertandingan menggunakan mode Draft Pick Tournament 5v5',
    },
    {
      icon: 'carbon:warning',
      text: 'Dilarang menggunakan cheat, bug, atau cara curang lainnya',
    },
    {
      icon: 'carbon:renew',
      text: 'Keputusan panitia bersifat mutlak dan tidak dapat diganggu gugat',
    },
    {
      icon: 'carbon:checkmark',
      text: 'Dengan mendaftar, Anda menyetujui semua peraturan turnamen',
    },
  ]

  return (
    <section id="syarat-ketentuan" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Icon icon="carbon:document" className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm">Peraturan</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Syarat & Ketentuan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pastikan Anda memenuhi semua persyaratan sebelum mendaftar
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {terms.map((term, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 card hover:shadow-soft-lg transition-shadow duration-300"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-btn flex items-center justify-center flex-shrink-0">
                <Icon icon={term.icon} className="w-6 h-6 text-primary" />
              </div>
              <p className="text-gray-700 pt-2">{term.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
