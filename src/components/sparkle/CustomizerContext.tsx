'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface CustomizerData {
  spaceType: string
  spaceLabel: string
  cleaningLevel: 'premium' | 'profunda'
  cleaningLabel: string
  products: boolean
  fold: boolean
  patio: string
  garage: string
  attic: string
  allergies: string
  observations: string
  petType: string
  petTypeOther: string
  petCount: string
  adults: string
  children: string
  total: number
  eventSpaces?: number
  eventDifficulty?: string
}

const defaultCustomizer: CustomizerData = {
  spaceType: '',
  spaceLabel: '',
  cleaningLevel: 'premium',
  cleaningLabel: 'Premium',
  products: false,
  fold: false,
  patio: 'none',
  garage: 'none',
  attic: 'none',
  allergies: '',
  observations: '',
  petType: '',
  petTypeOther: '',
  petCount: '',
  adults: '',
  children: '',
  total: 0,
  eventSpaces: undefined,
  eventDifficulty: undefined,
}

interface CustomizerContextType {
  customizer: CustomizerData
  setCustomizer: (data: Partial<CustomizerData>) => void
  resetCustomizer: () => void
}

const CustomizerContext = createContext<CustomizerContextType>({
  customizer: defaultCustomizer,
  setCustomizer: () => {},
  resetCustomizer: () => {},
})

export function CustomizerProvider({ children }: { children: ReactNode }) {
  const [customizer, setCustomizerState] = useState<CustomizerData>(defaultCustomizer)

  const setCustomizer = (data: Partial<CustomizerData>) => {
    setCustomizerState((prev) => ({ ...prev, ...data }))
  }

  const resetCustomizer = () => setCustomizerState(defaultCustomizer)

  return (
    <CustomizerContext.Provider value={{ customizer, setCustomizer, resetCustomizer }}>
      {children}
    </CustomizerContext.Provider>
  )
}

export function useCustomizerContext() {
  return useContext(CustomizerContext)
}
