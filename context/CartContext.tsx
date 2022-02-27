import useLocalStorage from '@/util/hooks/useLocalStorage';
import React, { useState, createContext, useContext } from 'react';
import { ConfigContext } from './ConfigContext';

export interface CartContextType {
    totalInfo: {
        total: number;
        subtotal: number;
        tax: number;
        deliveryCharge: number;
    };
    items: CartItemType[];

    addToCart: (
        id: string,
        imageUrl: string,
        title: string,
        customizationDetails: CustomizationDetails
    ) => void;
    updateCartItem: (
        id: string,
        imageUrl: string,
        title: string,
        customizationDetails: CustomizationDetails
    ) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider: React.FC<{}> = ({ children }: any) => {
    const configContext = useContext(ConfigContext);
    const [totalInfo, setTotalInfo] = useState<TotalInfo>({
        total: 0,
        subtotal: 0,
        tax: 0,
        deliveryCharge: 0,
    });
    const [cartItems, setCartItems] = useLocalStorage<CartItemType[]>('cart', []);

    const addToCart = (
        id: string,
        imageUrl: string,
        title: string,
        customizationDetails: CustomizationDetails
    ) => {
        let newItemsList = [...cartItems];
        let itemIndex = newItemsList.findIndex((i) => i.pizza.id === id);
        let addNew = false;

        if (itemIndex > -1) {
            // check if same pizza with same toppings || extra cheese || size is already in the cart
            if (cartItems[itemIndex].extraCheese !== customizationDetails.extraCheese)
                addNew = true;
            else if (
                customizationDetails.toppings &&
                !customizationDetails.toppings.every((toppingId) =>
                    cartItems[itemIndex].ingredients?.includes(toppingId)
                )
            )
                addNew = true;
            else if (
                customizationDetails.size &&
                cartItems[itemIndex].size !== customizationDetails.size
            )
                addNew = true;
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
        setCartItems(newItemsList);
    };

    const clearCart = () => {
        setCartItems([]);
        updateTotalInfo([]);
    };

    const updateTotalInfo = (items: CartItemType[]) => {
        if (configContext?.config) {
            let newTotalInfo = {
                ...totalInfo,
            };
            newTotalInfo.subtotal = items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            newTotalInfo.tax = newTotalInfo.subtotal * configContext?.config.taxRate!;
            newTotalInfo.tax = Number(newTotalInfo.tax.toFixed(2));
            newTotalInfo.total = Math.round(
                newTotalInfo.subtotal + newTotalInfo.tax + newTotalInfo.deliveryCharge
            );
            if (newTotalInfo.total)
                newTotalInfo.deliveryCharge = configContext?.config.deliveryCharge || 0;
            setTotalInfo(newTotalInfo);
        }
    };

    const updateCartItem = (
        id: string,
        imageUrl: string,
        title: string,
        customizationDetails: CustomizationDetails
    ) => {
        let newItemsList = [...cartItems];
        let itemIndex = newItemsList.findIndex((i) => i.pizza.id === id);
        if (itemIndex > -1) {
            newItemsList[itemIndex].pizza.imageUrl = imageUrl;
            newItemsList[itemIndex].pizza.title = title;
            newItemsList[itemIndex].extraCheese = customizationDetails.extraCheese;
            newItemsList[itemIndex].ingredients = customizationDetails.toppings;
            newItemsList[itemIndex].size = customizationDetails.size;
            newItemsList[itemIndex].price = customizationDetails.price;
        }
        updateTotalInfo(newItemsList);
        setCartItems(newItemsList);
    };

    const updateQuantity = (id: string, quantity: number) => {
        let newItemsList = [...cartItems];
        let itemIndex = newItemsList.findIndex((i) => i.pizza.id === id);
        if (itemIndex > -1) {
            if (quantity === 0) {
                newItemsList.splice(itemIndex, 1);
            } else {
                newItemsList[itemIndex].quantity = quantity;
            }
            updateTotalInfo(newItemsList);
            setCartItems(newItemsList);
        }
    };

    const contextValue: CartContextType = {
        totalInfo,
        items: cartItems,

        addToCart,
        clearCart,
        updateCartItem,
        updateQuantity,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;
