'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPin, Train, Shield, Clock, ArrowRight } from 'lucide-react'
import { ScrollReveal } from './SparkleEffects'
import { useLocationContext } from './LocationContext'
import { metroLines } from '@/data/wmata'

const MapInner = dynamic(() => import('./CoverageMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl glass-card flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-[rgba(232,240,255,0.6)]">Cargando mapa de cobertura...</span>
      </div>
    </div>
  ),
})

const coverageStats = [
  { icon: MapPin, label: 'Zonas cubiertas', value: '20+' },
  { icon: Train, label: 'Líneas de metro', value: '6' },
  { icon: Shield, label: 'Radio de cobertura', value: '12 km' },
  { icon: Clock, label: 'Respuesta promedio', value: '< 2 hrs' },
]

export default function CoverageMap() {
  const { location } = useLocationContext()

  return (
    <section id="cobertura" className="section-dark-alt py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-4"
            >
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs text-gold font-semibold">ZONA DE SERVICIO</span>
            </motion.div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3">
              Cobertura <span className="text-gold-gradient">Metro DC</span>
            </h2>
            <p className="text-[rgba(232,240,255,0.7)] max-w-2xl mx-auto">
              Nuestro servicio cubre 12 km alrededor de cada línea del Metro de Washington DC.
              Haz clic en el mapa o usa tu ubicación para verificar si estamos en tu zona.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats row */}
        <ScrollReveal delay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {coverageStats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                <stat.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                <p className="text-xl font-bold text-gold font-[family-name:var(--font-montserrat)]">{stat.value}</p>
                <p className="text-[10px] text-[rgba(232,240,255,0.5)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Map */}
        <ScrollReveal delay={0.1}>
          <MapInner />
        </ScrollReveal>

        {/* Metro Line Legend */}
        <ScrollReveal delay={0.15}>
          <div className="mt-6 glass-card rounded-xl p-4">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Train className="w-4 h-4 text-gold" />
              Líneas del Metro WMATA
            </h4>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {metroLines.map((line) => (
                <div key={line.id} className="flex items-center gap-2">
                  <div
                    className="w-5 h-1 rounded-full"
                    style={{ backgroundColor: line.color }}
                  />
                  <span className="text-xs text-[rgba(232,240,255,0.7)]">{line.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <div className="w-5 h-1 rounded-full border border-gold/40 border-dashed bg-gold/10" />
                <span className="text-xs text-[rgba(232,240,255,0.7)]">Zona 12 km</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Location auto-sent confirmation */}
        {location.selectedFromMap && location.inCoverage && (
          <ScrollReveal delay={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-gold/10 border border-gold/20 flex items-center gap-3"
            >
              <MapPin className="w-5 h-5 text-gold shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-white font-semibold">Ubicación seleccionada</p>
                <p className="text-xs text-[rgba(232,240,255,0.6)]">
                  Se enviará automáticamente con tu reserva al agendar
                </p>
              </div>
              <a
                href="#agendar"
                className="shrink-0 flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] text-xs font-bold hover:shadow-lg transition-all"
              >
                Agendar <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          </ScrollReveal>
        )}

        {/* How it works */}
        <ScrollReveal delay={0.2}>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              {
                step: '1',
                title: 'Verifica tu zona',
                desc: 'Haz clic en el mapa o usa tu GPS para ver si estás dentro de nuestra cobertura de 12 km del Metro.',
              },
              {
                step: '2',
                title: 'Selecciona tu ubicación',
                desc: 'Tu ubicación se guarda automáticamente para coordinar al equipo más cercano a tu zona.',
              },
              {
                step: '3',
                title: 'Agenda tu limpieza',
                desc: 'Las coordenadas se pegan solas en tu reserva. Personaliza tu servicio y confirma en segundos.',
              },
            ].map((item) => (
              <div key={item.step} className="glass-card rounded-xl p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FFE680] to-[#FFB300] flex items-center justify-center mx-auto mb-3">
                  <span className="text-sm font-bold text-[#0A0F2E]">{item.step}</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-[10px] text-[rgba(232,240,255,0.6)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
