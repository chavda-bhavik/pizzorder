import Image from 'next/image';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

interface CartItemProps {
    item: CartItemType;
    onQuantityChange?: (num: number) => void;
    editing?: boolean;
    onEditClick?: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
    item,
    onQuantityChange,
    editing = false,
    onEditClick,
}) => {
    const handleQuantityChange = (dir: 'up' | 'down') => {
        if (onQuantityChange) {
            onQuantityChange(dir === 'up' ? Number(item.quantity) + 1 : Number(item.quantity) - 1);
        }
    };
    const quantityActionContent = (
        <>
            <Button
                onClick={() => handleQuantityChange('down')}
                size="sm"
                variant="secondary"
                className="rounded-full py-2"
            >
                <Icon icon={item.quantity === 1 ? 'trash' : 'minus'} size="sm" />
            </Button>
            <span className="py-1 px-3 text-xl font-noto-sans-bold">{item.quantity}</span>
            <Button
                onClick={() => handleQuantityChange('up')}
                size="sm"
                className="rounded-full py-2"
            >
                <Icon icon="plus" size="sm" />
            </Button>
        </>
    );
    const editContent = (
        <Button variant="secondary" onClick={onEditClick} size="sm" className="rounded-full py-2">
            <Icon icon="pencil" size="sm" />
        </Button>
    );
    return (
        <div className="flex flex-row w-full bg-classy-white rounded-lg border-2 border-classy-slate p-2 gap-2">
            <div className="flex-shrink-0 flex items-center">
                <Image
                    src={item.pizza.imageUrl!}
                    width={70}
                    height={70}
                    className="shadowed"
                    alt={item.pizza.title}
                />
            </div>
            <div className="flex flex-col justify-center flex-grow">
                <h3 className="text-base md:text-lg font-noto-sans-bold">{item.pizza.title}</h3>
                <p className="text-base rupee">{item.price}</p>
            </div>
            <div className="flex flex-row items-center">
                {editing ? editContent : quantityActionContent}
            </div>
        </div>
    );
};
