import { useContext } from 'react';
import Head from "next/head";
import dynamic from 'next/dynamic';
import classNames from 'classnames';


import { Header } from '@/components/Header';
import { Drawer } from '@/components/Drawer';
import { PizzaContext } from '@/context/PizzaContext';
const DynamicPizzaDetails = dynamic(() => import('@/components/PizzaDetails'), { ssr: false });

interface LayoutProps {
    title?: string;
    description?: string;
    className?: string;
    stickyHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
    title = 'Pizzorder',
    description = 'Get your faviourite pizza delivered to your door step in just a few minutes with Pizzorder',
    className = '',
    stickyHeader,
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
            <div className={classNames('bg-classy-deemLight relative min-h-screen', className)}>
                <Header stickyHeader={stickyHeader} />
                {children}

                {/* Side Drawer for Pizza Details */}
                <Drawer open={pizzaContext?.show} onClose={() => pizzaContext?.toggleDrawer()}>
                    <DynamicPizzaDetails onClose={() => pizzaContext?.toggleDrawer()} />
                </Drawer>
            </div>
        </>
    );
};