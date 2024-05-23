import { useContext } from 'react'
import { PaymentsSettings } from '@/context/payments-settings'

export function usePaymentsSettings () {
  const {
    amount,
    currency,
    isEditing,
    setIsEditing
  } = useContext(PaymentsSettings)

  const changeToEditingMode = (mode: boolean = true) => setIsEditing(mode)

  return {
    amount,
    currency,
    isEditing,
    changeToEditingMode
  }
}
