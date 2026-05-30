'use client'

import { useEffect, useRef, useMemo, useState, useCallback } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import * as turf from '@turf/turf'
import { metroLines, metroLinesToGeoJSON } from '@/data/wmata'
import { useLocationContext } from './LocationContext'

// ─── Constants ───────────────────────────────────────────────
const BUFFER_RADIUS_KM = 12
const DC_CENTER: [number, number] = [38.905, -77.03]
const DEFAULT_ZOOM = 11

// ─── Custom User Pin ─────────────────────────────────────────
const userPinIcon = L.divIcon({
  html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#FFD700" filter="url(#glow)"/>
    <circle cx="14" cy="13" r="6" fill="#0A0F2E"/>
    <circle cx="14" cy="13" r="3" fill="#FFD700"/>
  </svg>`,
  className: '',
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -36],
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

// ─── Click Handler ───────────────────────────────────────────
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

// ─── Fly to position ─────────────────────────────────────────
function FlyToPosition({ position }: { position: [number, number] | null }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 0.8 })
    }
  }, [position, map])
  return null
}

// ─── Main Component ─────────────────────────────────────────
export default function CoverageMapInner() {
  const { location, setLocation } = useLocationContext()
  const [selectedPos, setSelectedPos] = useState<[number, number] | null>(null)
  const [isInCoverage, setIsInCoverage] = useState<boolean | null>(null)
  const [findingUser, setFindingUser] = useState(false)

  const handleLocationSelect = useCallback((lat: number, lng: number, inCoverage: boolean) => {
    setSelectedPos([lat, lng])
    setIsInCoverage(inCoverage)
    setLocation({
      lat,
      lng,
      address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
      inCoverage,
      selectedFromMap: true,
    })
  }, [setLocation])

  const handleUseMyLocation = useCallback(() => {
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
  }, [handleLocationSelect])

  // Buffer style
  const bufferStyle = useMemo<L.PathOptions>(() => ({
    color: '#FFD700',
    weight: 1,
    opacity: 0.35,
    fillColor: '#FFD700',
    fillOpacity: 0.04,
    dashArray: '4 3',
  }), [])

  // Metro line style
  const getMetroStyle = useCallback((color: string): L.PathOptions => ({
    color,
    weight: 2.5,
    opacity: 0.8,
    lineCap: 'round',
    lineJoin: 'round',
  }), [])

  return (
    <div className="relative">
      {/* Map Container */}
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
        <MapContainer
          center={DC_CENTER}
          zoom={DEFAULT_ZOOM}
          style={{ height: '440px', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={false}
          className="z-0"
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
              style={getMetroStyle(line.color)}
              onEachFeature={(feature, layer) => {
                layer.bindTooltip(feature.properties?.name || '', {
                  sticky: true,
                  className: 'metro-tooltip',
                  direction: 'top',
                  offset: [0, -4],
                })
              }}
            />
          ))}

          {/* User Pin */}
          {selectedPos && (
            <Marker position={selectedPos} icon={userPinIcon}>
              <Popup>
                <div className="text-center p-1 min-w-[140px]">
                  <div className="font-bold text-xs" style={{ color: isInCoverage ? '#00A651' : '#E4002B' }}>
                    {isInCoverage ? '✅ Dentro de cobertura' : '⚠️ Fuera de cobertura'}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {selectedPos[0].toFixed(4)}, {selectedPos[1].toFixed(4)}
                  </div>
                  {isInCoverage && (
                    <a href="#agendar" className="text-[10px] text-blue-400 hover:underline mt-1 block">
                      Agendar aquí →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          )}

          <MapClickHandler onLocationSelect={handleLocationSelect} />
          <FlyToPosition position={selectedPos} />
        </MapContainer>
      </div>

      {/* Bottom overlay: Location result + actions */}
      <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {selectedPos && (
          <div className={`flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm ${
            isInCoverage
              ? 'bg-green-500/10 border-green-500/20 text-green-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            <span className="text-base">{isInCoverage ? '✅' : '⚠️'}</span>
            <span className="font-semibold text-xs">
              {isInCoverage ? 'Dentro de cobertura' : 'Fuera de cobertura'}
            </span>
            {isInCoverage && (
              <a href="#agendar" className="ml-auto text-[10px] px-3 py-1 rounded-full bg-gradient-to-r from-[#FFE680] to-[#FFB300] text-[#0A0F2E] font-bold shrink-0">
                Agendar
              </a>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleUseMyLocation}
            disabled={findingUser}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass-card text-xs text-[#E8F0FF] hover:border-gold/30 transition-all"
          >
            {findingUser ? (
              <div className="w-3.5 h-3.5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" /></svg>
            )}
            {findingUser ? 'Buscando...' : 'Mi ubicación'}
          </button>
          <span className="text-[10px] text-[rgba(232,240,255,0.3)]">o clic en el mapa</span>
        </div>
      </div>
    </div>
  )
}
