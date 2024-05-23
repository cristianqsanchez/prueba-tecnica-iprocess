import { ButtonHTMLAttributes, useState } from 'react'
import { PAYMENT_STATES } from '@/consts'
import { State } from '@/types'
import EditIcon from '@/assets/edit.svg'

type Props = {
  state: State
} & ButtonHTMLAttributes<HTMLButtonElement>

export function PaymentState ({ state, ...props }: Props) {
  const [isHover, setIsHover] = useState(false)
  const variants: Record<State, string> = {
    NextToPay: 'bg-white border-primary p-4',
    Paid: 'bg-success p-3 border-success text-2xl',
    Pending: 'bg-neutral p-6'
  }

  const variant = variants[state]

  return (
      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`rounded-full border-[3px] mb-2 size-16 ${variant}`}
        {...props}
      >
        {state === PAYMENT_STATES.PAID && '🎉'}
        {state === PAYMENT_STATES.NEXTPAY &&
          isHover &&
          <img src={EditIcon} className='m-auto' />}
      </button>
  )
}
