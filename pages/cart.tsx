import { useContext, useState } from 'react';
import classNames from 'classnames';

import { CartItem } from '@/components/CartItem';
import { Checkout } from '@/components/Checkout';
import { Layout } from '@/components/Layout';
import { CartContext } from '@/context/CartContext';
import { Button } from '@/components/Button';
import { getPizzaDetails } from '@/api';
import { PizzaContext } from '@/context/PizzaContext';

interface CartProps {}

const Cart: React.FC<CartProps> = ({}) => {
    const cartContext = useContext(CartContext);
    const pizzaContext = useContext(PizzaContext);
    const [collapsed, setCollapsed] = useState(false);
    const [editing, setEditing] = useState(false);

    const handleQuantityChange = (id: string, quantity: number) => {
        cartContext?.updateQuantity(id, quantity);
    };
    const handleEditClick = () => {
        setEditing(!editing);
    };
    const handleEditCartItemClick = async (index: number) => {
        let cartItem = cartContext?.items[index];
        if (cartItem) {
            let pizza = await getPizzaDetails(cartItem.pizza.id!);
            pizzaContext?.storePizzaDetails(pizza, {
                extraCheese: Boolean(cartItem.extraCheese),
                price: cartItem.price,
                toppings: cartItem.ingredients || [],
                size: cartItem.size,
            });
            pizzaContext?.toggleDrawer();
        }
    };
    return (
        <Layout stickyHeader>
            <main className="py-2 md:grid md:grid-cols-2 relative">
                <div
                    className={classNames('px-2 md:mb-0', {
                        'mb-72': !collapsed,
                        'mb-28': collapsed,
                    })}
                >
                    <div className="flex flex-row justify-between items-center content-center">
                        <h2 className="title-lg">Your Cart</h2>
                        <Button size="sm" onClick={handleEditClick}>
                            {editing ? 'Done' : 'Edit Cart'}
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {cartContext?.items.map((item, i) => (
                            <CartItem
                                key={i}
                                item={item}
                                editing={editing}
                                onEditClick={() => handleEditCartItemClick(i)}
                                onQuantityChange={(quantity) =>
                                    handleQuantityChange(item.pizza.id!, quantity)
                                }
                            />
                        ))}
                    </div>
                </div>
                <Checkout
                    editing={editing}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    totalInfo={cartContext?.totalInfo}
                />
            </main>
        </Layout>
    );
};

export default Cart;
