import React from 'react'
import Image from 'next/image';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

interface CartItemProps {
    item: CartItemType,
    onQuantityChange?: (num: number) => void
}

export const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange }) => {
    const handleQuantityChange = (dir: 'up' | 'down') => {
        if (onQuantityChange) {
            onQuantityChange(dir === "up" ? Number(item.quantity) + 1 : Number(item.quantity) - 1)
        }
    }
    return (
        <div className="flex flex-row w-full bg-classy-white rounded-lg border-2 border-classy-slate p-2 gap-2">
            <div className="flex-shrink-0 flex items-center">
                <Image src={item.pizza.imageUrl!} width={70} height={70} className="shadowed" alt={item.pizza.title} />
            </div>
            <div className="flex flex-col justify-center flex-grow">
                <h3 className="text-lg font-archivo-semibold">{item.pizza.title}</h3>
                <p className="text-base rupee">{item.price}</p>
            </div>
            <div className="flex flex-row items-center">
                <IconButton
                    icon={item.quantity === 1 ? 'trash' : 'minus'}
                    iconSize="sm"
                    onClick={() => handleQuantityChange('down')}
                    variant="secondary"
                />
                <span className="py-1 px-3 text-xl font-archivo-bold">{item.quantity}</span>
                <IconButton icon="plus" iconSize="sm" onClick={() => handleQuantityChange('up')} variant="primary" />
            </div>
        </div>
    );
}