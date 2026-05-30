'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { ScrollReveal } from './SparkleEffects'

interface Service {
  id: string
  emoji: string
  name: string
  desc: string
  base: number
  products: number
  fold: number
  profunda: number
}

const services: Service[] = [
  { id: 'room', emoji: '🛏️', name: 'Room / Habitación', desc: '1 espacio + baño', base: 75, products: 13, fold: 11, profunda: 120 },
  { id: 'studio', emoji: '🏠', name: 'Studio', desc: '3 espacios + baño', base: 95, products: 16, fold: 14, profunda: 148 },
  { id: 'apartment', emoji: '🏢', name: 'Apartment / Apartamento', desc: 'Hasta 5 espacios + 2 baños', base: 130, products: 22, fold: 20, profunda: 197 },
  { id: 'house', emoji: '🏡', name: 'House / Casa', desc: '5+ espacios + áreas externas', base: 180, products: 31, fold: 27, profunda: 267 },
  { id: 'airbnb', emoji: '🏨', name: 'Airbnb / Vacation Rental', desc: 'Desde 1 espacio + baño', base: 95, products: 16, fold: 14, profunda: 148 },
  { id: 'events', emoji: '🎉', name: 'Events / Eventos', desc: 'Pre & post-evento', base: 250, products: 43, fold: 38, profunda: 365 },
  { id: 'office', emoji: '💼', name: 'Offices / Oficinas', desc: 'Espacios comerciales', base: 80, products: 14, fold: 12, profunda: 127 },
  { id: 'large-home', emoji: '🏘️', name: 'Large Home / Casa Grande', desc: 'Propiedad completa + outdoor', base: 390, products: 66, fold: 59, profunda: 561 },
  { id: 'airbnb-express', emoji: '⚡', name: 'Airbnb Express', desc: 'Servicio de respuesta rápida', base: 80, products: 14, fold: 12, profunda: 127 },
]

const premiumIncludes = [
  'Cambio de sábanas y edredones',
  'Limpieza de ventanas pequeñas internas',
  '1 refrigerador',
  'Limpieza de horno y estufa',
  'Limpieza profunda de cocina',
]

const profundaIncludes = [
  'Todo lo de Premium',
  'Limpiar cajones',
  'Gabinetes de cocina',
  'Congeladores extras',
  'Vidrios internos completos (+$15 adicional)',
]

const addOns = [
  { label: 'Productos de limpieza', getPrice: (s: Service) => `+$${s.products}` },
  { label: 'Doblar ropa', getPrice: (s: Service) => `+$${s.fold}` },
  { label: 'Patios', getPrice: () => '$50 - $90' },
  { label: 'Garages', getPrice: () => '$30 - $50' },
  { label: 'Áticos', getPrice: () => '$20 - $60' },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="glass-card glass-card-hover rounded-xl transition-all duration-300 group">
        {/* Compact card */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <span className="text-2xl">{service.emoji}</span>
            <span className="text-gold-gradient font-[family-name:var(--font-montserrat)] text-xl font-bold">
              ${service.base}
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-white mb-1 group-hover:text-gold transition-colors">
            {service.name}
          </h3>
          <p className="text-xs text-[rgba(232,240,255,0.6)] mb-3">{service.desc}</p>
          <p className="text-[10px] text-[rgba(232,240,255,0.4)] mb-3">Productos no incluidos</p>

          {/* Ver Detalles button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-gold/80 hover:text-gold bg-white/5 hover:bg-white/10 transition-all duration-200"
          >
            Ver Detalles
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.span>
          </button>
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-4 border-t border-white/10 pt-4">
                {/* Premium level */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gold">Premium</h4>
                    <span className="text-gold-gradient font-[family-name:var(--font-montserrat)] text-sm font-bold">
                      ${service.base}
                    </span>
                  </div>
                  <p className="text-[10px] text-[rgba(232,240,255,0.4)] mb-2">Precio base · Nuestro estándar de calidad</p>
                  <ul className="space-y-1">
                    {premiumIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-[rgba(232,240,255,0.8)]">
                        <Check className="w-3 h-3 text-gold shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Profunda level */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-[#1A3BCC]">Profunda</h4>
                    <span className="text-gold-gradient font-[family-name:var(--font-montserrat)] text-sm font-bold">
                      ${service.profunda}
                    </span>
                  </div>
                  <p className="text-[10px] text-[rgba(232,240,255,0.4)] mb-2">Base × 1.4 + $15 vidrios internos completos</p>
                  <ul className="space-y-1">
                    {profundaIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-[rgba(232,240,255,0.8)]">
                        <Check className="w-3 h-3 text-[#1A3BCC] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add-ons */}
                <div>
                  <h4 className="text-sm font-semibold text-[rgba(232,240,255,0.9)] mb-2">Servicios adicionales</h4>
                  <div className="space-y-1.5">
                    {addOns.map((ao) => (
                      <div key={ao.label} className="flex items-center justify-between text-xs">
                        <span className="text-[rgba(232,240,255,0.7)]">{ao.label}</span>
                        <span className="text-gold font-semibold">{ao.getPrice(service)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  )
}

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
              Soluciones de limpieza para cada tipo de espacio. Todos los precios son sin productos de limpieza.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop grid - 3 columns */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <ServiceCard key={svc.id} service={svc} index={i} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory custom-scrollbar -mx-4 px-4">
          {services.map((svc, i) => (
            <div key={svc.id} className="min-w-[260px] snap-start shrink-0">
              <ServiceCard service={svc} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
