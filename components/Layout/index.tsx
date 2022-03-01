import { useContext, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import { Header } from '@/components/Header';
import { Drawer } from '@/components/Drawer';
import { getConfig, getIngredients } from '@/api';
import { PizzaContext } from '@/context/PizzaContext';
import { ConfigContext } from '@/context/ConfigContext';

const DynamicPizzaDetails = dynamic(() => import('@/components/PizzaDetails'), { ssr: false });

interface LayoutProps {
    title?: string;
    description?: string;
    className?: string;
    stickyHeader?: boolean;
    onDrawerClose?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
    title = 'Pizzorder',
    description = 'Get your faviourite pizza delivered to your door step in just a few minutes with Pizzorder',
    className = '',
    stickyHeader,
    onDrawerClose,
    children,
}) => {
    const configContext = useContext(ConfigContext);
    const pizzaContext = useContext(PizzaContext);

    useEffect(() => {
        (async () => {
            if (typeof window !== 'undefined') {
                let config = await getConfig();
                const ingredientsData = await getIngredients();
                configContext?.storeConfig(config);
                pizzaContext?.storeIngredients(ingredientsData);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDrawerCloseClick = () => {
        if (onDrawerClose) onDrawerClose();
        pizzaContext?.toggleDrawer();
    };

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
                <Drawer open={pizzaContext?.show} onClose={onDrawerCloseClick}>
                    <DynamicPizzaDetails onClose={onDrawerCloseClick} />
                </Drawer>
            </div>
        </>
    );
};
