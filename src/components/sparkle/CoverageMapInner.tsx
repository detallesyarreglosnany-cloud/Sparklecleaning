'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

interface Location {
  name: string
  lat: number
  lng: number
}

// Custom gold marker icon
const goldIcon = L.divIcon({
  html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#FFD700"/>
    <circle cx="14" cy="13" r="6" fill="#0A0F2E"/>
    <circle cx="14" cy="13" r="3" fill="#1A3BCC"/>
  </svg>`,
  className: '',
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -36],
})

export default function CoverageMapInner({ locations }: { locations: Location[] }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10">
      <MapContainer
        center={[38.92, -77.07]}
        zoom={10}
        style={{ height: '400px', width: '100%' }}
        scrollWheelZoom={false}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.name} position={[loc.lat, loc.lng]} icon={goldIcon}>
            <Popup>
              <div className="text-center">
                <strong className="text-gold">{loc.name}</strong>
                <br />
                <a
                  href="#agendar"
                  className="text-blue-400 text-xs hover:underline"
                >
                  Agenda aquí →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
