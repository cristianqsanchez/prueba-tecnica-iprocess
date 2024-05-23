import { Currency } from '@/types'

export const DEFAULT_SETTINGS = {
  amount: 182,
  currency: 'USD' as Currency
} as const

export const PAYMENT_STATES = {
  PENDING: 'Pending',
  NEXTPAY: 'NextToPay',
  PAID: 'Paid'
} as const
