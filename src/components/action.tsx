import React from 'react'

type Props = {
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Action ({ children, ...props }: Props) {
  return (
    <button className='text-white font-semibold rounded-xl py-2 px-4 size-fit bg-primary' {...props}>
      {children}
    </button>
  )
}
