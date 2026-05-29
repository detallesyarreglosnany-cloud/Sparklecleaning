'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from './SparkleEffects'

const spaceTypes = [
  { id: 'room', label: '🛏️ Habitación', base: 75 },
  { id: 'studio', label: '🏠 Studio', base: 95 },
  { id: 'apartment', label: '🏢 Apartamento', base: 130 },
  { id: 'house', label: '🏡 Casa', base: 180 },
  { id: 'airbnb', label: '🏨 Airbnb', base: 95 },
  { id: 'event', label: '🎉 Evento', base: 250 },
  { id: 'office', label: '🏢 Oficina', base: 80 },
  { id: 'large-home', label: '🏠 Casa Grande', base: 390 },
  { id: 'airbnb-express', label: '⚡ Airbnb Express', base: 80 },
]

const cleaningTypes = [
  { id: 'standard', label: 'Estándar', modifier: 1 },
  { id: 'deep', label: 'Profunda', modifier: 1.4 },
  { id: 'move', label: 'Mudanza', modifier: 1.5 },
  { id: 'post-construction', label: 'Post-construcción', modifier: 1.6 },
]

const addOns = [
  { id: 'refrigerator', label: 'Refrigerador', price: 30, emoji: '🧊' },
  { id: 'oven', label: 'Horno', price: 25, emoji: '🔥' },
  { id: 'windows', label: 'Ventanas (por habitación)', price: 15, emoji: '🪟' },
  { id: 'laundry', label: 'Lavandería', price: 20, emoji: '👕' },
  { id: 'organization', label: 'Organización', price: 35, emoji: '📦' },
]

const frequencies = [
  { id: 'one-time', label: 'Una vez', discount: 0 },
  { id: 'weekly', label: 'Semanal', discount: 0.2 },
  { id: 'biweekly', label: 'Quincenal', discount: 0.15 },
  { id: 'monthly', label: 'Mensual', discount: 0.1 },
]

export default function ServiceCustomizer() {
  const [step, setStep] = useState(1)
  const [spaceType, setSpaceType] = useState('')
  const [cleaningType, setCleaningType] = useState('standard')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [rooms, setRooms] = useState(1)
  const [bathrooms, setBathrooms] = useState(1)
  const [frequency, setFrequency] = useState('one-time')

  const total = useMemo(() => {
    const space = spaceTypes.find((s) => s.id === spaceType)
    const cleaning = cleaningTypes.find((c) => c.id === cleaningType)
    const freq = frequencies.find((f) => f.id === frequency)
    if (!space || !cleaning || !freq) return 0

    let base = space.base * cleaning.modifier
    // Add per-room/bathroom adjustments
    base += (rooms - 1) * 25
    base += (bathrooms - 1) * 20

    // Add-ons
    selectedAddOns.forEach((id) => {
      const addOn = addOns.find((a) => a.id === id)
      if (addOn) {
        if (id === 'windows') base += addOn.price * rooms
        else base += addOn.price
      }
    })

    // Frequency discount
    base = base * (1 - freq.discount)

    return Math.round(base)
  }, [spaceType, cleaningType, selectedAddOns, rooms, bathrooms, frequency])

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))
  }

  const freqLabel = frequencies.find((f) => f.id === frequency)?.label || ''
  const discount = frequencies.find((f) => f.id === frequency)?.discount || 0

  return (
    <section id="personalizar" className="section-dark-alt py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3">
              Personaliza tu <span className="text-gold-gradient">servicio</span>
            </h2>
            <p className="text-[rgba(232,240,255,0.7)]">
              En 4 pasos simples, arma la limpieza perfecta para tu espacio.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card rounded-2xl p-5 md:p-8">
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      s <= step
                        ? 'bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E]'
                        : 'bg-white/10 text-[rgba(232,240,255,0.4)]'
                    }`}
                  >
                    {s < step ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`flex-1 h-0.5 rounded transition-all duration-300 ${
                        s < step ? 'bg-gold' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Steps */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white mb-4">
                    ¿Qué necesitas limpiar?
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {spaceTypes.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setSpaceType(st.id)}
                        className={`px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                          spaceType === st.id
                            ? 'bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] font-semibold shadow-lg shadow-gold/20'
                            : 'glass-card text-[#E8F0FF] hover:border-gold/30'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white mb-4">
                    ¿Cómo lo quieres?
                  </h3>

                  {/* Cleaning type */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cleaningTypes.map((ct) => (
                      <button
                        key={ct.id}
                        onClick={() => setCleaningType(ct.id)}
                        className={`px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                          cleaningType === ct.id
                            ? 'bg-gradient-to-r from-[#1A3BCC] to-[#2C4FE0] text-white font-semibold shadow-lg shadow-[#1A3BCC]/30'
                            : 'glass-card text-[#E8F0FF] hover:border-[#1A3BCC]/30'
                        }`}
                      >
                        {ct.label}
                        {ct.modifier > 1 && (
                          <span className="ml-1 text-xs opacity-70">+{Math.round((ct.modifier - 1) * 100)}%</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Add-ons */}
                  <h4 className="text-sm font-semibold text-[rgba(232,240,255,0.8)] mb-3">
                    Servicios adicionales
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {addOns.map((ao) => (
                      <button
                        key={ao.id}
                        onClick={() => toggleAddOn(ao.id)}
                        className={`px-3 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 ${
                          selectedAddOns.includes(ao.id)
                            ? 'bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] font-semibold'
                            : 'glass-card text-[#E8F0FF] hover:border-gold/30'
                        }`}
                      >
                        <span>{ao.emoji}</span>
                        {ao.label}
                        <span className="text-xs opacity-70">+${ao.price}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white mb-4">
                    Cuéntanos tu espacio
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-sm text-[rgba(232,240,255,0.7)] mb-1.5 block">
                        Habitaciones
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setRooms(Math.max(1, rooms - 1))}
                          className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white hover:border-gold/30 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold text-gold w-8 text-center">{rooms}</span>
                        <button
                          onClick={() => setRooms(rooms + 1)}
                          className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white hover:border-gold/30 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[rgba(232,240,255,0.7)] mb-1.5 block">
                        Baños
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                          className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white hover:border-gold/30 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold text-gold w-8 text-center">{bathrooms}</span>
                        <button
                          onClick={() => setBathrooms(bathrooms + 1)}
                          className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white hover:border-gold/30 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Frequency */}
                  <h4 className="text-sm font-semibold text-[rgba(232,240,255,0.8)] mb-3">
                    Frecuencia
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {frequencies.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFrequency(f.id)}
                        className={`px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                          frequency === f.id
                            ? 'bg-gradient-to-r from-[#1A3BCC] to-[#2C4FE0] text-white font-semibold shadow-lg shadow-[#1A3BCC]/30'
                            : 'glass-card text-[#E8F0FF] hover:border-[#1A3BCC]/30'
                        }`}
                      >
                        {f.label}
                        {f.discount > 0 && (
                          <span className="ml-1 text-xs opacity-70">-{Math.round(f.discount * 100)}%</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white mb-4">
                    Tu cotización personalizada
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[rgba(232,240,255,0.7)]">Tipo de espacio</span>
                      <span className="text-white">
                        {spaceTypes.find((s) => s.id === spaceType)?.label || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[rgba(232,240,255,0.7)]">Tipo de limpieza</span>
                      <span className="text-white">
                        {cleaningTypes.find((c) => c.id === cleaningType)?.label || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[rgba(232,240,255,0.7)]">Habitaciones</span>
                      <span className="text-white">{rooms}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[rgba(232,240,255,0.7)]">Baños</span>
                      <span className="text-white">{bathrooms}</span>
                    </div>
                    {selectedAddOns.length > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[rgba(232,240,255,0.7)]">Adicionales</span>
                        <span className="text-white">
                          {selectedAddOns.map((id) => addOns.find((a) => a.id === id)?.label).join(', ')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[rgba(232,240,255,0.7)]">Frecuencia</span>
                      <span className="text-white">{freqLabel}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gold">Descuento por frecuencia</span>
                        <span className="text-gold">-{Math.round(discount * 100)}%</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white font-semibold">Total estimado</span>
                      <motion.span
                        key={total}
                        initial={{ scale: 1.2, color: '#FFD700' }}
                        animate={{ scale: 1, color: '#FFD700' }}
                        className="text-3xl font-bold text-gold-gradient font-[family-name:var(--font-montserrat)]"
                      >
                        ${total}
                      </motion.span>
                    </div>
                  </div>

                  <a href="#agendar">
                    <Button className="btn-gold w-full font-[family-name:var(--font-montserrat)] font-semibold rounded-full py-6 text-base group">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Agendar ahora con solo $15
                    </Button>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="text-[rgba(232,240,255,0.7)] hover:text-white hover:bg-white/5"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              {step < 4 && (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && !spaceType}
                  className="btn-glow font-[family-name:var(--font-montserrat)] font-semibold rounded-full"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>

            {/* Live price */}
            {step < 4 && total > 0 && (
              <div className="mt-4 text-center">
                <span className="text-sm text-[rgba(232,240,255,0.5)]">Estimado: </span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-lg font-bold text-gold"
                >
                  ${total}
                </motion.span>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
