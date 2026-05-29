'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, Clock, Menu, X, MessageCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#personalizar', label: 'Personalizar' },
  { href: '#precios', label: 'Precios' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#agendar', label: 'Agendar' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top info bar */}
      <div className="hidden md:block bg-[#0D1B4B] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs text-[rgba(232,240,255,0.7)]">
          <div className="flex items-center gap-4">
            <a
              href="tel:+12025550199"
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Phone className="w-3 h-3" />
              (202) 555-0199
            </a>
            <a
              href="https://wa.me/12025550199"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              WhatsApp
            </a>
            <a
              href="mailto:hello@sparkleelite.com"
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Mail className="w-3 h-3" />
              hello@sparkleelite.com
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Lun-Vie: 7am-7pm | Sáb: 8am-5pm
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-xl bg-[#0A0F2E]/90 border-b border-white/10 shadow-lg shadow-[#0A0F2E]/50'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE680" />
                    <stop offset="100%" stopColor="#FFB300" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 2 L38 20 L20 38 L2 20 Z"
                  fill="none"
                  stroke="url(#logoGrad)"
                  strokeWidth="2"
                />
                <circle cx="20" cy="20" r="4" fill="url(#logoGrad)" />
                <path d="M20 8 L21.5 17 L20 15 L18.5 17 Z" fill="#FFD700" opacity="0.8" />
                <path d="M32 20 L23 21.5 L25 20 L23 18.5 Z" fill="#FFD700" opacity="0.8" />
                <path d="M20 32 L18.5 23 L20 25 L21.5 23 Z" fill="#FFD700" opacity="0.8" />
                <path d="M8 20 L17 18.5 L15 20 L17 21.5 Z" fill="#FFD700" opacity="0.8" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-gold-gradient leading-tight">
                SPARKLE ELITE
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[rgba(232,240,255,0.6)] uppercase leading-tight">
                Cleaning
              </span>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-[rgba(232,240,255,0.8)] hover:text-gold transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a href="#agendar">
              <Button className="btn-gold font-[family-name:var(--font-montserrat)] text-sm font-semibold rounded-full px-5 hidden sm:flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Cotizar gratis
              </Button>
            </a>
            <button
              className="lg:hidden p-2 text-[#E8F0FF] hover:text-gold transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[60] w-72 bg-[#0D1B4B]/98 backdrop-blur-xl border-l border-white/10 shadow-2xl"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-8">
                <span className="text-gold-gradient font-[family-name:var(--font-playfair)] text-lg font-bold">
                  Sparkle Elite
                </span>
                <button onClick={() => setIsMobileOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6 text-[#E8F0FF]" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="px-4 py-3 text-[#E8F0FF] hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <a href="tel:+12025550199" className="flex items-center gap-2 text-sm text-[rgba(232,240,255,0.7)]">
                  <Phone className="w-4 h-4 text-gold" />
                  (202) 555-0199
                </a>
                <a href="mailto:hello@sparkleelite.com" className="flex items-center gap-2 text-sm text-[rgba(232,240,255,0.7)]">
                  <Mail className="w-4 h-4 text-gold" />
                  hello@sparkleelite.com
                </a>
              </div>

              <div className="mt-6">
                <a href="#agendar" onClick={() => setIsMobileOpen(false)}>
                  <Button className="btn-gold w-full font-[family-name:var(--font-montserrat)] font-semibold rounded-full">
                    Cotizar gratis
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  )
}
