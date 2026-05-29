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
  { id: 'events', label: '🎉 Evento', base: 250 },
  { id: 'office', label: '💼 Oficina', base: 80 },
  { id: 'large-home', label: '🏘️ Casa Grande', base: 390 },
  { id: 'airbnb-express', label: '⚡ Airbnb Express', base: 80 },
]

const cleaningLevels = [
  {
    id: 'premium',
    label: 'Premium',
    description: 'Incluye ventanas pequeñas, 1 refrigerador, 1 horno, limpieza profunda de cocina y hornos',
    getPrice: (base: number) => base,
  },
  {
    id: 'profunda',
    label: 'Profunda',
    description: 'Todo lo de Premium + cajones, gabinetes, congeladores extras, vidrios internos completos',
    getPrice: (base: number) => Math.round(base * 1.4) + 15,
  },
]

type PatioSize = 'none' | 'small' | 'medium' | 'large'
type GarageSize = 'none' | 'one' | 'two'
type AtticSize = 'none' | 'small' | 'medium' | 'large'

const patioOptions: { id: PatioSize; label: string; price: number }[] = [
  { id: 'none', label: 'Ninguno', price: 0 },
  { id: 'small', label: 'Pequeño $50', price: 50 },
  { id: 'medium', label: 'Mediano $70', price: 70 },
  { id: 'large', label: 'Grande $90', price: 90 },
]

const garageOptions: { id: GarageSize; label: string; price: number }[] = [
  { id: 'none', label: 'Ninguno', price: 0 },
  { id: 'one', label: '1 auto $30', price: 30 },
  { id: 'two', label: '2 autos $50', price: 50 },
]

const atticOptions: { id: AtticSize; label: string; price: number }[] = [
  { id: 'none', label: 'Ninguno', price: 0 },
  { id: 'small', label: 'Pequeño $20', price: 20 },
  { id: 'medium', label: 'Mediano $40', price: 40 },
  { id: 'large', label: 'Grande $60', price: 60 },
]

export default function ServiceCustomizer() {
  const [step, setStep] = useState(1)
  const [spaceType, setSpaceType] = useState('')
  const [cleaningLevel, setCleaningLevel] = useState<'premium' | 'profunda'>('premium')
  const [products, setProducts] = useState(false)
  const [fold, setFold] = useState(false)
  const [patio, setPatio] = useState<PatioSize>('none')
  const [garage, setGarage] = useState<GarageSize>('none')
  const [attic, setAttic] = useState<AtticSize>('none')

  const selectedSpace = spaceTypes.find((s) => s.id === spaceType)
  const basePrice = selectedSpace?.base ?? 0
  const levelPrice = cleaningLevel === 'premium' ? basePrice : Math.round(basePrice * 1.4) + 15
  const productsPrice = products ? Math.round(basePrice * 0.17) : 0
  const foldPrice = fold ? Math.round(basePrice * 0.15) : 0
  const patioPrice = patioOptions.find((p) => p.id === patio)?.price ?? 0
  const garagePrice = garageOptions.find((g) => g.id === garage)?.price ?? 0
  const atticPrice = atticOptions.find((a) => a.id === attic)?.price ?? 0

  const total = useMemo(() => {
    return levelPrice + productsPrice + foldPrice + patioPrice + garagePrice + atticPrice
  }, [levelPrice, productsPrice, foldPrice, patioPrice, garagePrice, atticPrice])

  const canProceed = () => {
    if (step === 1) return !!spaceType
    return true
  }

  const levelLabel = cleaningLevel === 'premium' ? 'Premium' : 'Profunda'

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

            {/* Step labels */}
            <div className="flex justify-between mb-8 text-[10px] text-[rgba(232,240,255,0.4)] px-1 -mt-4">
              <span className={step >= 1 ? 'text-gold' : ''}>Espacio</span>
              <span className={step >= 2 ? 'text-gold' : ''}>Nivel</span>
              <span className={step >= 3 ? 'text-gold' : ''}>Extras</span>
              <span className={step >= 4 ? 'text-gold' : ''}>Resumen</span>
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
                        <span className="ml-1.5 text-xs opacity-70">${st.base}</span>
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

                  <div className="grid sm:grid-cols-2 gap-3">
                    {cleaningLevels.map((cl) => {
                      const isSelected = cleaningLevel === cl.id
                      const price = cl.getPrice(basePrice)
                      return (
                        <button
                          key={cl.id}
                          onClick={() => setCleaningLevel(cl.id as 'premium' | 'profunda')}
                          className={`text-left p-4 rounded-xl transition-all duration-200 ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] shadow-lg shadow-gold/20'
                              : 'glass-card text-[#E8F0FF] hover:border-gold/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-semibold ${isSelected ? 'text-[#0A0F2E]' : 'text-white'}`}>
                              {cl.label}
                            </span>
                            <span className={`font-[family-name:var(--font-montserrat)] font-bold text-lg ${
                              isSelected ? 'text-[#0A0F2E]' : 'text-gold-gradient'
                            }`}>
                              ${price}
                            </span>
                          </div>
                          <p className={`text-xs ${isSelected ? 'text-[#0A0F2E]/70' : 'text-[rgba(232,240,255,0.6)]'}`}>
                            {cl.description}
                          </p>
                        </button>
                      )
                    })}
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
                    Personaliza tu servicio
                  </h3>

                  <div className="space-y-5">
                    {/* Products toggle */}
                    <div className="flex items-center justify-between p-3 rounded-xl glass-card">
                      <div>
                        <span className="text-sm text-[#E8F0FF] font-medium">🧴 Productos de limpieza</span>
                        <p className="text-xs text-[rgba(232,240,255,0.5)]">17% del precio del servicio</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gold font-[family-name:var(--font-montserrat)] font-bold text-sm">
                          +${Math.round(basePrice * 0.17)}
                        </span>
                        <button
                          onClick={() => setProducts(!products)}
                          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                            products ? 'bg-gold' : 'bg-white/20'
                          }`}
                        >
                          <motion.div
                            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
                            animate={{ left: products ? '22px' : '2px' }}
                            transition={{ duration: 0.2 }}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Fold toggle */}
                    <div className="flex items-center justify-between p-3 rounded-xl glass-card">
                      <div>
                        <span className="text-sm text-[#E8F0FF] font-medium">👕 Doblar ropa</span>
                        <p className="text-xs text-[rgba(232,240,255,0.5)]">15% del precio del servicio</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gold font-[family-name:var(--font-montserrat)] font-bold text-sm">
                          +${Math.round(basePrice * 0.15)}
                        </span>
                        <button
                          onClick={() => setFold(!fold)}
                          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                            fold ? 'bg-gold' : 'bg-white/20'
                          }`}
                        >
                          <motion.div
                            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
                            animate={{ left: fold ? '22px' : '2px' }}
                            transition={{ duration: 0.2 }}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Patio select */}
                    <div className="p-3 rounded-xl glass-card">
                      <span className="text-sm text-[#E8F0FF] font-medium block mb-2">🌿 Patio</span>
                      <div className="flex flex-wrap gap-2">
                        {patioOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setPatio(opt.id)}
                            className={`px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                              patio === opt.id
                                ? 'bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] font-semibold'
                                : 'bg-white/5 text-[#E8F0FF] hover:bg-white/10'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Garage select */}
                    <div className="p-3 rounded-xl glass-card">
                      <span className="text-sm text-[#E8F0FF] font-medium block mb-2">🚗 Garage</span>
                      <div className="flex flex-wrap gap-2">
                        {garageOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setGarage(opt.id)}
                            className={`px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                              garage === opt.id
                                ? 'bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] font-semibold'
                                : 'bg-white/5 text-[#E8F0FF] hover:bg-white/10'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Attic select */}
                    <div className="p-3 rounded-xl glass-card">
                      <span className="text-sm text-[#E8F0FF] font-medium block mb-2">🏠 Ático</span>
                      <div className="flex flex-wrap gap-2">
                        {atticOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setAttic(opt.id)}
                            className={`px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                              attic === opt.id
                                ? 'bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] font-semibold'
                                : 'bg-white/5 text-[#E8F0FF] hover:bg-white/10'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
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
                        {selectedSpace?.label || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[rgba(232,240,255,0.7)]">Precio base</span>
                      <span className="text-white">${basePrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[rgba(232,240,255,0.7)]">Nivel de limpieza</span>
                      <span className="text-white">{levelLabel} — ${levelPrice}</span>
                    </div>

                    {products && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[rgba(232,240,255,0.7)]">Productos de limpieza</span>
                        <span className="text-white">+${productsPrice}</span>
                      </div>
                    )}
                    {fold && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[rgba(232,240,255,0.7)]">Doblar ropa</span>
                        <span className="text-white">+${foldPrice}</span>
                      </div>
                    )}
                    {patio !== 'none' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[rgba(232,240,255,0.7)]">
                          Patio {patioOptions.find((p) => p.id === patio)?.label.split(' ')[0]}
                        </span>
                        <span className="text-white">+${patioPrice}</span>
                      </div>
                    )}
                    {garage !== 'none' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[rgba(232,240,255,0.7)]">
                          Garage {garageOptions.find((g) => g.id === garage)?.label.split(' ')[0]} {garageOptions.find((g) => g.id === garage)?.label.split(' ')[1]}
                        </span>
                        <span className="text-white">+${garagePrice}</span>
                      </div>
                    )}
                    {attic !== 'none' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[rgba(232,240,255,0.7)]">
                          Ático {atticOptions.find((a) => a.id === attic)?.label.split(' ')[0]}
                        </span>
                        <span className="text-white">+${atticPrice}</span>
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
                    <p className="text-xs text-[rgba(232,240,255,0.4)] mt-1">Precio sin productos de limpieza{products ? ' (productos incluidos)' : ''}</p>
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
                  disabled={!canProceed()}
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
