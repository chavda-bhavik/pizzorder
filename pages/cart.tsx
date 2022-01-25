import { useState } from 'react';
import { Header } from '@/components/Header';
import { CartItem } from '@/components/CartItem';
import classNames from 'classnames';
import { Checkout } from '@/components/Checkout';

interface CartProps { }

const Cart: React.FC<CartProps> = ({ }) => {

    const [collapsed, setCollapsed] = useState(false);

    let cartItems: CartItemType[] = [
        {
            pizza: {
                name: 'Margherita',
                imageUrl: '/images/pizzas/margherita.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }
    ];

    return (
        <div className="bg-classy-deemLight min-h-screen">
            <Header />

            {/* Content */}
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
        </div>
    );
}

export default Cart;