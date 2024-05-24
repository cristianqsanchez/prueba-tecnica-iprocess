import { PAYMENT_STATES } from '@/consts'

export type State = typeof PAYMENT_STATES[keyof typeof PAYMENT_STATES]

export type Currency = 'USD' | 'COP'

export type PaymentMethods = 'Efectivo' | 'Tarjeta'

export type Payment = {
  id: string
  state: State,
  name: string
  amount: number
  currency: Currency
  percentage: number
  dueDate: string
  paymentMethod?: PaymentMethods
}
