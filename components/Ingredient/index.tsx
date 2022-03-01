import Image from 'next/image';
import classNames from 'classnames';

import { Button } from '@/components/Button';

interface IngredientProps {
    ingredient: IngredientItemType;
    added?: boolean;
    onToggle?: (id: string) => void;
}

export const Ingredient: React.FC<IngredientProps> = ({ ingredient, added, onToggle }) => {
    return (
        <div className="flex flex-col items-center space-y-1 group cursor-pointer">
            <div
                className={classNames(
                    'flex flex-col w-max bg-classy-lightBrown bg-opacity-60 border-2 rounded-lg text-center p-2 items-center mb-2',
                    {
                        'border-gray-900': added,
                        'border-classy-slate': !added,
                    }
                )}
            >
                <div className="relative w-full min-w-[75px] min-h-[75px] h-full m-2">
                    <Image
                        src={ingredient.imageUrl}
                        alt={ingredient.name}
                        layout="fill"
                        objectFit="contain"
                        className="shadowed"
                    />
                </div>
                <span className="text-base font-sans">{ingredient.name}</span>
            </div>
            <Button
                variant="secondary"
                onClick={() => onToggle && onToggle(ingredient.id)}
                size="sm"
                className="font-sans font-medium"
            >
                {added ? 'Remove' : 'Add'}
            </Button>
        </div>
    );
};
