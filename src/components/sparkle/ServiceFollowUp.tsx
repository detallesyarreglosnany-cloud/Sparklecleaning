'use client'

import { motion } from 'framer-motion'
import {
  Percent,
  CalendarCheck,
  ArrowRight,
  Gift,
  Star,
  Zap,
  Clock,
  TrendingDown,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from './SparkleEffects'

const pricingExamples = [
  { label: 'Casa Premium', original: 180, discounted: 144, savings: 36 },
  { label: 'Apartamento Profunda', original: 197, discounted: 158, savings: 39 },
  { label: 'Casa Grande Premium', original: 390, discounted: 312, savings: 78 },
  { label: 'Casa Grande Profunda', original: 561, discounted: 449, savings: 112 },
]

const steps = [
  {
    icon: CalendarCheck,
    title: 'Agenda',
    desc: 'Reserva tu primera limpieza premium',
  },
  {
    icon: Star,
    title: 'Disfruta',
    desc: 'Recibe un servicio impecable en tu espacio',
  },
  {
    icon: Zap,
    title: 'Activa',
    desc: 'Tu 20% OFF se activa automáticamente',
  },
  {
    icon: TrendingDown,
    title: 'Ahorra',
    desc: 'Tu segunda limpieza con descuento en 30 días',
  },
]

const cards = [
  {
    title: 'Primera limpieza',
    price: 'desde $75',
    description: 'Servicio premium completo en tu espacio',
    highlight: false,
  },
  {
    title: 'Segunda limpieza',
    price: '20% OFF',
    description: 'Ahorras hasta $112 en tu mismo espacio',
    highlight: true,
    badge: 'POPULAR',
  },
  {
    title: 'Condiciones',
    price: 'Simple',
    description: 'Mismo espacio · 30 días · La primera > $100',
    highlight: false,
  },
]

export default function ServiceFollowUp() {
  return (
    <section className="relative section-dark-alt py-16 md:py-20 overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[500px] h-[500px] rounded-full animate-float opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.25), transparent 70%)',
            top: '-15%',
            right: '-10%',
            animationDuration: '9s',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full animate-float opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(26,59,204,0.4), transparent 70%)',
            bottom: '5%',
            left: '-8%',
            animationDuration: '11s',
            animationDelay: '3s',
          }}
        />
        <div
          className="absolute w-[250px] h-[250px] rounded-full animate-float opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,179,0,0.2), transparent 70%)',
            top: '50%',
            left: '60%',
            animationDuration: '13s',
            animationDelay: '5s',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-5">
              <Gift className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-gold tracking-wide">PROMOCIÓN EXCLUSIVA</span>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-4">
              Tu segunda limpieza con{' '}
              <span className="text-gold-gradient">20% OFF</span>
            </h2>
            <p className="text-[rgba(232,240,255,0.7)] max-w-2xl mx-auto text-sm md:text-base">
              La primera limpieza mayor a $100 recibe un 20% de descuento en su segunda limpieza
              del mismo espacio, dentro de los 30 días siguientes.
            </p>
          </div>
        </ScrollReveal>

        {/* Large animated 20% badge */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 100 }}
              className="relative"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#FFE680] to-[#FFB300] flex items-center justify-center shadow-lg shadow-gold/30">
                <div className="text-center">
                  <Percent className="w-6 h-6 md:w-8 md:h-8 text-[#0A0F2E] mx-auto mb-1" />
                  <span className="font-[family-name:var(--font-montserrat)] text-3xl md:text-4xl font-bold text-[#0A0F2E] block leading-none">
                    20
                  </span>
                  <span className="font-[family-name:var(--font-montserrat)] text-xs md:text-sm font-semibold text-[#0A0F2E]/70">
                    OFF
                  </span>
                </div>
              </div>
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gold/40"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-gold/20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
            </motion.div>
          </div>
        </ScrollReveal>

        {/* 3 cards row */}
        <ScrollReveal delay={0.15}>
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl p-6 text-center transition-all duration-300 ${
                  card.highlight
                    ? 'bg-gradient-to-b from-gold/10 to-transparent border-2 border-gold/40 shadow-lg shadow-gold/10'
                    : 'glass-card'
                }`}
              >
                {card.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] text-xs font-bold font-[family-name:var(--font-montserrat)]">
                    {card.badge}
                  </div>
                )}
                <h4 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white mb-2">
                  {card.title}
                </h4>
                <p className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-gold-gradient mb-2">
                  {card.price}
                </p>
                <p className="text-xs text-[rgba(232,240,255,0.6)]">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* How it works - 4 steps */}
        <ScrollReveal delay={0.2}>
          <div className="mb-12">
            <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-bold text-white text-center mb-8">
              ¿Cómo <span className="text-gold-gradient">funciona</span>?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5 text-center relative"
                >
                  {/* Step number */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-r from-[#FFE680] to-[#FFB300] flex items-center justify-center text-[10px] font-bold text-[#0A0F2E] font-[family-name:var(--font-montserrat)]">
                    {i + 1}
                  </div>
                  <step.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                  <h5 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold text-white mb-1">
                    {step.title}
                  </h5>
                  <p className="text-xs text-[rgba(232,240,255,0.6)]">{step.desc}</p>

                  {/* Arrow connector (not on last) */}
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/30" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Example pricing */}
        <ScrollReveal delay={0.25}>
          <div className="mb-12">
            <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-bold text-white text-center mb-6">
              Ejemplos de <span className="text-gold-gradient">ahorro</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {pricingExamples.map((ex, i) => (
                <motion.div
                  key={ex.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5"
                >
                  <h5 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold text-white mb-3">
                    {ex.label}
                  </h5>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[rgba(232,240,255,0.4)] line-through font-[family-name:var(--font-montserrat)] text-lg">
                      ${ex.original}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[rgba(232,240,255,0.3)]" />
                    <span className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-gold-gradient">
                      ${ex.discounted}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <RefreshCw className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400 font-semibold">
                      Ahorras ${ex.savings}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center">
            <a href="#agendar">
              <Button className="btn-gold font-[family-name:var(--font-montserrat)] font-semibold rounded-full px-8 py-6 text-base group">
                <Gift className="w-5 h-5 mr-2" />
                Quiero mi 20% OFF en la segunda limpieza
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[rgba(232,240,255,0.5)]">
              <Clock className="w-3.5 h-3.5" />
              <span>El descuento se activa automáticamente, sin códigos, sin trucos</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
