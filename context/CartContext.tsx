import React, { useState, createContext } from 'react';

export interface CartContextType {
    totalInfo: {
        total: number;
        subtotal: number;
        tax: number;
        deliveryCharge: number;
    };
    items: CartItemType[];

    addToCart: (id: string, imageUrl: string, title: string, customizationDetails: CustomizationDetails) => void;
    updateQuantity: (id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider: React.FC<{}> = ({ children }: any) => {
    const [totalInfo, setTotalInfo] = useState<TotalInfo>({
        total: 0,
        subtotal: 0,
        tax: 0,
        deliveryCharge: 40,
    });
    const [items, setSetItems] = useState<CartItemType[]>([]);

    const addToCart = (id: string, imageUrl: string, title: string, customizationDetails: CustomizationDetails) => {
        let newItemsList = [...items];
        let itemIndex = newItemsList.findIndex((i) => i.pizza.id === id);
        let addNew = false;

        if (itemIndex > -1) {
            // check if same pizza with same toppings || extra cheese || size is already in the cart
            if (items[itemIndex].extraCheese !== customizationDetails.extraCheese) {
                addNew = true;
            } else if (
                customizationDetails.toppings &&
                !customizationDetails.toppings.every((toppingId) => items[itemIndex].ingredients?.includes(toppingId))
            ) {
                addNew = true;
            } else if (customizationDetails.size && items[itemIndex].size !== customizationDetails.size) {
                addNew = true;
            }
        } else addNew = true;

        if (addNew) {
            // add new cart item
            newItemsList.push({
                pizza: { id, imageUrl, title },
                quantity: 1,
                extraCheese: customizationDetails.extraCheese,
                ingredients: customizationDetails.toppings,
                size: customizationDetails.size,
                price: customizationDetails.price,
            });
        } else {
            // increase quantity
            newItemsList[itemIndex].quantity++;
        }
        updateTotalInfo(newItemsList);
        setSetItems(newItemsList);
    };

    const updateTotalInfo = (items: CartItemType[]) => {
        let newTotalInfo = {
            ...totalInfo,
        };
        newTotalInfo.subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        newTotalInfo.tax = newTotalInfo.subtotal * 0.01;
        newTotalInfo.tax = Number(newTotalInfo.tax.toFixed(2));
        newTotalInfo.total = Math.round(newTotalInfo.subtotal + newTotalInfo.tax + newTotalInfo.deliveryCharge);
        setTotalInfo(newTotalInfo);
    };

    const updateQuantity = (id: string, quantity: number) => {
        let newItemsList = [...items];
        let itemIndex = newItemsList.findIndex((i) => i.pizza.id === id);
        if (itemIndex > -1) {
            if (quantity === 0) {
                newItemsList.splice(itemIndex, 1);
            } else {
                newItemsList[itemIndex].quantity = quantity;
            }
            updateTotalInfo(newItemsList);
            setSetItems(newItemsList);
        }
    };

    const contextValue: CartContextType = {
        totalInfo,
        items,

        addToCart,
        updateQuantity,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;
