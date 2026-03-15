import { Icon } from '@iconify/react'

export default function HowToRegister() {
  const steps = [
    {
      number: '01',
      icon: 'gala:file-document',
      title: 'Isi Formulir',
      description: 'Lengkapi formulir pendaftaran dengan data tim yang valid',
    },
    {
      number: '02',
      icon: 'icon-park-outline:upload-one',
      title: 'Upload Bukti',
      description: 'Unggah screenshot rank minimal Epic II untuk semua anggota',
    },
    {
      number: '03',
      icon: 'carbon:checkmark',
      title: 'Verifikasi',
      description: 'Tim panitia akan memverifikasi pendaftaran Anda',
    },
    {
      number: '04',
      icon: 'carbon:checkmark-filled',
      title: 'Konfirmasi',
      description: 'Anda akan menerima email konfirmasi jika diterima',
    },
  ]

  return (
    <section id="cara-daftar" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Icon icon="carbon:list-numbered" className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm">Panduan</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cara Daftar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ikuti langkah-langkah berikut untuk mendaftar turnamen
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-primary/20 -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="card text-center hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-soft">
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="pt-8">
                    <div className="bg-primary/10 w-16 h-16 rounded-btn flex items-center justify-center mx-auto mb-4">
                      <Icon icon={step.icon} className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
