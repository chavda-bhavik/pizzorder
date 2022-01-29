import React from 'react';
import { Drawer } from '../Drawer';
import { Ingredient } from '@/components/Ingredient';
import Switcher from '@/components/Switcher';
import { Icon } from '../Icon';
import { Button } from '../Button';

interface PizzaDetailsProps {
    pizza: PizzaItemType;
    show: boolean;
    onClose: () => void;
}

const ingredients: IngredientItemType[] = [
    {
        imageUrl: '/images/ingredients/tomato.png',
        name: 'Tomato',
        price: 1.5,
    },
    {
        imageUrl: '/images/ingredients/capsicum.png',
        name: 'Capsicum',
        price: 1.5,
    },
    {
        imageUrl: '/images/ingredients/golden-corn.png',
        name: 'Corn',
        price: 1.5,
    },
    {
        imageUrl: '/images/ingredients/jalapeno.png',
        name: 'Jalapeno',
        price: 1.5,
    },
    {
        imageUrl: '/images/ingredients/mashroom.png',
        name: 'Mashroom',
        price: 1.5,
    },
    {
        imageUrl: '/images/ingredients/olives.png',
        name: 'Olives',
        price: 1.5,
    },
    {
        imageUrl: '/images/ingredients/onion.png',
        name: 'Onion',
        price: 1.5,
    },
    {
        imageUrl: '/images/ingredients/paneer.png',
        name: 'Paneer',
        price: 1.5,
    },
    {
        imageUrl: '/images/ingredients/paprika.png',
        name: 'Paprika',
        price: 1.5,
    },
];

export const PizzaDetails: React.FC<PizzaDetailsProps> = ({
    show,
    onClose,
}) => {
    return (
        <Drawer open={show} onClose={onClose}>
            <div className=" h-full relative">
                {/* Pizza Image */}
                <img
                    src="/images/pizzas/capricciosa.jpg"
                    // layout="responsive"
                    loading="lazy"
                    // layout="responsive"
                    alt="Pizza Image"
                />
                <div className="pt-3 pb-20 px-5 space-y-8 bg-classy-white">
                    {/* Title */}
                    <div className="flex flex-col justify-center">
                        <h3 className="font-semibold font-sans text-xl md:text-2xl">
                            Black Papper Club&nbsp;
                            {/* <span className="text-base">
                                &nbsp;@
                            </span> */}
                            <span className="text-2xl font-archivo-semibold">
                                ($199)
                            </span>
                        </h3>
                        <p className="font-sans text-lg">
                            Veg delight - onion, capsicum,
                            grilled mushroom, corn &amp;
                            paneer
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
                            />
                            <Switcher.Switch
                                title="Medium ($12.5)"
                                subTitle="Serves 4"
                                active
                            />
                            <Switcher.Switch
                                title="Large ($17)"
                                subTitle="Serves 7"
                            />
                        </Switcher>
                    </div>

                    {/* Cheese */}
                    <div className="space-y-3">
                        <h4 className="title">
                            Extra Cheese
                        </h4>
                        <div className="p-2 flex flex-row w-full border border-classy-slate rounded items-center">
                            <Icon
                                icon="checkFill"
                                size="sm"
                                className="text-green-700"
                            />
                            <div className="flex-grow pl-2">
                                <p>
                                    I want to add extra
                                    cheese
                                </p>
                            </div>
                            <button className="border border-classy-slate px-2 py-1 rounded-md bg-classy-slate hover:bg-classy-golden transition-colors duration-400">
                                Remove
                            </button>
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className="space-y-3">
                        <div>
                            <h4 className="title">
                                Ingredients
                            </h4>
                            <h5>
                                Add Veg Toppings @ 60.00
                                each
                            </h5>
                        </div>
                        <div className="flex flex-row gap-x-3 pb-3 px-3 md:gap-x-4 overflow-x-scroll">
                            {ingredients.map(
                                (ingredient, index) => (
                                    <Ingredient
                                        content={ingredient}
                                        key={index}
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
