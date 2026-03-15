'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Berapa biaya pendaftaran turnamen ini?',
      answer: 'Pendaftaran turnamen ini GRATIS! Tidak ada biaya apapun yang dikenakan kepada peserta.',
    },
    {
      question: 'Apakah ada batasan rank untuk berpartisipasi?',
      answer: 'Ya, minimal rank yang diperlukan adalah Epic II. Semua anggota tim harus memenuhi persyaratan ini.',
    },
    {
      question: 'Berapa jumlah anggota dalam satu tim?',
      answer: 'Satu tim terdiri dari minimal 5 pemain utama dan maksimal 1 pemain cadangan.',
    },
    {
      question: 'Kapan jadwal pertandingan akan diumumkan?',
      answer: 'Jadwal pertandingan akan diumumkan 3 hari sebelum tanggal pelaksanaan melalui email dan WhatsApp yang terdaftar.',
    },
    {
      question: 'Apa yang harus dilakukan jika ada anggota tim yang berhalangan hadir?',
      answer: 'Anda dapat mengganti dengan pemain cadangan. Jika tidak ada cadangan, pastikan semua pemain utama hadir tepat waktu.',
    },
    {
      question: 'Bagaimana sistem pertandingan?',
      answer: 'Sistem pertandingan menggunakan Single Elimination untuk babak awal dan Round Robin untuk semifinal dan final.',
    },
    {
      question: 'Apakah boleh menggunakan hero yang sama dalam satu tim?',
      answer: 'Tidak, turnamen menggunakan mode Draft Pick Tournament sehingga hero tidak bisa duplikat dalam satu tim.',
    },
    {
      question: 'Bagaimana cara menghubungi panitia?',
      answer: 'Anda dapat menghubungi panitia melalui WhatsApp atau email yang tertera di halaman kontak.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Icon icon="carbon:help" className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pertanyaan Umum
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering diajukan
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card overflow-hidden p-0 hover:shadow-soft-lg transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <Icon
                  icon={openIndex === index ? 'carbon:chevron-up' : 'carbon:chevron-down'}
                  className="w-6 h-6 text-primary flex-shrink-0"
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
