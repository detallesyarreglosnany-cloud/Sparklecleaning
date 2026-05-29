'use client'

import { motion } from 'framer-motion'
import { Shield, Star, UserCheck, Leaf, ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SparkleParticles, SoapBubbles, GlowOrbs, useCounter } from './SparkleEffects'

const badges = [
  { icon: Shield, label: '100% Garantizado' },
  { icon: Star, label: '5 Estrellas' },
  { icon: UserCheck, label: 'Personal verificado' },
  { icon: Leaf, label: 'Productos seguros' },
]

export default function HeroSection() {
  const counterRef = useCounter(2847, 2500)

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F2E] via-[#0D1B4B] to-[#0A0F2E]" />

      {/* Glow orbs */}
      <GlowOrbs />

      {/* Sparkle particles */}
      <SparkleParticles />

      {/* Soap bubbles */}
      <SoapBubbles />

      {/* Gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F2E]/80 via-transparent to-[#0A0F2E]/60" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0F2E] to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 w-full">
        <div className="max-w-3xl">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-sm text-[rgba(232,240,255,0.8)]">
              Servicio premium en DC, Virginia & Maryland
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-white">Date un </span>
            <span className="text-gold-gradient">respiro</span>
            <br />
            <span className="text-white">y deja que tu espacio </span>
            <br className="hidden sm:block" />
            <span className="text-gold-gradient">brille</span>
            <span className="text-white"> como nunca</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-[rgba(232,240,255,0.8)] max-w-xl mb-4"
          >
            Limpieza profesional con corazón. Transformamos hogares y oficinas en espacios
            impecables, para que tú disfrutes lo que realmente importa.
          </motion.p>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="text-gold-gradient font-[family-name:var(--font-montserrat)] text-2xl font-bold">
              +<span ref={counterRef}>0</span>
            </span>
            <span className="text-[rgba(232,240,255,0.7)] text-sm">hogares transformados</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <a href="#agendar">
              <Button className="btn-glow font-[family-name:var(--font-montserrat)] text-base font-semibold rounded-full px-8 py-6 h-auto group">
                Cotiza tu limpieza GRATIS ahora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="https://wa.me/12025550199" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="btn-outline-glow font-[family-name:var(--font-montserrat)] text-base font-semibold rounded-full px-8 py-6 h-auto group"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Habla con nosotros
              </Button>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-3"
          >
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs sm:text-sm text-[rgba(232,240,255,0.8)]"
              >
                <badge.icon className="w-4 h-4 text-gold" />
                {badge.label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
