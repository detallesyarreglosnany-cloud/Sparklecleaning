'use client'

import { Phone, Mail, MessageCircle, MapPin, Star, Shield, Award } from 'lucide-react'
import { ScrollReveal } from './SparkleEffects'

const services = [
  'Habitación',
  'Studio',
  'Apartamento',
  'Casa',
  'Airbnb',
  'Evento',
  'Oficina',
  'Casa Grande',
  'Airbnb Express',
]

const areas = [
  'Washington, DC',
  'Arlington, VA',
  'Alexandria, VA',
  'Fairfax, VA',
  'Bethesda, MD',
  'Silver Spring, MD',
  'Rockville, MD',
  'Georgetown, DC',
]

const certifications = [
  { icon: Star, label: 'Google 4.9★' },
  { icon: Shield, label: 'BBB A+' },
  { icon: Award, label: 'Best DC 2024' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0A0F2E] to-[#060920] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg viewBox="0 0 40 40" className="w-8 h-8">
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFE680" />
                      <stop offset="100%" stopColor="#FFB300" />
                    </linearGradient>
                  </defs>
                  <path d="M20 2 L38 20 L20 38 L2 20 Z" fill="none" stroke="url(#footerLogoGrad)" strokeWidth="2" />
                  <circle cx="20" cy="20" r="4" fill="url(#footerLogoGrad)" />
                </svg>
                <div>
                  <span className="font-[family-name:var(--font-playfair)] text-base font-bold text-gold-gradient block leading-tight">
                    SPARKLE ELITE
                  </span>
                  <span className="text-[9px] tracking-[0.2em] text-[rgba(232,240,255,0.5)] uppercase">
                    Cleaning
                  </span>
                </div>
              </div>
              <p className="text-sm text-[rgba(232,240,255,0.6)] mb-4 max-w-xs">
                Servicio de limpieza premium en DC, Virginia y Maryland. Transformamos espacios con cuidado profesional.
              </p>
              <div className="flex gap-3">
                <a
                  href="tel:+12025550199"
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-[#E8F0FF] hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label="Phone"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/12025550199"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-[#E8F0FF] hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="mailto:hello@sparkleelite.com"
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-[#E8F0FF] hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold text-white mb-4">
                Servicios
              </h4>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s}>
                    <a href="#servicios" className="text-sm text-[rgba(232,240,255,0.6)] hover:text-gold transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas */}
            <div>
              <h4 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold text-white mb-4">
                Áreas de servicio
              </h4>
              <ul className="space-y-2">
                {areas.map((a) => (
                  <li key={a}>
                    <a href="#cobertura" className="text-sm text-[rgba(232,240,255,0.6)] hover:text-gold transition-colors flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {a}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Certifications */}
            <div>
              <h4 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold text-white mb-4">
                Contacto
              </h4>
              <div className="space-y-3 mb-6">
                <a href="tel:+12025550199" className="flex items-center gap-2 text-sm text-[rgba(232,240,255,0.6)] hover:text-gold transition-colors">
                  <Phone className="w-4 h-4 text-gold" />
                  (202) 555-0199
                </a>
                <a href="mailto:hello@sparkleelite.com" className="flex items-center gap-2 text-sm text-[rgba(232,240,255,0.6)] hover:text-gold transition-colors">
                  <Mail className="w-4 h-4 text-gold" />
                  hello@sparkleelite.com
                </a>
              </div>

              <h4 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold text-white mb-3">
                Certificaciones
              </h4>
              <div className="flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <div key={c.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-xs text-[rgba(232,240,255,0.7)]">
                    <c.icon className="w-3 h-3 text-gold" />
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[rgba(232,240,255,0.4)]">
          <p>© 2025 Sparkle Elite Cleaning. Todos los derechos reservados.</p>
          <p>DC · Virginia · Maryland</p>
        </div>
      </div>
    </footer>
  )
}
