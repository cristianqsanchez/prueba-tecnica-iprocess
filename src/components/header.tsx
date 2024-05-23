import { usePaymentsSettings } from '@/hooks/use-payments-settings'
import EditIcon from '@/assets/edit.svg'
import { Action } from './action'

export function Header () {
  const {
    amount,
    currency,
    isEditing,
    changeToEditingMode
  } = usePaymentsSettings()

  return (
    <header className="flex justify-between items-center py-4">
      <strong className='text-2xl'>Pagos</strong>
      <div className="flex gap-4 items-center">
        {isEditing
          ? <Action
            onClick={() => changeToEditingMode(false)}>
              Guardar
            </Action>
          : <button
            className='flex items-center gap-2 text-primary-light py-2 px-4'
            onClick={() => changeToEditingMode()}>
              Editar
              <img src={EditIcon} />
            </button>}
        <span className='opacity-50'>Por cobrar</span><strong>{amount} {currency}</strong>
      </div>
    </header>
  )
}
