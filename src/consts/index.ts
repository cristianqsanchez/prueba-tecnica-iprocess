import { Currency } from '@/types'

export const DEFAULT_SETTINGS = {
  amount: 182,
  currency: 'USD' as Currency
} as const

export const PAYMENT_STATES = {
  PENDING: 'Pending',
  NEXTPAY: 'NextToPay',
  PAID: 'Paid'
}

export const APP_STATUS = {
  ALL_PAID: '¡Todos tus pagos fueron realizados!',
  SUCCESS_PAY: 'Pago Realizado',
  DEFER_PAYMENT: 'Aun quedan días para tu pago'
} as const
