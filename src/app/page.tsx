import Navbar from '@/components/sparkle/Navbar'
import HeroSection from '@/components/sparkle/HeroSection'
import PremiumIncludes from '@/components/sparkle/PremiumIncludes'
import ServicesSection from '@/components/sparkle/ServicesSection'
import ServiceCustomizer from '@/components/sparkle/ServiceCustomizer'
import ServiceFollowUp from '@/components/sparkle/ServiceFollowUp'
import TestimonialsSection from '@/components/sparkle/TestimonialsSection'
import CoverageMap from '@/components/sparkle/CoverageMap'
import BookingSection from '@/components/sparkle/BookingSection'
import FAQSection from '@/components/sparkle/FAQSection'
import Footer from '@/components/sparkle/Footer'
import WhatsAppFAB from '@/components/sparkle/WhatsAppFAB'
import ChatWidget from '@/components/sparkle/ChatWidget'
import { LocationProvider } from '@/components/sparkle/LocationContext'
import { CustomizerProvider } from '@/components/sparkle/CustomizerContext'

export default function Home() {
  return (
    <CustomizerProvider>
      <LocationProvider>
        <div className="min-h-screen flex flex-col bg-[#0A0F2E]">
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <PremiumIncludes />
            <ServicesSection />
            <ServiceCustomizer />
            <ServiceFollowUp />
            <TestimonialsSection />
            <CoverageMap />
            <BookingSection />
            <FAQSection />
          </main>
          <Footer />
          <WhatsAppFAB />
          <ChatWidget />
        </div>
      </LocationProvider>
    </CustomizerProvider>
  )
}
