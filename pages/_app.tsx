import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app';

// Context
import PizzaProvider from '@/context/PizzaContext';
import CartProvider from '@/context/CartContext';
import ConfigProvider from '@/context/ConfigContext';
import { getConfig, getIngredients } from '@/api';

function MyApp({
    Component,
    pageProps,
    config,
    ingredientsData,
}: AppProps & { config: ConfigType; ingredientsData: IngredientItemType[] }) {
    return (
        <ConfigProvider configData={config}>
            <PizzaProvider ingredientsData={ingredientsData}>
                <CartProvider>
                    <Component {...pageProps} />
                </CartProvider>
            </PizzaProvider>
        </ConfigProvider>
    );
}

// Getting Config Data required on many pages
MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
    let config = await getConfig();
    const ingredientsData = await getIngredients();
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, config, ingredientsData };
};

export default MyApp;