import { z } from 'zod'

export const registrationSchema = z.object({
  teamName: z.string().min(3, 'Nama tim minimal 3 karakter'),
  captainName: z.string().min(3, 'Nama kapten minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor WhatsApp minimal 10 digit'),
  rankScreenshot: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === '' ? undefined : value))
    .refine(
      (value) => value === undefined || /^https?:\/\//i.test(value),
      'Screenshot rank harus berupa URL valid'
    ),
  members: z.array(
    z.object({
      name: z.string().min(3, 'Nama minimal 3 karakter'),
      inGameName: z.string().min(3, 'In-game name minimal 3 karakter'),
      role: z.string().optional(),
    })
  ).min(1, 'Minimal 1 anggota tim'),
  agreeToTerms: z.boolean().refine(val => val === true, 'Anda harus menyetujui syarat & ketentuan'),
  tournamentId: z.string().min(1, 'Tournament ID tidak valid'),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>

export const tournamentSchema = z.object({
  name: z.string().min(3, 'Nama turnamen minimal 3 karakter'),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  slot: z.string().transform((val) => parseInt(val, 10)),
  prizePool: z.string().optional(),
  status: z.enum(['DRAFT', 'OPEN', 'CLOSED', 'ONGOING', 'COMPLETED']),
})

export type TournamentFormData = z.infer<typeof tournamentSchema>

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export type LoginFormData = z.infer<typeof loginSchema>
