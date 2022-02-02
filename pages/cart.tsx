import { useState } from 'react';
import classNames from 'classnames';

import { CartItem } from '@/components/CartItem';
import { Checkout } from '@/components/Checkout';
import { Layout } from '@/components/Layout';

interface CartProps { }

const Cart: React.FC<CartProps> = ({ }) => {

    const [collapsed, setCollapsed] = useState(false);

    let cartItems: CartItemType[] = [
        {
            pizza: {
                id: "adsf",
                subtitle: "",
                title: 'Margherita',
                imageUrl: '/images/pizzas/margherita.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                id: "adsf",
                subtitle: "",
                title: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                id: "adsf",
                subtitle: "",
                title: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 2,
        }, {
            pizza: {
                id: "adsf",
                subtitle: "",
                title: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 3,
        }, {
            pizza: {
                id: "adsf",
                subtitle: "",
                title: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 5,
        }
    ];

    return (
        <Layout>
            <main className="py-2 md:grid md:grid-cols-2 relative">
                <div className={classNames('px-2 md:mb-0', {
                    'mb-72': !collapsed,
                    'mb-28': collapsed
                })}>
                    <h2 className='title-lg'>Your Cart</h2>
                    <div className='space-y-2'>
                        {
                            cartItems.map((item, index) => <CartItem item={item} key={index} />)
                        }
                    </div>
                </div>
                <Checkout collapsed={collapsed} setCollapsed={setCollapsed} />
            </main>
        </Layout>
    );
}

export default Cart;