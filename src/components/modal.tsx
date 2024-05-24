import React from 'react'

type Props = {
  isOpen: boolean,
  onClose: () => void,
  children: React.ReactNode
}

export function Modal ({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="px-4 py-3 bg-white">
          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              ✖
            </button>
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
