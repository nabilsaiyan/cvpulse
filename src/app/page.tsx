import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { TrustBar } from '@/components/landing/TrustBar'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { BentoFeatures } from '@/components/landing/BentoFeatures'
import { Testimonials } from '@/components/landing/Testimonials'
import { FAQ } from '@/components/landing/FAQ'
import { CTA } from '@/components/landing/CTA'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-deep">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <BentoFeatures />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
