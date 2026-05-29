'use client'

import { CheckCircle2 } from 'lucide-react'
import { ScrollReveal } from './SparkleEffects'

const includes = [
  { text: 'Aspirar y trapear pisos', icon: '🧹' },
  { text: 'Limpiar y desinfectar baños', icon: '🚿' },
  { text: 'Sacudir y limpiar superficies', icon: '✨' },
  { text: 'Lavar platos y limpiar cocina', icon: '🍽️' },
  { text: 'Hacer camas y cambiar ropa', icon: '🛏️' },
  { text: 'Limpiar espejos y vidrios', icon: '🪟' },
  { text: 'Vaciar basura y reciclar', icon: '♻️' },
  { text: 'Desinfectar interruptores y puertas', icon: '🦠' },
  { text: 'Limpiar interior de microondas', icon: '📦' },
  { text: 'Ordenar espacios comunes', icon: '🏠' },
  { text: 'Limpiar gabinetes por fuera', icon: '🚪' },
  { text: 'Quitar telarañas', icon: '🕸️' },
]

export default function PremiumIncludes() {
  return (
    <section className="section-dark-alt py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3">
              Cada limpieza incluye <span className="text-gold-gradient">esto y más</span>
            </h2>
            <p className="text-[rgba(232,240,255,0.7)] max-w-lg mx-auto">
              No escatimamos en detalles. Nuestro servicio premium cubre todo lo que tu espacio necesita.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {includes.map((item, i) => (
            <ScrollReveal key={item.text} delay={i * 0.05}>
              <div className="glass-card glass-card-hover rounded-xl p-3 md:p-4 flex items-center gap-3 transition-all duration-300">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm text-[#E8F0FF]">{item.text}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
