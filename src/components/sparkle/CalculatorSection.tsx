'use client'

import { useState, useMemo } from 'react'
import { ScrollReveal } from './SparkleEffects'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

const spaceOptions = [
  { id: 'room', label: 'Habitación', base: 75 },
  { id: 'studio', label: 'Studio', base: 95 },
  { id: 'apartment', label: 'Apartamento', base: 130 },
  { id: 'house', label: 'Casa', base: 180 },
  { id: 'airbnb', label: 'Airbnb', base: 95 },
  { id: 'office', label: 'Oficina', base: 80 },
]

const cleanOptions = [
  { id: 'standard', label: 'Estándar', mod: 1 },
  { id: 'deep', label: 'Profunda', mod: 1.4 },
  { id: 'move', label: 'Mudanza', mod: 1.5 },
]

const freqOptions = [
  { id: 'one-time', label: 'Una vez', discount: 0 },
  { id: 'weekly', label: 'Semanal', discount: 0.2 },
  { id: 'biweekly', label: 'Quincenal', discount: 0.15 },
  { id: 'monthly', label: 'Mensual', discount: 0.1 },
]

export default function CalculatorSection() {
  const [space, setSpace] = useState('apartment')
  const [clean, setClean] = useState('standard')
  const [rooms, setRooms] = useState(3)
  const [bathrooms, setBathrooms] = useState(1)
  const [freq, setFreq] = useState('one-time')

  const price = useMemo(() => {
    const s = spaceOptions.find((o) => o.id === space)
    const c = cleanOptions.find((o) => o.id === clean)
    const f = freqOptions.find((o) => o.id === freq)
    if (!s || !c || !f) return 0

    let total = s.base * c.mod
    total += (rooms - 1) * 25
    total += (bathrooms - 1) * 20
    total = total * (1 - f.discount)
    return Math.round(total)
  }, [space, clean, rooms, bathrooms, freq])

  return (
    <section className="section-dark py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3">
              Calcula tu <span className="text-gold-gradient">precio</span> al instante
            </h2>
            <p className="text-[rgba(232,240,255,0.7)]">
              Selecciona tus opciones y obtén un estimado en segundos.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card rounded-2xl p-5 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Space type */}
              <div>
                <label className="text-sm text-[rgba(232,240,255,0.7)] mb-2 block">Tipo de espacio</label>
                <div className="flex flex-wrap gap-2">
                  {spaceOptions.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setSpace(o.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        space === o.id
                          ? 'bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] font-semibold'
                          : 'glass-card text-[#E8F0FF] hover:border-gold/30'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cleaning type */}
              <div>
                <label className="text-sm text-[rgba(232,240,255,0.7)] mb-2 block">Tipo de limpieza</label>
                <div className="flex flex-wrap gap-2">
                  {cleanOptions.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setClean(o.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        clean === o.id
                          ? 'bg-gradient-to-r from-[#1A3BCC] to-[#2C4FE0] text-white font-semibold'
                          : 'glass-card text-[#E8F0FF] hover:border-[#1A3BCC]/30'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rooms & bathrooms */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="text-sm text-[rgba(232,240,255,0.7)] mb-2 block">Habitaciones</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-white"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold text-gold w-6 text-center">{rooms}</span>
                    <button
                      onClick={() => setRooms(rooms + 1)}
                      className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-sm text-[rgba(232,240,255,0.7)] mb-2 block">Baños</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                      className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-white"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold text-gold w-6 text-center">{bathrooms}</span>
                    <button
                      onClick={() => setBathrooms(bathrooms + 1)}
                      className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="text-sm text-[rgba(232,240,255,0.7)] mb-2 block">Frecuencia</label>
                <div className="flex flex-wrap gap-2">
                  {freqOptions.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setFreq(o.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        freq === o.id
                          ? 'bg-gradient-to-r from-[#1A3BCC] to-[#2C4FE0] text-white font-semibold'
                          : 'glass-card text-[#E8F0FF] hover:border-[#1A3BCC]/30'
                      }`}
                    >
                      {o.label}
                      {o.discount > 0 && (
                        <span className="ml-1 text-xs opacity-70">-{Math.round(o.discount * 100)}%</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price display */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-sm text-[rgba(232,240,255,0.5)]">Precio estimado</span>
                <div className="text-4xl font-bold text-gold-gradient font-[family-name:var(--font-montserrat)]">
                  ${price}
                </div>
              </div>
              <a href="#agendar">
                <Button className="btn-gold font-[family-name:var(--font-montserrat)] font-semibold rounded-full px-8 py-5 text-base group">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Agendar con $15
                </Button>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
