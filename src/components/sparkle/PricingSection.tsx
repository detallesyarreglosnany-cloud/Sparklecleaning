'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from './SparkleEffects'
import { Sparkles, Star, Clock } from 'lucide-react'

const tiers = [
  {
    name: 'Room / Habitación',
    price: 75,
    desc: '1 espacio + baño',
    time: '1-2 horas',
    popular: false,
    features: ['Limpieza completa del espacio', 'Baño desinfectado', 'Cambio de toallas', 'Aspirar y trapear'],
  },
  {
    name: 'Apartment / Departamento',
    price: 130,
    desc: 'Hasta 5 espacios + 2 baños',
    time: '2-3 horas',
    popular: true,
    features: ['Hasta 5 espacios', '2 baños completos', 'Cocina incluida', 'Áreas comunes', 'Organización básica'],
  },
  {
    name: 'House / Casa',
    price: 180,
    desc: '5+ espacios + áreas externas',
    time: '3-4 horas',
    popular: false,
    features: ['5+ espacios', 'Áreas externas', 'Cocina profunda', 'Lavandería básica', 'Garaje incluido'],
  },
  {
    name: 'Large Home / Casa Grande',
    price: 390,
    desc: 'Propiedad completa + outdoor',
    time: '5-6 horas',
    popular: true,
    features: ['Toda la propiedad', 'Áreas outdoor', 'Limpieza profunda', 'Organización completa', '2 profesionales', 'Productos premium'],
  },
]

export default function PricingSection() {
  return (
    <section id="precios" className="section-dark-alt py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3">
              Precios <span className="text-gold-gradient">transparentes</span>
            </h2>
            <p className="text-[rgba(232,240,255,0.7)] max-w-lg mx-auto">
              Sin sorpresas, sin letras pequeñas. El precio que ves es el que pagas.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 0.08}>
              <div
                className={`relative glass-card rounded-2xl p-5 transition-all duration-300 h-full flex flex-col ${
                  tier.popular ? 'border-gold/40 shadow-lg shadow-gold/5' : ''
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] font-semibold text-xs px-3 border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}

                <div className="mb-4">
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[rgba(232,240,255,0.6)]">{tier.desc}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-gold-gradient font-[family-name:var(--font-montserrat)]">
                    ${tier.price}
                  </span>
                  <span className="text-xs text-[rgba(232,240,255,0.5)]">/servicio</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[rgba(232,240,255,0.6)] mb-4">
                  <Clock className="w-3.5 h-3.5 text-gold/70" />
                  {tier.time}
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[rgba(232,240,255,0.8)]">
                      <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#agendar" className="mt-auto">
                  <Button
                    className={`w-full font-[family-name:var(--font-montserrat)] font-semibold rounded-full ${
                      tier.popular ? 'btn-gold' : 'btn-outline-glow'
                    }`}
                  >
                    Agendar ahora
                  </Button>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
