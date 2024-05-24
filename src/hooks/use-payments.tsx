import { useContext, useMemo, useCallback } from 'react'
import { toast } from 'sonner'
import { APP_STATUS, PAYMENT_STATES } from '@/consts'
import { Payment, PaymentMethods } from '@/types'
import { Payments } from '@/context/payments'
import { formatInputDate, randomID } from '@/utils'
import { usePaymentsSettings } from './use-payments-settings'

export function usePayments () {
  const { payments, setPayments } = useContext(Payments)
  const { amount, changeToEditingMode } = usePaymentsSettings()

  const allIsPaid = useMemo(() => {
    return payments.every(({ state }) => state === PAYMENT_STATES.PAID)
  }, [payments])

  // TODO: <POST>: Añadir pago
  const handleAddPayment = useCallback((index: number) => {
    if (allIsPaid) return

    changeToEditingMode()
    setPayments(prevPayments => {
      const updatedPayments = [...prevPayments]
      let newPaymentState = PAYMENT_STATES.PENDING

      if (index === 0) {
        const firstPayment = updatedPayments[0]
        newPaymentState = PAYMENT_STATES.NEXTPAY
        firstPayment.state = PAYMENT_STATES.PENDING
      } else {
        const previousPayment = updatedPayments[index - 1]

        if (previousPayment.state === PAYMENT_STATES.PAID) {
          newPaymentState = PAYMENT_STATES.NEXTPAY
          if (index < updatedPayments.length) {
            updatedPayments[index].state = PAYMENT_STATES.PENDING
          }
        }
      }

      const previousPayment = index !== 0 ? updatedPayments[index - 1] : updatedPayments[0]
      const newPayment: Payment = {
        id: randomID(),
        name: 'Nuevo Pago',
        currency: previousPayment.currency,
        dueDate: formatInputDate(new Date()),
        amount: previousPayment.amount / 2,
        percentage: previousPayment.percentage / 2,
        state: newPaymentState
      }

      previousPayment.amount /= 2
      previousPayment.percentage /= 2

      updatedPayments.splice(index, 0, newPayment)
      return updatedPayments
    })
  }, [allIsPaid, changeToEditingMode, setPayments])

  // TODO: <PATCH>: Manejar Estado de Pago
  const handlePay = (id: string, paymentMethod: PaymentMethods) => {
    setPayments(prevPayments => {
      const updatedPayments = prevPayments.map((payment, index) => {
        if (payment.id === id) {
          payment.state = PAYMENT_STATES.PAID
          payment.paymentMethod = paymentMethod
          if (index < prevPayments.length - 1) {
            prevPayments[index + 1].state = PAYMENT_STATES.NEXTPAY
          }
        }
        return payment
      })
      return updatedPayments
    })
    changeToEditingMode(false)
    toast.success(APP_STATUS.SUCCESS_PAY)
  }

  // TODO: <PATCH>: Actualizar Info de Pago
  const handleChange = (id: string, field: keyof Payment, value: Payment[keyof Payment]) => {
    setPayments(prevPayments => {
      const updatedPayments = prevPayments.map(payment =>
        payment.id === id ? { ...payment, [field]: value } : payment
      )
      return recalculatePercentages(updatedPayments)
    })
  }

  const recalculatePercentages = (payments: Payment[]): Payment[] => {
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0)
    return payments.map(payment => ({
      ...payment,
      percentage: (payment.amount / totalAmount) * 100
    }))
  }

  const updateAmounts = (newCards: Payment[]): Payment[] => {
    return newCards.map(card => ({
      ...card,
      amount: (((card.percentage / 100) * amount))
    }))
  }

  const increasePercentage = (id: string) => {
    setPayments(prevCards => {
      const newCards = [...prevCards]
      const cardIndex = newCards.findIndex(card => card.id === id)
      const nextIndex = cardIndex === 0 ? cardIndex + 1 : cardIndex - 1

      if (newCards[nextIndex].state !== PAYMENT_STATES.PAID) {
        const diff = newCards[cardIndex].percentage < 100 ? 1 : 0
        newCards[cardIndex].percentage += diff
        newCards[nextIndex].percentage -= diff

        newCards[cardIndex].percentage = Math.max(newCards[cardIndex].percentage, 0)
        newCards[nextIndex].percentage = Math.max(newCards[nextIndex].percentage, 0)

        return updateAmounts(newCards)
      }
      return newCards
    })
  }

  const decreasePercentage = (id: string) => {
    setPayments(prevCards => {
      const newCards = [...prevCards]
      const cardIndex = newCards.findIndex(card => card.id === id)
      const nextIndex = cardIndex === 0 ? cardIndex + 1 : cardIndex - 1

      if (newCards[nextIndex].state !== PAYMENT_STATES.PAID) {
        const diff = newCards[cardIndex].percentage > 0 ? 1 : 0
        newCards[cardIndex].percentage -= diff
        newCards[nextIndex].percentage += diff

        newCards[cardIndex].percentage = Math.max(newCards[cardIndex].percentage, 0)
        newCards[nextIndex].percentage = Math.max(newCards[nextIndex].percentage, 0)

        return updateAmounts(newCards)
      }
      return newCards
    })
  }

  return {
    payments,
    setPayments,
    allIsPaid,
    handleAddPayment,
    handlePay,
    handleChange,
    increasePercentage,
    decreasePercentage
  }
}
