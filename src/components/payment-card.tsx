import React from 'react'
import { PAYMENT_STATES } from '@/consts'
import { Payment as PaymentProps } from '@/types'
import { usePayments } from '@/hooks/use-payments'
import { usePaymentsSettings } from '@/hooks/use-payments-settings'
import { formatInputDate } from '@/utils'
import { useModal } from '@/hooks/use-modal'
import { PaymentState } from './payment-state'
import { PaymentForm } from './payment-form'
import { PaymentPercentage } from './payment-percentage'

export function PaymentCard (payment: PaymentProps) {
  const { isEditing, amount } = usePaymentsSettings()
  const { isModalOpen, openModal, closeModal } = useModal()
  const { handleChange } = usePayments()

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    const amountValue = parseFloat(value)

    const sanitizedAmount = isNaN(amountValue) ? 0 : amountValue

    handleChange(payment.id, 'amount', sanitizedAmount)
  }

  return (
    <article className='flex flex-col items-center gap-2'>
      <PaymentState state={payment.state} onClick={openModal} />
      <PaymentForm id={payment.id} isOpen={isModalOpen} onClose={closeModal} />
        <input
          type="text"
          value={payment.name}
          readOnly={!isEditing || payment.state === PAYMENT_STATES.PAID}
          onChange={(e) => handleChange(payment.id, 'name', e.target.value)}
          className='text-xl font-semibold text-center'
        />

        <input
          type="number"
          value={payment.amount.toFixed(1)}
          max={amount}
          min={0}
          readOnly={!isEditing || payment.state === PAYMENT_STATES.PAID}
          onChange={handleAmountChange}
        />

        {isEditing &&
        <PaymentPercentage id={payment.id} percentage={payment.percentage}/>}

        {payment.state === PAYMENT_STATES.PAID
          ? <span className='text-success font-semibold'>Pagado {new Date(payment.dueDate).toLocaleDateString('es', { year: 'numeric', month: 'short', day: 'numeric' })} <br /> con {payment.paymentMethod}</span>
          : <input
          type="date"
          value={payment.dueDate}
          min={formatInputDate(new Date())}
          readOnly={!isEditing}
          onChange={(e) => handleChange(payment.id, 'dueDate', e.target.value)}
        />
        }

    </article>
  )
}
