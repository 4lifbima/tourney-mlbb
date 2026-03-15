import Link from 'next/link'
import { Icon } from '@iconify/react'
import HeroSection from '@/components/public/HeroSection'
import AboutTournament from '@/components/public/AboutTournament'
import PrizePool from '@/components/public/PrizePool'
import TermsConditions from '@/components/public/TermsConditions'
import HowToRegister from '@/components/public/HowToRegister'
import FAQSection from '@/components/public/FAQSection'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutTournament />
      <TermsConditions />
      <HowToRegister />
      <FAQSection />
    </>
  )
}
