export type Currency = 'USD' | 'COP'

export type Payment = {
  id: string
  isPaid: boolean
  name: string
  amount: number
  currency: Currency
  percentage: number
  dueDate: string
}
