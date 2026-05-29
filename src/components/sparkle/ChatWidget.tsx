'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Calculator, Calendar, Heart } from 'lucide-react'

const quickLinks = [
  {
    icon: Calculator,
    label: 'Cotización rápida',
    href: '#personalizar',
    color: 'text-gold',
  },
  {
    icon: Calendar,
    label: 'Agendar servicio',
    href: '#agendar',
    color: 'text-[#2C4FE0]',
  },
  {
    icon: Heart,
    label: 'Hablar con un humano',
    href: 'https://wa.me/12025550199',
    external: true,
    color: 'text-[#25D366]',
  },
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute bottom-16 left-0 w-64 glass-card rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-white">
                ¿En qué te ayudamos?
              </span>
              <button onClick={() => setIsOpen(false)} aria-label="Close">
                <X className="w-4 h-4 text-[rgba(232,240,255,0.5)] hover:text-white transition-colors" />
              </button>
            </div>

            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onClick={() => !link.external && setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <link.icon className={`w-4 h-4 ${link.color}`} />
                  <span className="text-sm text-[#E8F0FF] group-hover:text-gold transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full btn-glow flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Quick actions"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Sparkles className="w-5 h-5 text-white" />
        )}
      </motion.button>
    </div>
  )
}
