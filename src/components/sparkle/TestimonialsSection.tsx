'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react'
import { ScrollReveal } from './SparkleEffects'

const testimonials = [
  {
    name: 'María González',
    location: 'Arlington, VA',
    rating: 5,
    text: '¡Increíble! Mi apartamento nunca había estado tan limpio. El equipo fue puntual, profesional y muy detallista. 100% recomendado.',
    verified: true,
    service: 'Apartamento',
  },
  {
    name: 'Carlos Mendoza',
    location: 'Washington, DC',
    rating: 5,
    text: 'Usamos su servicio para nuestro Airbnb y los huéspedes siempre dejan 5 estrellas por la limpieza. Son confiables y puntuales.',
    verified: true,
    service: 'Airbnb',
  },
  {
    name: 'Ana Rodríguez',
    location: 'Bethesda, MD',
    rating: 5,
    text: 'La limpieza profunda dejó mi casa como nueva. Se nota que usan productos de calidad y cuidan cada detalle. Los contrato quincenalmente.',
    verified: true,
    service: 'Casa',
  },
  {
    name: 'Roberto Silva',
    location: 'Alexandria, VA',
    rating: 5,
    text: 'Contraté el servicio post-construcción y quedó impecable. Polvo, residuos, todo desapareció. Muy profesionales.',
    verified: true,
    service: 'Post construcción',
  },
  {
    name: 'Laura Pérez',
    location: 'Silver Spring, MD',
    rating: 5,
    text: 'Excelente servicio para mi oficina. Los empleados están encantados con la limpieza. Ambiente mucho más agradable.',
    verified: true,
    service: 'Oficina',
  },
  {
    name: 'Diego Ramírez',
    location: 'Georgetown, DC',
    rating: 5,
    text: 'El servicio de limpieza para nuestro evento fue perfecto. Llegaron antes y dejaron todo listo a tiempo. Sin estrés.',
    verified: true,
    service: 'Evento',
  },
]

const stats = [
  { label: 'Google', value: '4.9', icon: '⭐' },
  { label: 'Yelp', value: '4.8', icon: '⭐' },
  { label: 'BBB', value: 'A+', icon: '🏆' },
  { label: 'Best DC', value: '2024', icon: '🥇' },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const t = testimonials[current]

  return (
    <section id="testimonios" className="section-dark py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3">
              Lo que dicen nuestros <span className="text-gold-gradient">clientes</span>
            </h2>
            <p className="text-[rgba(232,240,255,0.7)]">
              +2,847 hogares transformados con resultados que hablan por sí solos.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats row */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-card rounded-xl px-5 py-3 flex items-center gap-3"
              >
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <div className="text-gold font-bold text-lg font-[family-name:var(--font-montserrat)]">
                    {s.value}
                  </div>
                  <div className="text-xs text-[rgba(232,240,255,0.6)]">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Testimonial carousel */}
        <ScrollReveal delay={0.15}>
          <div className="max-w-2xl mx-auto">
            <div className="relative glass-card rounded-2xl p-6 md:p-8 overflow-hidden min-h-[220px]">
              <Quote className="absolute top-4 right-4 w-12 h-12 text-gold/10" />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 50 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>

                  <p className="text-[#E8F0FF] text-base md:text-lg leading-relaxed mb-5 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{t.name}</span>
                        {t.verified && (
                          <BadgeCheck className="w-4 h-4 text-gold" />
                        )}
                      </div>
                      <span className="text-xs text-[rgba(232,240,255,0.6)]">
                        {t.location} · {t.service}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#E8F0FF] hover:border-gold/30 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1)
                      setCurrent(i)
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-gold w-6' : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#E8F0FF] hover:border-gold/30 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
