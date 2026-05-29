'use client'

import dynamic from 'next/dynamic'
import { ScrollReveal } from './SparkleEffects'

const MapInner = dynamic(() => import('./CoverageMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] md:h-[400px] rounded-2xl glass-card flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-[rgba(232,240,255,0.6)]">Cargando mapa...</span>
      </div>
    </div>
  ),
})

const locations = [
  { name: 'Washington, DC', lat: 38.9072, lng: -77.0369 },
  { name: 'Georgetown, DC', lat: 38.9096, lng: -77.0654 },
  { name: 'Capitol Hill, DC', lat: 38.8899, lng: -76.9956 },
  { name: 'Arlington, VA', lat: 38.8799, lng: -77.1068 },
  { name: 'Alexandria, VA', lat: 38.8048, lng: -77.0469 },
  { name: 'Falls Church, VA', lat: 38.8823, lng: -77.1711 },
  { name: 'Fairfax, VA', lat: 38.8462, lng: -77.3064 },
  { name: 'Tysons, VA', lat: 38.9193, lng: -77.2253 },
  { name: 'McLean, VA', lat: 38.9339, lng: -77.1773 },
  { name: 'Reston, VA', lat: 38.9586, lng: -77.357 },
  { name: 'Bethesda, MD', lat: 38.9847, lng: -77.0947 },
  { name: 'Silver Spring, MD', lat: 38.9918, lng: -77.0258 },
  { name: 'Rockville, MD', lat: 39.1031, lng: -77.1986 },
  { name: 'Gaithersburg, MD', lat: 39.1434, lng: -77.2014 },
  { name: 'Chevy Chase, MD', lat: 38.9786, lng: -77.0744 },
  { name: 'Potomac, MD', lat: 39.0634, lng: -77.2089 },
  { name: 'Takoma Park, MD', lat: 38.9779, lng: -77.0033 },
  { name: 'College Park, MD', lat: 38.9897, lng: -76.9378 },
  { name: 'North Bethesda, MD', lat: 39.0468, lng: -77.1225 },
  { name: 'Springfield, VA', lat: 38.7893, lng: -77.188 },
]

export default function CoverageMap() {
  return (
    <section id="cobertura" className="section-dark-alt py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3">
              Áreas de <span className="text-gold-gradient">cobertura</span>
            </h2>
            <p className="text-[rgba(232,240,255,0.7)] max-w-lg mx-auto">
              Servimos todo el área metropolitana de DC, Virginia y Maryland.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <MapInner locations={locations} />
        </ScrollReveal>

        {/* Location chips */}
        <ScrollReveal delay={0.15}>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {locations.slice(0, 12).map((loc) => (
              <span
                key={loc.name}
                className="px-3 py-1 rounded-full text-xs glass-card text-[rgba(232,240,255,0.7)]"
              >
                {loc.name}
              </span>
            ))}
            <span className="px-3 py-1 rounded-full text-xs glass-card text-gold">
              +8 más
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
