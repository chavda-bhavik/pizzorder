import React, { useState } from 'react';
import { Drawer } from '../Drawer';
import { Ingredient } from '@/components/Ingredient';
import Switcher from '@/components/Switcher';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { CheeseSelector } from '../CheeseSelector';

interface PizzaDetailsProps {
    pizza: PizzaItemType;
    show: boolean;
    onClose: () => void;
    ingredients: IngredientItemType[];
}
type SizeTypes = 'small' | 'medium' | 'large';
interface DetailsProps {
    extraCheese: boolean;
    size: SizeTypes;
    toppings: string[];
}

export const PizzaDetails: React.FC<PizzaDetailsProps> = ({
    pizza,
    show,
    onClose,
    ingredients
}) => {
    const [details, setDetails] = useState<DetailsProps>({
        extraCheese: false,
        size: 'medium',
        toppings: []
    });

    const onDetailsChange = (extraCheese: boolean | null, size?: null | SizeTypes, topping?: string | null) => {
        let newDetails = { ...details };
        if (extraCheese !== null) {
            newDetails.extraCheese = extraCheese;
        }
        if (size) newDetails.size = size;
        if (topping) newDetails.toppings?.includes(topping) ? newDetails.toppings.splice(newDetails.toppings.indexOf(topping), 1) : newDetails.toppings?.push(topping);
        setDetails(newDetails);
    }

    return (
        <Drawer open={show} onClose={onClose}>
            <div className=" h-full relative">
                {/* Pizza Image */}
                <img
                    src={pizza.imageUrl}
                    loading="lazy"
                    alt={pizza.title}
                />
                <div className="pt-3 pb-20 px-5 space-y-8 bg-classy-white">
                    {/* Title */}
                    <div className="flex flex-col justify-center">
                        <h3 className="font-semibold font-sans text-xl md:text-2xl">
                            {pizza.title}
                            <span className="text-2xl font-archivo-semibold">
                                (<span className='rupee'>{pizza.price}</span>)
                            </span>
                        </h3>
                        <p className="font-sans text-lg">
                            {pizza.subtitle}
                        </p>
                    </div>

                    {/* Size */}
                    <div className="space-y-3">
                        <h4 className="title">
                            Select Size
                        </h4>
                        <Switcher className="">
                            <Switcher.Switch
                                title="Small ($10)"
                                subTitle="Serves 2"
                                active={details.size === 'small'}
                                onClick={() => onDetailsChange(null, 'small')}
                            />
                            <Switcher.Switch
                                title="Medium ($12.5)"
                                subTitle="Serves 4"
                                active={details.size === 'medium'}
                                onClick={() => onDetailsChange(null, 'medium')}
                            />
                            <Switcher.Switch
                                title="Large ($17)"
                                subTitle="Serves 7"
                                active={details.size === 'large'}
                                onClick={() => onDetailsChange(null, 'large')}
                            />
                        </Switcher>
                    </div>

                    {/* Cheese */}
                    <div className="space-y-3">
                        <h4 className="title">
                            Extra Cheese
                        </h4>
                        <CheeseSelector added={details.extraCheese} onToggle={(value) => onDetailsChange(value)} />
                    </div>

                    {/* Toppings */}
                    <div className="space-y-3">
                        <div>
                            <h4 className="title">
                                Toppings
                            </h4>
                            <h5>
                                Add Veg Toppings @ 60.00
                                each
                            </h5>
                        </div>
                        <div className="flex flex-row gap-x-3 pb-3 px-1 md:gap-x-4 overflow-x-scroll">
                            {ingredients.map(
                                (ingredient, index) => (
                                    <Ingredient
                                        ingredient={ingredient}
                                        key={index}
                                        added={details.toppings.includes(ingredient.id)}
                                        onToggle={(value) => onDetailsChange(null, null, value)}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
                {/* Add To Cart */}
                <Button
                    text="Add To Cart"
                    block
                    icon="shoppingCartCheckFill"
                    iconSize="sm"
                    className="fixed bottom-0 rounded-none"
                />
            </div>
        </Drawer>
    );
};
