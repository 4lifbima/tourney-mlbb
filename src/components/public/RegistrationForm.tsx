'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import type { FieldErrors } from 'react-hook-form'
import { registrationSchema, RegistrationFormData } from '@/lib/validations'
import { registerTeam } from '@/lib/register'

interface RegistrationFormProps {
  tournamentId: string
}

export default function RegistrationForm({ tournamentId }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      teamName: '',
      captainName: '',
      email: '',
      phone: '',
      rankScreenshot: '',
      members: [{ name: '', inGameName: '', role: '' }],
      agreeToTerms: false,
      tournamentId: tournamentId,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  })

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    try {
      const result = await registerTeam({
        teamName: data.teamName,
        captainName: data.captainName,
        email: data.email,
        phone: data.phone,
        rankScreenshot: data.rankScreenshot,
        tournamentId: data.tournamentId,
        members: data.members,
      })
      
      if (result.success) {
        toast.success('Pendaftaran berhasil dikirim!')
        reset()
      } else {
        toast.error(result.error || 'Terjadi kesalahan. Silakan coba lagi.')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const onInvalid = (formErrors: FieldErrors<RegistrationFormData>) => {
    const firstError =
      formErrors.teamName?.message ||
      formErrors.captainName?.message ||
      formErrors.email?.message ||
      formErrors.phone?.message ||
      formErrors.rankScreenshot?.message ||
      formErrors.agreeToTerms?.message ||
      formErrors.tournamentId?.message ||
      formErrors.members?.[0]?.name?.message ||
      formErrors.members?.[0]?.inGameName?.message ||
      'Mohon lengkapi form terlebih dahulu.'

    toast.error(String(firstError))
  }

  const addMember = () => {
    append({ name: '', inGameName: '', role: '' })
  }

  const removeMember = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  return (
    <section id="daftar" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Icon icon="carbon:user-plus" className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm">Formulir</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Daftar Tim Sekarang
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lengkapi formulir di bawah ini untuk mendaftarkan tim Anda
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="card space-y-6">
            <input type="hidden" {...register('tournamentId')} />
            {/* Team Information */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <Icon icon="carbon:team" className="w-5 h-5 text-primary" />
                <span>Informasi Tim</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="teamName" className="block text-sm font-medium mb-2">
                    Nama Tim <span className="text-primary">*</span>
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    {...register('teamName')}
                    className="input-field"
                    placeholder="Masukkan nama tim"
                  />
                  {errors.teamName && (
                    <p className="text-red-600 text-sm mt-1">{errors.teamName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="captainName" className="block text-sm font-medium mb-2">
                    Nama Kapten <span className="text-primary">*</span>
                  </label>
                  <input
                    id="captainName"
                    type="text"
                    {...register('captainName')}
                    className="input-field"
                    placeholder="Masukkan nama kapten"
                  />
                  {errors.captainName && (
                    <p className="text-red-600 text-sm mt-1">{errors.captainName.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <Icon icon="carbon:contact-information" className="w-5 h-5 text-primary" />
                <span>Informasi Kontak</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="input-field"
                    placeholder="contoh@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Nomor WhatsApp <span className="text-primary">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className="input-field"
                    placeholder="08123456789"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Rank Screenshot */}
            <div>
              <label htmlFor="rankScreenshot" className="block text-sm font-medium mb-2">
                URL Screenshot Rank
              </label>
              <input
                id="rankScreenshot"
                type="url"
                {...register('rankScreenshot')}
                className="input-field"
                placeholder="https://..."
              />
              {errors.rankScreenshot && (
                <p className="text-red-600 text-sm mt-1">{errors.rankScreenshot.message}</p>
              )}
              <p className="text-gray-500 text-sm mt-2">
                Upload screenshot rank ke imgur.com atau layanan hosting gambar lainnya
              </p>
            </div>

            {/* Team Members */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <Icon icon="carbon:users" className="w-5 h-5 text-primary" />
                <span>Anggota Tim</span>
              </h3>
              
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 bg-gray-50 rounded-card space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Pemain {index + 1}</span>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMember(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Icon icon="carbon:close" className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          {...register(`members.${index}.name`)}
                          className="input-field"
                          placeholder="Nama lengkap"
                        />
                        {errors.members?.[index]?.name && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.members[index]?.name?.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          In-Game Name
                        </label>
                        <input
                          type="text"
                          {...register(`members.${index}.inGameName`)}
                          className="input-field"
                          placeholder="IGN"
                        />
                        {errors.members?.[index]?.inGameName && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.members[index]?.inGameName?.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Role (Opsional)
                        </label>
                        <select
                          {...register(`members.${index}.role`)}
                          className="input-field"
                        >
                          <option value="">Pilih Role</option>
                          <option value="Gold Laner">Gold Laner</option>
                          <option value="Mid Laner">Mid Laner</option>
                          <option value="Exp Laner">Exp Laner</option>
                          <option value="Jungler">Jungler</option>
                          <option value="Roamer">Roamer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addMember}
                className="mt-4 btn-secondary inline-flex items-center space-x-2"
              >
                <Icon icon="carbon:add" className="w-5 h-5" />
                <span>Tambah Anggota</span>
              </button>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-3">
              <input
                id="agreeToTerms"
                type="checkbox"
                {...register('agreeToTerms')}
                className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                Saya menyetujui semua{' '}
                <a href="#syarat" className="text-primary hover:underline">
                  syarat & ketentuan
                </a>{' '}
                yang berlaku <span className="text-primary">*</span>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-600 text-sm">{errors.agreeToTerms.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Icon icon="carbon:loading" className="w-5 h-5 animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <Icon icon="carbon:send" className="w-5 h-5" />
                  <span>Kirim Pendaftaran</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
