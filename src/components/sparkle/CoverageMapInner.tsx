'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import * as turf from '@turf/turf'
import { metroLines, metroLinesToGeoJSON } from '@/data/wmata'
import { useLocationContext } from './LocationContext'

// ─── Constants ───────────────────────────────────────────────
const BUFFER_RADIUS_KM = 12
const DC_CENTER: [number, number] = [38.92, -77.07]
const DEFAULT_ZOOM = 10

// ─── Custom Icons ────────────────────────────────────────────
const userPinIcon = L.divIcon({
  html: `<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <path d="M16 0C7.164 0 0 7.164 0 16c0 12 16 26 16 26s16-14 16-26C32 7.164 24.836 0 16 0z" fill="#FFD700" filter="url(#glow)"/>
    <circle cx="16" cy="15" r="7" fill="#0A0F2E"/>
    <circle cx="16" cy="15" r="4" fill="#FFD700"/>
  </svg>`,
  className: '',
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42],
})

const stationDotIcon = L.divIcon({
  html: `<div style="width:6px;height:6px;background:#FFD700;border-radius:50%;border:1px solid rgba(255,215,0,0.5);box-shadow:0 0 4px rgba(255,215,0,0.3)"></div>`,
  className: '',
  iconSize: [6, 6],
  iconAnchor: [3, 3],
})

// ─── Compute 12km Buffer once ───────────────────────────────
function computeBufferGeoJSON(): GeoJSON.Feature | null {
  try {
    const fc = metroLinesToGeoJSON()
    const merged = turf.combine(fc)
    if (!merged.features[0]) return null
    const buffered = turf.buffer(merged.features[0], BUFFER_RADIUS_KM, { units: 'kilometers' })
    return buffered
  } catch {
    return null
  }
}

const bufferFeature = computeBufferGeoJSON()

// ─── Click Handler Component ────────────────────────────────
function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number, inCoverage: boolean) => void }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      const pt = turf.point([lng, lat])
      let inCoverage = false
      if (bufferFeature) {
        try {
          inCoverage = turf.booleanPointInPolygon(pt, bufferFeature as turf.Feature<turf.Polygon | turf.MultiPolygon>)
        } catch {
          inCoverage = false
        }
      }
      onLocationSelect(lat, lng, inCoverage)
    },
  })
  return null
}

// ─── Recenter Control ────────────────────────────────────────
function RecenterControl({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, DEFAULT_ZOOM, { animate: true })
  }, [center, map])
  return null
}

// ─── Main Component ─────────────────────────────────────────
export default function CoverageMapInner() {
  const { location, setLocation } = useLocationContext()
  const [selectedPos, setSelectedPos] = useState<[number, number] | null>(null)
  const [isInCoverage, setIsInCoverage] = useState<boolean | null>(null)
  const [findingUser, setFindingUser] = useState(false)
  const mapRef = useRef<L.Map | null>(null)

  const handleLocationSelect = (lat: number, lng: number, inCoverage: boolean) => {
    setSelectedPos([lat, lng])
    setIsInCoverage(inCoverage)
    setLocation({
      lat,
      lng,
      address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
      inCoverage,
      selectedFromMap: true,
    })
  }

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return
    setFindingUser(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        const pt = turf.point([lng, lat])
        let inCoverage = false
        if (bufferFeature) {
          try {
            inCoverage = turf.booleanPointInPolygon(pt, bufferFeature as turf.Feature<turf.Polygon | turf.MultiPolygon>)
          } catch { /* ignore */ }
        }
        handleLocationSelect(lat, lng, inCoverage)
        setFindingUser(false)
      },
      () => setFindingUser(false),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  // Buffer GeoJSON style
  const bufferStyle: L.PathOptions = useMemo(() => ({
    color: '#FFD700',
    weight: 1.5,
    opacity: 0.4,
    fillColor: '#FFD700',
    fillOpacity: 0.06,
    dashArray: '6 4',
  }), [])

  // Metro line style factory
  const metroLineStyle = (color: string): L.PathOptions => ({
    color,
    weight: 3,
    opacity: 0.85,
    lineCap: 'round',
    lineJoin: 'round',
  })

  return (
    <div className="relative">
      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30">
        <MapContainer
          center={DC_CENTER}
          zoom={DEFAULT_ZOOM}
          style={{ height: '520px', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={false}
          className="z-0"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* 12km Buffer Zone */}
          {bufferFeature && (
            <GeoJSON key="buffer-zone" data={bufferFeature as any} style={bufferStyle} />
          )}

          {/* Metro Lines */}
          {metroLines.map((line) => (
            <GeoJSON
              key={line.id}
              data={{
                type: 'Feature',
                properties: { name: line.name, color: line.color },
                geometry: { type: 'LineString', coordinates: line.coordinates },
              } as any}
              style={metroLineStyle(line.color)}
              onEachFeature={(feature, layer) => {
                layer.bindTooltip(feature.properties?.name || '', {
                  sticky: true,
                  className: 'metro-tooltip',
                  direction: 'top',
                  offset: [0, -5],
                })
              }}
            />
          ))}

          {/* User Selected Pin */}
          {selectedPos && (
            <Marker position={selectedPos} icon={userPinIcon}>
              <Popup>
                <div className="text-center p-1">
                  <div className="font-bold text-sm" style={{ color: isInCoverage ? '#00A651' : '#E4002B' }}>
                    {isInCoverage ? '✅ Dentro de cobertura' : '⚠️ Fuera de cobertura'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {selectedPos[0].toFixed(5)}, {selectedPos[1].toFixed(5)}
                  </div>
                  {isInCoverage && (
                    <a href="#agendar" className="text-xs text-blue-400 hover:underline mt-1 block">
                      Agendar limpieza aquí →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Map Interactions */}
          <MapClickHandler onLocationSelect={handleLocationSelect} />
          {selectedPos && <RecenterControl center={selectedPos} />}
        </MapContainer>

        {/* Zoom controls custom overlay */}
        <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
          <button
            onClick={() => mapRef.current?.zoomIn()}
            className="w-9 h-9 rounded-lg bg-[#0D1B4B]/90 border border-white/10 text-white flex items-center justify-center hover:bg-gold/20 transition-colors text-lg font-bold"
          >
            +
          </button>
          <button
            onClick={() => mapRef.current?.zoomOut()}
            className="w-9 h-9 rounded-lg bg-[#0D1B4B]/90 border border-white/10 text-white flex items-center justify-center hover:bg-gold/20 transition-colors text-lg font-bold"
          >
            −
          </button>
        </div>
      </div>

      {/* Floating status bar */}
      {selectedPos && (
        <div className={`mt-4 p-4 rounded-xl border flex items-center justify-between gap-4 ${
          isInCoverage
            ? 'bg-green-500/10 border-green-500/20'
            : 'bg-red-500/10 border-red-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isInCoverage ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              <span className="text-lg">{isInCoverage ? '✅' : '⚠️'}</span>
            </div>
            <div>
              <p className={`text-sm font-semibold ${isInCoverage ? 'text-green-400' : 'text-red-400'}`}>
                {isInCoverage ? '¡Estás dentro de nuestra zona de cobertura!' : 'Esta ubicación está fuera de cobertura'}
              </p>
              <p className="text-xs text-[rgba(232,240,255,0.5)]">
                {selectedPos[0].toFixed(5)}, {selectedPos[1].toFixed(5)}
              </p>
            </div>
          </div>
          {isInCoverage && (
            <a
              href="#agendar"
              className="shrink-0 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] text-xs font-bold hover:shadow-lg hover:shadow-gold/20 transition-all"
            >
              Agendar aquí
            </a>
          )}
        </div>
      )}

      {/* Use My Location button */}
      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          onClick={handleUseMyLocation}
          disabled={findingUser}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-sm text-[#E8F0FF] hover:border-gold/30 transition-all"
        >
          {findingUser ? (
            <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" /></svg>
          )}
          {findingUser ? 'Localizando...' : 'Usar mi ubicación actual'}
        </button>
        <span className="text-[10px] text-[rgba(232,240,255,0.3)]">o haz clic en el mapa</span>
      </div>
    </div>
  )
}
