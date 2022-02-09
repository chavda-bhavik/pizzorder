import React, { useState, createContext } from 'react';

export interface CartContextType {
    items: CartItemType[];

    addToCart: (id: string, imageUrl: string, title: string, size: PizzaSizeTypes, extraCheese: boolean, toppings: string[]) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider: React.FC<{}> = ({ children }: any) => {
    const [items, setSetItems] = useState<CartItemType[]>([]);

    const addToCart = (id: string, imageUrl: string, title: string, size: PizzaSizeTypes, extraCheese: boolean, toppings: string[]) => {
        console.log(id);
        let newItemsList = [...items];
        let itemIndex = newItemsList.findIndex(i => i.pizza.id === id);
        let addNew = false;

        if (itemIndex > -1) {
            // check if same pizza with same toppings || extra cheese || size is already in the cart
            if (items[itemIndex].extraCheese !== extraCheese) {
                addNew = true;
            } else if (toppings && !toppings.every(toppingId => items[itemIndex].ingredients?.includes(toppingId))) {
                addNew = true;
            } else if (size && items[itemIndex].size !== size) {
                addNew = true;
            }
        } else addNew = true;

        if (addNew) {
            // add new cart item
            newItemsList.push({
                pizza: { id, imageUrl, title },
                quantity: 1,
                extraCheese,
                ingredients: toppings,
                size
            });
        } else {
            // increase quantity
            newItemsList[itemIndex].quantity++;
        }
        setSetItems(newItemsList);
    };

    const contextValue: CartContextType = {
        items,

        addToCart
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
