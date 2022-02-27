import '../styles/globals.css'
import type { AppProps } from 'next/app';

// Context
import PizzaProvider from '@/context/PizzaContext';
import CartProvider from '@/context/CartContext';
import ConfigProvider from '@/context/ConfigContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ConfigProvider>
            <PizzaProvider>
                <CartProvider>
                    <Component {...pageProps} />
                </CartProvider>
            </PizzaProvider>
        </ConfigProvider>
    );
}

export default MyApp;