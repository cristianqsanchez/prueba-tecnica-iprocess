import { Fragment, useEffect } from 'react'
import { toast } from 'sonner'
import { usePayments } from '@/hooks/use-payments'
import { APP_STATUS, PAYMENT_STATES } from '@/consts'
import { PaymentCard } from './payment-card'
import { NewPaymentAction } from './new-payment-action'

export function Pagos () {
  const { allIsPaid, payments, handleAddPayment } = usePayments()

  useEffect(() => {
    if (allIsPaid) {
      toast.info(APP_STATUS.ALL_PAID)
    }
  }, [allIsPaid])

  return (
    <main className='flex [&>article]:min-w-[15%] overflow-x-auto mt-8'>
      {payments[0].state !== PAYMENT_STATES.PAID &&
      <NewPaymentAction onClick={() => handleAddPayment(0)} />}

      {payments.map((payment, index) => {
        const isNextAvalible =
          payments[index + 1]?.state !== PAYMENT_STATES.PAID

        return (
          <Fragment key={payment.id}>
            <PaymentCard {...payment} />

            {!allIsPaid && isNextAvalible &&
            <NewPaymentAction onClick={() => handleAddPayment(index + 1)} />}
          </Fragment>
        )
      })}
    </main>
  )
}
