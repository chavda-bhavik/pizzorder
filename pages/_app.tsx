import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Context
import PizzaProvider from '@/context/PizzaContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PizzaProvider>
      <Component {...pageProps} />
    </PizzaProvider>
  )
}

export default MyApp
