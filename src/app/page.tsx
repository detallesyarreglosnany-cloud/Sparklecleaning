import Navbar from '@/components/sparkle/Navbar'
import HeroSection from '@/components/sparkle/HeroSection'
import PremiumIncludes from '@/components/sparkle/PremiumIncludes'
import ServicesSection from '@/components/sparkle/ServicesSection'
import ServiceCustomizer from '@/components/sparkle/ServiceCustomizer'
import CalculatorSection from '@/components/sparkle/CalculatorSection'
import PricingSection from '@/components/sparkle/PricingSection'
import TestimonialsSection from '@/components/sparkle/TestimonialsSection'
import CoverageMap from '@/components/sparkle/CoverageMap'
import BookingSection from '@/components/sparkle/BookingSection'
import Footer from '@/components/sparkle/Footer'
import WhatsAppFAB from '@/components/sparkle/WhatsAppFAB'
import ChatWidget from '@/components/sparkle/ChatWidget'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0F2E]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PremiumIncludes />
        <ServicesSection />
        <ServiceCustomizer />
        <CalculatorSection />
        <PricingSection />
        <TestimonialsSection />
        <CoverageMap />
        <BookingSection />
      </main>
      <Footer />
      <WhatsAppFAB />
      <ChatWidget />
    </div>
  )
}
