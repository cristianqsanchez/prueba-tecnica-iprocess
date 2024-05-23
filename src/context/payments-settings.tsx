import React, { createContext, useState } from 'react'
import { Currency } from '@/types'

type PaymentsSettingsProps = {
  amount: number
  currency: Currency
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const PaymentsSettings = createContext<PaymentsSettingsProps>({
  amount: 0,
  currency: 'USD',
  isEditing: false,
  setIsEditing: () => false
})

export function PaymentsSettingsProvider ({
  children,
  amount,
  currency
}: { children: React.ReactNode, amount: number, currency: Currency }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <PaymentsSettings.Provider value={{
      amount,
      currency,
      isEditing,
      setIsEditing
    }}>
      {children}
    </PaymentsSettings.Provider>
  )
}
