import { DEFAULT_SETTINGS } from '@/consts'
import { PaymentsSettingsProvider } from '@/context/payments-settings'
import { PaymentsProvider } from '@/context/payments'
import { Header } from '@/components/header'
import { Pagos } from '@/components/pagos'
import { Toaster } from 'sonner'

function App () {
  return (
    <>
      <PaymentsSettingsProvider {...DEFAULT_SETTINGS}>
        <Header />
        <PaymentsProvider>
          <Pagos />
        </PaymentsProvider>
      </PaymentsSettingsProvider>
      <Toaster position='top-right' />
    </>
  )
}

export default App
