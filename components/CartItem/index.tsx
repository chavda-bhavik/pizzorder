import React from 'react'
import Image from 'next/image';
import { Icon } from '../Icon';

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
            <div className='flex-shrink-0 flex items-center'>
                <Image src={item.pizza.imageUrl} width={70} height={70} className='shadowed' alt={item.pizza.title} />
            </div>
            <div className='flex flex-col justify-center flex-grow'>
                <h3 className='text-lg font-archivo-semibold'>{item.pizza.title}</h3>
                <p className='text-base'>$199.00</p>
            </div>
            <div className='flex flex-row items-center'>
                <button className='bg-classy-slate rounded-full p-2 text-lg hover:bg-classy-golden transition-colors duration-300' onClick={() => handleQuantityChange('down')}>
                    <Icon icon={item.quantity === 1 ? 'trash' : 'minus'} size="sm" />
                </button>
                <span className='py-1 px-3 text-xl font-archivo-bold'>{item.quantity}</span>
                <button className='bg-classy-lightGolden rounded-full p-2 text-lg font-archivo-bold hover:bg-classy-golden transition-colors duration-300' onClick={() => handleQuantityChange('up')}>
                    <Icon icon='plus' size="sm" />
                </button>
            </div>
        </div>
    );
}