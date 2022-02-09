import { useContext, useState } from 'react';

import { Button } from '@/components/Button';
import { Drawer } from '@/components/Drawer';
import Switcher from '@/components/Switcher';
import { CartContext } from '@/context/CartContext';
import { Ingredient } from '@/components/Ingredient';
import { CheeseSelector } from '@/components/CheeseSelector';
import { Icon } from '../Icon';

interface PizzaDetailsProps {
    pizza: PizzaItemType;
    show: boolean;
    onClose: () => void;
    ingredients: IngredientItemType[];
}

interface DetailsProps {
    extraCheese: boolean;
    size: PizzaSizeTypes;
    toppings: string[];
    price: number;
}

const PizzaDetails: React.FC<PizzaDetailsProps> = ({
    pizza,
    show,
    onClose,
    ingredients
}) => {
    const cartContext = useContext(CartContext);
    const [details, setDetails] = useState<DetailsProps>({
        extraCheese: false,
        size: 'medium',
        toppings: [],
        price: pizza.price
    });

    const onDetailsChange = (extraCheese: boolean | null, size?: null | PizzaSizeTypes, topping?: string | null) => {
        let newDetails = { ...details };
        if (extraCheese !== null) {
            newDetails.extraCheese = extraCheese;
        }
        if (size) newDetails.size = size;
        if (topping) newDetails.toppings?.includes(topping) ? newDetails.toppings.splice(newDetails.toppings.indexOf(topping), 1) : newDetails.toppings?.push(topping);
        setDetails(newDetails);
    }
    const onAddToCart = () => {
        cartContext?.addToCart(pizza.id, pizza.imageUrl, pizza.title, details.size, details.extraCheese, details.toppings);
        onClose();
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
                <button
                    className='btn btn-primary w-full fixed bottom-0 rounded-none flex flex-row justify-between py-2 px-3'
                    onClick={onAddToCart}
                >
                    Add To Cart
                    <div className='border-black px-2 text-xl font-medium font-sans'>
                        <span className='rupee'>{pizza.price}</span>
                    </div>
                </button>
            </div>
        </Drawer>
    );
};

export default PizzaDetails;