import Head from "next/head";
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import { Header } from '../Header';
import { Drawer } from '@/components/Drawer';
import { useContext } from 'react';
import { PizzaContext } from '@/context/PizzaContext';
const DynamicPizzaDetails = dynamic(() => import('@/components/PizzaDetails'), { ssr: false });

interface LayoutProps {
    title?: string;
    description?: string;
    className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
    title = 'Pizzorder',
    description = 'Get your faviourite pizza delivered to your door step in just a few minutes with Pizzorder',
    className = '',
    children,
}) => {
    const pizzaContext = useContext(PizzaContext);
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classNames('bg-classy-deemLight min-h-screen', className)}>
                <Header />
                {children}
                <Drawer open={pizzaContext?.show} onClose={pizzaContext?.hide}>
                    <DynamicPizzaDetails onClose={pizzaContext?.hide} />
                </Drawer>
            </div>
        </>
    );
};