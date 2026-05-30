'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ScrollReveal } from './SparkleEffects'
import { ChevronDown, ChevronUp, Upload, Clock, CheckCircle2, MapPin, Navigation, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { useLocationContext } from './LocationContext'

const timeSlots = [
  { id: 'morning', label: 'Mañana', time: '7:00 - 11:00 AM', emoji: '🌅' },
  { id: 'midday', label: 'Mediodía', time: '11:00 AM - 3:00 PM', emoji: '☀️' },
  { id: 'afternoon', label: 'Tarde', time: '3:00 - 7:00 PM', emoji: '🌆' },
]

const serviceTypes = [
  'Habitación ($75)',
  'Studio ($95)',
  'Apartamento ($130)',
  'Casa ($180)',
  'Airbnb ($95)',
  'Oficina ($80)',
  'Evento ($250)',
  'Casa Grande ($390)',
  'Airbnb Express ($80)',
]

export default function BookingSection() {
  const { location } = useLocationContext()

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [zelleChecked, setZelleChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Location fields
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState('')
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'in-area' | 'out-area'>('idle')

  // Sync location from map
  useEffect(() => {
    if (location.selectedFromMap && location.lat && location.lng) {
      setCoordinates(`${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`)
      setGeoStatus(location.inCoverage ? 'in-area' : 'out-area')
      if (!address) {
        setAddress(location.address)
      }
    }
  }, [location.selectedFromMap, location.lat, location.lng, location.inCoverage])

  // Handle manual geolocation
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Tu navegador no soporta geolocalización.')
      return
    }
    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setCoordinates(`${lat.toFixed(6)}, ${lng.toFixed(6)}`)
        // Check against DC area
        if (lat >= 38.7 && lat <= 39.2 && lng >= -77.5 && lng <= -76.9) {
          setGeoStatus('in-area')
        } else {
          setGeoStatus('out-area')
        }
      },
      () => {
        toast.error('No se pudo obtener tu ubicación.')
        setGeoStatus('idle')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !timeSlot || !name || !phone || !email || !serviceType) {
      toast.error('Por favor completa todos los campos requeridos.')
      return
    }

    if (!zelleChecked) {
      toast.error('Por favor confirma el depósito por Zelle.')
      return
    }

    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))

    toast.success('¡Reserva recibida! Te contactaremos pronto para confirmar.', {
      duration: 5000,
    })

    setIsSubmitting(false)
    setDate(undefined)
    setTimeSlot('')
    setName('')
    setPhone('')
    setEmail('')
    setServiceType('')
    setNotes('')
    setZelleChecked(false)
    setAddress('')
    setCoordinates('')
    setGeoStatus('idle')
  }

  return (
    <section id="agendar" className="section-dark py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3">
              Agenda tu limpieza <span className="text-gold-gradient">ahora</span>
            </h2>
            <p className="text-[rgba(232,240,255,0.7)]">
              En menos de 30 segundos, reserva tu fecha.
            </p>
          </div>
        </ScrollReveal>

        {/* Location from map banner */}
        {location.selectedFromMap && location.inCoverage && (
          <ScrollReveal delay={0.05}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-gold/10 border border-gold/20 flex items-start gap-3"
            >
              <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white font-semibold">
                  Ubicación recibida del mapa
                </p>
                <p className="text-xs text-[rgba(232,240,255,0.7)] mt-0.5">
                  Coordenadas: {location.lat?.toFixed(5)}, {location.lng?.toFixed(5)} · Zona con cobertura confirmada
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit}>
            <div className="glass-card rounded-2xl p-5 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* LEFT: Calendar, Time & Location */}
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white mb-4">
                    Selecciona fecha, hora y ubicación
                  </h3>

                  <div className="rounded-xl bg-white/5 border border-white/10 p-3 mb-5 inline-block">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={{ before: new Date() }}
                      className="text-white"
                      classNames={{
                        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                        month: 'space-y-4',
                        caption: 'flex justify-center pt-1 relative items-center text-white',
                        caption_label: 'text-sm font-medium text-white',
                        nav: 'space-x-1 flex items-center',
                        nav_button:
                          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity:100 text-white inline-flex items-center justify-center rounded-md',
                        nav_button_previous: 'absolute left-1',
                        nav_button_next: 'absolute right-1',
                        table: 'w-full border-collapse space-y-1',
                        head_row: 'flex',
                        head_cell: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
                        row: 'flex w-full mt-2',
                        cell: 'text-center text-sm p-0 relative',
                        day: 'h-8 w-8 p-0 font-normal text-white hover:bg-white/10 rounded-md inline-flex items-center justify-center',
                        day_selected:
                          'bg-gradient-to-r from-[#1A3BCC] to-[#2C4FE0] text-white hover:bg-gradient-to-r hover:from-[#1A3BCC] hover:to-[#2C4FE0]',
                        day_today: 'bg-white/10 text-gold font-semibold',
                        day_outside: 'text-white/20 opacity-50',
                        day_disabled: 'text-white/20 opacity-30',
                        day_range_middle: 'aria-selected:bg-accent',
                        day_hidden: 'invisible',
                      }}
                    />
                  </div>

                  {/* Time slots */}
                  <h4 className="text-sm font-semibold text-[rgba(232,240,255,0.8)] mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold" />
                    Horario preferido
                  </h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {timeSlots.map((ts) => (
                      <button
                        key={ts.id}
                        type="button"
                        onClick={() => setTimeSlot(ts.id)}
                        className={`rounded-xl p-3 text-center transition-all duration-200 ${
                          timeSlot === ts.id
                            ? 'bg-gradient-to-r from-[#1A3BCC] to-[#2C4FE0] text-white shadow-lg shadow-[#1A3BCC]/30'
                            : 'glass-card text-[#E8F0FF] hover:border-gold/20'
                        }`}
                      >
                        <span className="text-lg block mb-1">{ts.emoji}</span>
                        <span className="text-xs font-semibold block">{ts.label}</span>
                        <span className="text-[10px] text-[rgba(232,240,255,0.6)] block">{ts.time}</span>
                      </button>
                    ))}
                  </div>

                  {/* Location Section */}
                  <h4 className="text-sm font-semibold text-[rgba(232,240,255,0.8)] mb-3 flex items-center gap-2 mt-5">
                    <MapPin className="w-4 h-4 text-gold" />
                    Ubicación del servicio
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-[rgba(232,240,255,0.6)] mb-1 block">Dirección</Label>
                      <Input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Main St, Arlington, VA 22201"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-[rgba(232,240,255,0.6)] mb-1 block">Coordenadas</Label>
                      <div className="flex gap-2">
                        <Input
                          value={coordinates}
                          onChange={(e) => setCoordinates(e.target.value)}
                          placeholder="38.90720, -77.03690"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50 flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleUseMyLocation}
                          disabled={geoStatus === 'loading'}
                          className="bg-white/5 border-white/10 text-[rgba(232,240,255,0.7)] hover:bg-white/10 hover:text-white shrink-0"
                        >
                          {geoStatus === 'loading' ? (
                            <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Navigation className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Coverage badge */}
                    {geoStatus !== 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${
                          geoStatus === 'in-area'
                            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                            : geoStatus === 'out-area'
                            ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                            : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {geoStatus === 'in-area' && (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Zona de cobertura confirmada
                          </>
                        )}
                        {geoStatus === 'out-area' && (
                          <>
                            <MapPin className="w-3.5 h-3.5" />
                            Fuera de zona de cobertura, contáctanos
                          </>
                        )}
                        {geoStatus === 'loading' && (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                            Obteniendo ubicación...
                          </>
                        )}
                      </motion.div>
                    )}

                    {/* Link to map if no location */}
                    {geoStatus === 'idle' && !location.selectedFromMap && (
                      <div className="text-xs text-[rgba(232,240,255,0.4)] flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>¿No sabes si cubrimos tu zona?</span>
                        <a href="#cobertura" className="text-gold hover:underline">Ver mapa</a>
                      </div>
                    )}
                  </div>

                  {/* Selected summary */}
                  {date && timeSlot && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 rounded-xl bg-gold/10 border border-gold/20"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        <span className="text-white">
                          {date.toLocaleDateString('es-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                          })}
                          {' · '}
                          {timeSlots.find((t) => t.id === timeSlot)?.label}
                        </span>
                      </div>
                      {coordinates && (
                        <div className="flex items-center gap-2 text-xs mt-1">
                          <MapPin className="w-3 h-3 text-gold" />
                          <span className="text-[rgba(232,240,255,0.7)]">{coordinates}</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* RIGHT: Form */}
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white mb-4">
                    Tus datos
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="booking-name" className="text-sm text-[rgba(232,240,255,0.8)]">
                        Nombre completo
                      </Label>
                      <Input
                        id="booking-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="booking-phone" className="text-sm text-[rgba(232,240,255,0.8)]">
                        WhatsApp / Teléfono
                      </Label>
                      <Input
                        id="booking-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(202) 555-0199"
                        className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="booking-email" className="text-sm text-[rgba(232,240,255,0.8)]">
                        Email
                      </Label>
                      <Input
                        id="booking-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50"
                      />
                    </div>

                    <div>
                      <Label className="text-sm text-[rgba(232,240,255,0.8)]">Tipo de servicio</Label>
                      <Select value={serviceType} onValueChange={setServiceType}>
                        <SelectTrigger className="mt-1.5 bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0D1B4B] border-white/10">
                          {serviceTypes.map((st) => (
                            <SelectItem key={st} value={st} className="text-white focus:bg-white/10 focus:text-white">
                              {st}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Collapsible notes */}
                    <button
                      type="button"
                      onClick={() => setShowNotes(!showNotes)}
                      className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors"
                    >
                      {showNotes ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      Notas especiales
                    </button>

                    {showNotes && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <Textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Instrucciones especiales, acceso al edificio, mascotas, etc."
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50 min-h-[80px]"
                        />
                      </motion.div>
                    )}

                    {/* Zelle payment */}
                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FFE680] to-[#FFB300] flex items-center justify-center text-[#0A0F2E] font-bold text-sm">
                          $
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            Depósito para reservar
                          </div>
                          <div className="text-xs text-[rgba(232,240,255,0.6)]">
                            Se descuenta del total del servicio
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-[rgba(232,240,255,0.7)] mb-3 space-y-1">
                        <p>
                          <strong className="text-white">Zelle a:</strong> hello@sparkleelite.com
                        </p>
                        <p>
                          <strong className="text-white">O al teléfono:</strong> (202) 555-0199
                        </p>
                      </div>

                      <button
                        type="button"
                        className="flex items-center gap-2 text-xs text-gold hover:text-gold-light transition-colors mb-3"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Subir comprobante de pago (opcional)
                      </button>

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="zelle-check"
                          checked={zelleChecked}
                          onCheckedChange={(checked) => setZelleChecked(checked === true)}
                          className="mt-0.5 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                        />
                        <label htmlFor="zelle-check" className="text-xs text-[rgba(232,240,255,0.8)] cursor-pointer">
                          Confirmo que he enviado el depósito por Zelle
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full font-[family-name:var(--font-montserrat)] font-semibold rounded-full py-6 text-base mt-6"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#0A0F2E] border-t-transparent rounded-full animate-spin" />
                        Procesando...
                      </div>
                    ) : (
                      'Confirmar reserva'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}
