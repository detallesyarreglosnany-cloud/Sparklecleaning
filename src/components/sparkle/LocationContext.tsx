'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface LocationData {
  lat: number | null
  lng: number | null
  address: string
  inCoverage: boolean
  selectedFromMap: boolean
}

const defaultLocation: LocationData = {
  lat: null,
  lng: null,
  address: '',
  inCoverage: false,
  selectedFromMap: false,
}

interface LocationContextType {
  location: LocationData
  setLocation: (loc: LocationData) => void
  clearLocation: () => void
}

const LocationContext = createContext<LocationContextType>({
  location: defaultLocation,
  setLocation: () => {},
  clearLocation: () => {},
})

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationData>(defaultLocation)

  const clearLocation = () => setLocation(defaultLocation)

  return (
    <LocationContext.Provider value={{ location, setLocation, clearLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocationContext() {
  return useContext(LocationContext)
}
