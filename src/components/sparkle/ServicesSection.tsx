'use client'

import { ScrollReveal } from './SparkleEffects'

const services = [
  { emoji: '🛏️', name: 'Room / Habitación', desc: '1 espacio + baño', price: 75 },
  { emoji: '🏠', name: 'Studio', desc: '3 espacios + baño', price: 95 },
  { emoji: '🏢', name: 'Apartment / Departamento', desc: 'Hasta 5 espacios + 2 baños', price: 130 },
  { emoji: '🏡', name: 'House / Casa', desc: '5+ espacios + áreas externas', price: 180 },
  { emoji: '🏨', name: 'Airbnb / Vacation Rental', desc: 'Desde 1 espacio + baño', price: 95 },
  { emoji: '🎉', name: 'Events / Eventos', desc: 'Pre & post-evento', price: 250 },
  { emoji: '🏢', name: 'Offices / Oficinas', desc: 'Espacios comerciales', price: 80 },
  { emoji: '🏠', name: 'Large Home', desc: 'Propiedad completa + outdoor', price: 390 },
  { emoji: '⚡', name: 'Airbnb Express', desc: 'Turnaround rápido', price: 80 },
]

export default function ServicesSection() {
  return (
    <section id="servicios" className="section-dark py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3">
              Nuestros <span className="text-gold-gradient">servicios</span>
            </h2>
            <p className="text-[rgba(232,240,255,0.7)] max-w-lg mx-auto">
              Soluciones de limpieza para cada tipo de espacio. Todos incluyen nuestro servicio premium completo.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.name} delay={i * 0.05}>
              <div className="glass-card glass-card-hover rounded-xl p-5 transition-all duration-300 group cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{svc.emoji}</span>
                  <span className="text-gold-gradient font-[family-name:var(--font-montserrat)] text-xl font-bold">
                    ${svc.price}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-white mb-1 group-hover:text-gold transition-colors">
                  {svc.name}
                </h3>
                <p className="text-xs text-[rgba(232,240,255,0.6)]">{svc.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory custom-scrollbar -mx-4 px-4">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="glass-card glass-card-hover rounded-xl p-4 min-w-[200px] snap-start shrink-0 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{svc.emoji}</span>
                <span className="text-gold-gradient font-[family-name:var(--font-montserrat)] text-lg font-bold">
                  ${svc.price}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-white mb-1">
                {svc.name}
              </h3>
              <p className="text-xs text-[rgba(232,240,255,0.6)]">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
