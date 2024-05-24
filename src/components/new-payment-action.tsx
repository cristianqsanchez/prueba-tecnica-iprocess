import PlusIcon from '@/assets/plus.svg'
import { ButtonHTMLAttributes } from 'react'

export function NewPaymentAction (props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className='p-2 rounded-full bg-neutral min-w-10 min-h-10 size-fit' {...props}>
      <img src={PlusIcon} className='m-auto' />
    </button>
  )
}
