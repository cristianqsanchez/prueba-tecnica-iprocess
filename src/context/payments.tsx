import React, { createContext, useState } from 'react'
import { Payment } from '@/types'
import { formatInputDate, randomID } from '@/utils'
import { PAYMENT_STATES } from '@/consts'

type PaymentsProps = {
  payments: Payment[]
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>
}

export const Payments = createContext<PaymentsProps>({
  payments: [],
  setPayments: () => {}
})

export function PaymentsProvider ({ children } : {children: React.ReactNode}) {
  const [payments, setPayments] = useState<PaymentsProps['payments']>([{
    id: randomID(),
    amount: 182,
    currency: 'USD',
    dueDate: formatInputDate(new Date()),
    state: PAYMENT_STATES.NEXTPAY,
    name: 'Anticipo',
    percentage: 100
  }])
  return (
    <Payments.Provider value={{ payments, setPayments }}>
      {children}
    </Payments.Provider>
  )
}
