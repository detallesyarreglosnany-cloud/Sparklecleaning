'use client'

import dynamic from 'next/dynamic'
import { MapPin, Train, Shield, Clock } from 'lucide-react'
import { ScrollReveal } from './SparkleEffects'
import { useLocationContext } from './LocationContext'
import { metroLines } from '@/data/wmata'

const MapInner = dynamic(() => import('./CoverageMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[440px] rounded-2xl glass-card flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-7 h-7 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-[rgba(232,240,255,0.6)]">Cargando mapa...</span>
      </div>
    </div>
  ),
})

const stats = [
  { icon: MapPin, label: 'Zonas', value: '20+' },
  { icon: Train, label: 'Líneas', value: '6' },
  { icon: Shield, label: 'Cobertura', value: '12 km' },
  { icon: Clock, label: 'Respuesta', value: '< 2h' },
]

export default function CoverageMap() {
  const { location } = useLocationContext()

  return (
    <section id="cobertura" className="section-dark-alt py-14 md:py-18">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-3">
              <MapPin className="w-3 h-3 text-gold" />
              <span className="text-[10px] text-gold font-semibold uppercase tracking-wider">Zona de servicio</span>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-2">
              Cobertura <span className="text-gold-gradient">Metro DC</span>
            </h2>
            <p className="text-sm text-[rgba(232,240,255,0.6)] max-w-md mx-auto">
              12 km alrededor de cada línea del Metro. Haz clic o usa tu GPS para verificar tu zona.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats row - compact */}
        <ScrollReveal delay={0.05}>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {stats.map((s) => (
              <div key={s.label} className="glass-card rounded-lg p-2.5 text-center">
                <s.icon className="w-3.5 h-3.5 text-gold mx-auto mb-1" />
                <p className="text-sm font-bold text-gold font-[family-name:var(--font-montserrat)]">{s.value}</p>
                <p className="text-[9px] text-[rgba(232,240,255,0.4)]">{s.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Map */}
        <ScrollReveal delay={0.1}>
          <MapInner />
        </ScrollReveal>

        {/* Metro Legend - inline */}
        <ScrollReveal delay={0.15}>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {metroLines.map((line) => (
              <div key={line.id} className="flex items-center gap-1.5">
                <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: line.color }} />
                <span className="text-[10px] text-[rgba(232,240,255,0.5)]">{line.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 rounded-full border border-gold/30 border-dashed bg-gold/5" />
              <span className="text-[10px] text-[rgba(232,240,255,0.5)]">12 km</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Location confirmation banner */}
        {location.selectedFromMap && location.inCoverage && (
          <ScrollReveal delay={0.1}>
            <div className="mt-4 p-3 rounded-xl bg-gold/10 border border-gold/20 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white font-semibold">Ubicación seleccionada</p>
                <p className="text-[10px] text-[rgba(232,240,255,0.5)]">Se enviará con tu reserva automáticamente</p>
              </div>
              <a
                href="#agendar"
                className="shrink-0 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] text-[10px] font-bold"
              >
                Agendar →
              </a>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
