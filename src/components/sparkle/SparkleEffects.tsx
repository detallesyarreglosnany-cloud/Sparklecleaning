'use client'

import { useEffect, useRef, useCallback } from 'react'

/* ───────── Floating sparkle particles ───────── */
export function SparkleParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const w = canvas.offsetWidth
    const h = canvas.offsetHeight

    interface Spark {
      x: number
      y: number
      size: number
      opacity: number
      speed: number
      phase: number
      twinkleSpeed: number
    }

    const sparkles: Spark[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      sparkles.forEach((s) => {
        s.y -= s.speed
        s.phase += s.twinkleSpeed
        const twinkle = Math.sin(s.phase) * 0.5 + 0.5
        const currentOpacity = s.opacity * twinkle

        if (s.y < -5) {
          s.y = h + 5
          s.x = Math.random() * w
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 215, 0, ${currentOpacity})`
        ctx.fill()

        // Cross sparkle shape for larger particles
        if (s.size > 1.5) {
          ctx.beginPath()
          ctx.moveTo(s.x - s.size * 2, s.y)
          ctx.lineTo(s.x + s.size * 2, s.y)
          ctx.moveTo(s.x, s.y - s.size * 2)
          ctx.lineTo(s.x, s.y + s.size * 2)
          ctx.strokeStyle = `rgba(255, 230, 128, ${currentOpacity * 0.4})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()
  }, [])

  useEffect(() => {
    draw()
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}

/* ───────── Floating soap bubbles ───────── */
export function SoapBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-bubble"
          style={{
            width: `${Math.random() * 30 + 10}px`,
            height: `${Math.random() * 30 + 10}px`,
            left: `${Math.random() * 100}%`,
            bottom: '-5%',
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(26,59,204,0.08), rgba(255,215,0,0.05))`,
            border: '1px solid rgba(255,255,255,0.1)',
            animationDuration: `${Math.random() * 10 + 8}s`,
            animationDelay: `${Math.random() * 10}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in',
          }}
        />
      ))}
    </div>
  )
}

/* ───────── Animated counter hook ───────── */
export function useCounter(end: number, duration: number = 2000) {
  const countRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = countRef.current
    if (!el || hasAnimated.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const startTime = performance.now()

          const step = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.floor(eased * end)
            el.textContent = current.toLocaleString()
            if (progress < 1) requestAnimationFrame(step)
          }

          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return countRef
}

/* ───────── Glow orbs for hero background ───────── */
export function GlowOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-float opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(26,59,204,0.6), transparent 70%)',
          top: '-10%',
          right: '-10%',
          animationDuration: '8s',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-float opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(44,79,224,0.5), transparent 70%)',
          bottom: '10%',
          left: '-5%',
          animationDuration: '10s',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full animate-float opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.3), transparent 70%)',
          top: '40%',
          left: '50%',
          animationDuration: '12s',
          animationDelay: '4s',
        }}
      />
    </div>
  )
}

/* ───────── Scroll reveal wrapper ───────── */
import { motion, useInView } from 'framer-motion'
import { useRef as useReff } from 'react'

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useReff<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
