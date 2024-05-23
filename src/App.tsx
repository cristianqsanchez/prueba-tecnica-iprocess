import { DEFAULT_SETTINGS } from '@/consts'
import { PaymentsSettingsProvider } from '@/context/payments-settings'
import { Header } from '@/components/header'

function App () {
  return (
    <>
      <PaymentsSettingsProvider {...DEFAULT_SETTINGS}>
        <Header />
      </PaymentsSettingsProvider>
    </>
  )
}

export default App
