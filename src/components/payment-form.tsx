import { usePayments } from '@/hooks/use-payments'
import { Action } from './action'
import { useRef } from 'react'
import { Modal } from './modal'
import { PaymentMethods } from '@/types'
import { formatInputDate } from '@/utils'
import { toast } from 'sonner'
import { APP_STATUS } from '@/consts'

export function PaymentForm({ id, dueDate, isOpen, onClose }:
  { id: string, dueDate: string, isOpen: boolean, onClose: () => void }) {
  const { handlePay } = usePayments()
  const paymentMethodRef = useRef<HTMLSelectElement>(null)

  const handleSave = () => {
    const paymentMethod = paymentMethodRef.current?.value as PaymentMethods

    if (paymentMethod && dueDate !== formatInputDate(new Date())) {
      handlePay(id, paymentMethod)
      onClose()
    }
    toast.warning(APP_STATUS.DEFER_PAYMENT)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col gap-2'>
        <strong className='text-2xl'>Pagar</strong>
        <p>Selecciona metodo de pago.</p>
        <span className='opacity-70'>Estado</span>

        <select className='block w-1/2 p-2.5 rounded-xl' name='' ref={paymentMethodRef}>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>

        <div className='self-end'>
          <Action onClick={() => {
            handleSave()
          }}>Guardar</Action>
        </div>
      </div>
    </Modal>
  )
}
