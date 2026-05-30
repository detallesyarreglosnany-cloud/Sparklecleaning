'use client'

import { CheckCircle2 } from 'lucide-react'
import { ScrollReveal } from './SparkleEffects'

const includes = [
  'Aspirado de todas las áreas',
  'Lavado profundo de baños completos',
  'Mopeo y sanitización de pisos',
  'Retiro de polvo y residuos',
  'Limpieza de estufa y hornos',
  'Limpieza interior del refrigerador',
  'Lavado y sanitización de papeleras',
  'Limpieza de campana extractora',
  'Cambio de sábanas y edredones',
  'Aplicación de desinfectante (fragancia a tu elección)',
  'Recolección y retiro de basura',
  'Organización de espacios',
  'Limpieza de ventanas pequeñas internas',
]

export default function PremiumIncludes() {
  return (
    <section className="section-dark-alt py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3">
              Cada limpieza <span className="text-gold-gradient">Premium</span> incluye
            </h2>
            <p className="text-[rgba(232,240,255,0.7)] max-w-lg mx-auto">
              No escatimamos en detalles. Nuestro servicio Premium cubre todo lo que tu espacio necesita.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {includes.map((item, i) => (
            <ScrollReveal key={item} delay={i * 0.04}>
              <div className="glass-card glass-card-hover rounded-xl p-3 md:p-4 flex items-center gap-3 transition-all duration-300">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm text-[#E8F0FF]">{item}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
