import { useContext, useState } from 'react';
import classNames from 'classnames';

import { CartItem } from '@/components/CartItem';
import { Checkout } from '@/components/Checkout';
import { Layout } from '@/components/Layout';
import { CartContext } from '@/context/CartContext';

interface CartProps {}

const Cart: React.FC<CartProps> = ({}) => {
    const cartContext = useContext(CartContext);
    const [collapsed, setCollapsed] = useState(false);

    const handleQuantityChange = (id: string, quantity: number) => {
        cartContext?.updateQuantity(id, quantity);
    };

    return (
        <Layout>
            <main className="py-2 md:grid md:grid-cols-2 relative">
                <div
                    className={classNames('px-2 md:mb-0', {
                        'mb-72': !collapsed,
                        'mb-28': collapsed,
                    })}
                >
                    <h2 className="title-lg">Your Cart</h2>
                    <div className="space-y-2">
                        {cartContext?.items.map((item, i) => (
                            <CartItem key={i} item={item} onQuantityChange={(quantity) => handleQuantityChange(item.pizza.id!, quantity)} />
                        ))}
                    </div>
                </div>
                <Checkout collapsed={collapsed} setCollapsed={setCollapsed} totalInfo={cartContext?.totalInfo} />
            </main>
        </Layout>
    );
};

export default Cart;
