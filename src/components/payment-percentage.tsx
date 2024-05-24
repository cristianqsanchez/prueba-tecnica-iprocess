import React from 'react'
import { usePayments } from '@/hooks/use-payments'

function PercentageAction ({ action, children }:
  { action: () => void, children: React.ReactNode }) {
  return (
      <button
        onClick={action}
        className='rounded-full size-8 border-2 border-primary-light p-2 grid place-content-center text-primary-light font-bold'
      >
        {children}
      </button>
  )
}

export function PaymentPercentage ({ id, percentage }: { id: string, percentage: number }) {
  const { increasePercentage, decreasePercentage, handleChange } = usePayments()
  return (
    <div className="flex items-center gap-2">
      <PercentageAction action={() => decreasePercentage(id)}>
        -
      </PercentageAction>
      <div className='flex items-center justify-center'>
        <input
          type="number"
          value={percentage.toFixed()}
          min={0}
          max={100}
          onChange={(e) => handleChange(id, 'percentage', e.target.value)}
          className="text-center"
        />
        <span>%</span>
      </div>
      <PercentageAction action={() => increasePercentage(id)}>
        +
      </PercentageAction>
    </div>
  )
}
