import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Context
import PizzaProvider from '@/context/PizzaContext';
import CartProvider from '@/context/CartContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PizzaProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </PizzaProvider>
  )
}

export default MyApp
