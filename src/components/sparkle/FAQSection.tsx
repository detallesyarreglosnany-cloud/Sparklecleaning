'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  HelpCircle,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  Clock,
  DollarSign,
} from 'lucide-react'
import { ScrollReveal } from './SparkleEffects'

interface FAQItem {
  question: string
  answer: string
  icon: React.ElementType
  highlight?: boolean
}

const faqItems: FAQItem[] = [
  {
    question: '¿Qué pasa si cancelo mi limpieza?',
    answer:
      'Si cancelas con menos de 6 horas de anticipación, el depósito no se devuelve. Para reservas de $30 o $40 (Casa, Evento, Oficina o Casa Grande), tienes derecho a un reagendamiento gratis. Para reservas de $15 (Habitación, Studio, Airbnb, Apartamento o Airbnb Express), no se devuelve el depósito y debes realizar un nuevo agendamiento.',
    icon: AlertTriangle,
    highlight: true,
  },
  {
    question: '¿Qué pasa si la cancelación es por parte de Sparkle Elite?',
    answer:
      'Si nosotros cancelamos, se devuelve el 100% del depósito y quedas con prioridad para reagendar sin costo adicional.',
    icon: ShieldCheck,
  },
  {
    question: '¿Puedo reagendar mi limpieza?',
    answer:
      'Sí. Con más de 6 horas, reagendas sin problema. Con menos de 6 horas, $30/$40 depósito = 1 reagendamiento gratis. $15 depósito = nuevo agendamiento.',
    icon: RefreshCw,
  },
  {
    question: '¿Cuánto cuesta el depósito de agendamiento?',
    answer:
      'Habitación/Studio/Airbnb/Apartamento/Airbnb Express: $15. Casa/Evento/Oficina: $30. Casa Grande: $40. Se descuenta del total.',
    icon: DollarSign,
  },
  {
    question: '¿El descuento de 20% tiene condiciones?',
    answer:
      'Primera limpieza > $100, mismo espacio, dentro de 30 días. Se aplica automáticamente.',
    icon: RefreshCw,
  },
  {
    question: '¿Qué incluye el servicio Premium?',
    answer:
      'Cambio de sábanas, aspirado, lavado de baños, mopeo, retiro de polvo, horno/estufa, refrigerador, campana, basura, organización, ventanas pequeñas. Airbnb incluye cambio de toallas. Productos son extra.',
    icon: HelpCircle,
  },
  {
    question: '¿En qué zonas ofrecen servicio?',
    answer:
      'DC, Arlington, Alexandria, Fairfax VA, Bethesda, Silver Spring, Rockville MD.',
    icon: Clock,
  },
]

function FAQCard({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  const Icon = item.icon

  return (
    <div
      className={`rounded-xl transition-all duration-300 ${
        item.highlight
          ? 'border-2 border-gold/40 bg-gradient-to-b from-gold/5 to-transparent'
          : 'glass-card'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 p-4 md:p-5 text-left"
        aria-expanded={isOpen}
      >
        <div
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
            item.highlight
              ? 'bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E]'
              : 'bg-white/5 text-gold'
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={`font-[family-name:var(--font-montserrat)] text-sm md:text-base font-semibold ${
                item.highlight ? 'text-gold' : 'text-white'
              }`}
            >
              {item.question}
            </h4>
            {item.highlight && (
              <span className="shrink-0 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-semibold text-gold">
                IMPORTANTE
              </span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 mt-1"
        >
          <ChevronDown
            className={`w-5 h-5 transition-colors ${isOpen ? 'text-gold' : 'text-[rgba(232,240,255,0.4)]'}`}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 pb-4 md:pb-5 pl-15 md:pl-16">
              <p className="text-sm text-[rgba(232,240,255,0.7)] leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-dark py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3">
              Preguntas <span className="text-gold-gradient">frecuentes</span>
            </h2>
            <p className="text-[rgba(232,240,255,0.7)]">
              Todo lo que necesitas saber sobre nuestros servicios y políticas.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <FAQCard
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
