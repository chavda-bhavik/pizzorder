import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import { Button } from '../Button';
import Switcher from '@/components/Switcher';
import { countPizzaPrice } from '@/util/helper';
import { CartContext } from '@/context/CartContext';
import { Ingredient } from '@/components/Ingredient';
import { PizzaContext } from '@/context/PizzaContext';
import { ConfigContext } from '@/context/ConfigContext';
import { CheeseSelector } from '@/components/CheeseSelector';
import { Icon } from '../Icon';

interface PizzaDetailsProps {
    onClose?: () => void;
}

const PizzaDetails: React.FC<PizzaDetailsProps> = ({ onClose }) => {
    const configContext = useContext(ConfigContext);
    const cartContext = useContext(CartContext);
    const pizzaContext = useContext(PizzaContext);
    const [customizationDetails, setCustomizationDetails] = useState<CustomizationDetails>({
        extraCheese: false,
        toppings: [],
        price: 0,
    });
    const [pizzaItemDetails, setPizzaItemDetails] = useState<PizzaItemType>();

    useEffect(() => {
        if (pizzaContext?.pizzaDetails) {
            setPizzaItemDetails(pizzaContext.pizzaDetails);
        }
    }, [pizzaContext?.pizzaDetails]);

    useEffect(() => {
        if (pizzaContext?.customizationDetails) {
            setCustomizationDetails(pizzaContext.customizationDetails);
        }
    }, [pizzaContext?.customizationDetails]);

    const onDetailsChange = (extraCheese?: boolean, size?: PizzaSizeTypes, topping?: string) => {
        if (pizzaContext && pizzaItemDetails && configContext) {
            let newDetails = { ...pizzaContext.customizationDetails };
            if (typeof extraCheese !== 'undefined') newDetails.extraCheese = extraCheese;
            if (size) newDetails.size = size;
            if (topping) {
                if (newDetails.toppings.includes(topping))
                    newDetails.toppings.splice(newDetails.toppings.indexOf(topping), 1);
                else newDetails.toppings.push(topping);
            }
            pizzaContext?.updateCustomizationDetails({
                ...newDetails,
                price: countPizzaPrice(
                    pizzaItemDetails,
                    configContext.config,
                    size || 'medium',
                    extraCheese,
                    newDetails.toppings
                ),
            });
        }
    };
    const onAddToCart = () => {
        if (pizzaItemDetails && pizzaContext) {
            if (pizzaContext.editing) {
                cartContext?.updateCartItem(
                    pizzaItemDetails.id,
                    pizzaItemDetails.imageUrl,
                    pizzaItemDetails.title,
                    customizationDetails
                );
            } else {
                cartContext?.addToCart(
                    pizzaItemDetails.id,
                    pizzaItemDetails.imageUrl,
                    pizzaItemDetails.title,
                    pizzaContext.customizationDetails
                );
            }
            onClose && onClose();
        }
    };
    const onLikeClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (pizzaItemDetails) {
            pizzaContext?.toggleLike(pizzaItemDetails.id);
        }
    };

    return (
        <div className=" h-full relative">
            {/* Pizza Image */}
            <div className="relative w-full h-56 sm:h-64 lg:h-72">
                {pizzaItemDetails && (
                    <>
                        <Image
                            src={pizzaItemDetails.imageUrl}
                            loading="lazy"
                            alt={pizzaItemDetails.title}
                            layout="fill"
                        />
                        <div className="absolute top-0 right-0 h-10 w-11 bg-shadow rotate-180" />
                        <button className="absolute right-2 top-1 h-5 w-5" onClick={onLikeClick}>
                            <Icon
                                icon={
                                    pizzaContext?.likedPizzas.includes(pizzaItemDetails?.id)
                                        ? 'heartFill'
                                        : 'heart'
                                }
                                className={
                                    pizzaContext?.likedPizzas.includes(pizzaItemDetails?.id)
                                        ? 'text-red-500'
                                        : 'text-white'
                                }
                                size="sm"
                            />
                        </button>
                    </>
                )}
            </div>
            <div className="pb-20 space-y-8 bg-classy-white">
                {/* Title */}
                <div className="flex flex-col justify-center px-5 bg-classy-deemLight pt-4 pb-5">
                    <h3 className="font-semibold font-sans text-xl md:text-2xl">
                        {pizzaItemDetails ? pizzaItemDetails.title : ''}
                    </h3>
                    <p className="font-sans text-lg">
                        {pizzaItemDetails ? pizzaItemDetails.subtitle : ''}
                    </p>
                </div>

                <div className="space-y-8 px-5">
                    {/* Size */}
                    <div className="space-y-3">
                        <h4 className="title">Select Size</h4>
                        <Switcher>
                            {pizzaItemDetails && pizzaItemDetails.prices.small && (
                                <Switcher.Switch
                                    title={`Small <span class='rupee'>${pizzaItemDetails.prices.small}</span>`}
                                    subTitle="Serves 2"
                                    active={customizationDetails.size === 'small'}
                                    onClick={() => onDetailsChange(undefined, 'small')}
                                />
                            )}
                            {pizzaItemDetails && pizzaItemDetails.prices.medium && (
                                <Switcher.Switch
                                    title={`Medium <span class='rupee'>${pizzaItemDetails.prices.medium}</span>`}
                                    subTitle="Serves 4"
                                    active={customizationDetails.size === 'medium'}
                                    onClick={() => onDetailsChange(undefined, 'medium')}
                                />
                            )}
                            {pizzaItemDetails && pizzaItemDetails.prices.large && (
                                <Switcher.Switch
                                    title={`Large <span class='rupee'>${pizzaItemDetails.prices.large}</span>`}
                                    subTitle="Serves 7"
                                    active={customizationDetails.size === 'large'}
                                    onClick={() => onDetailsChange(undefined, 'large')}
                                />
                            )}
                        </Switcher>
                    </div>

                    {/* Extra Cheese */}
                    {pizzaItemDetails && pizzaItemDetails.extraCheeseAvailabe && (
                        <div className="space-y-3">
                            <h4 className="title">Extra Cheese</h4>
                            <CheeseSelector
                                added={customizationDetails.extraCheese}
                                onToggle={(value) => onDetailsChange(value)}
                            />
                        </div>
                    )}

                    {/* Toppings */}
                    <div className="space-y-3">
                        <div>
                            <h4 className="title">Toppings</h4>
                            <h5>Add Veg Toppings @ 60.00 each</h5>
                        </div>
                        <div className="flex flex-row gap-x-3 pb-3 px-1 md:gap-x-4 overflow-x-scroll">
                            {pizzaContext?.ingredients.map((ingredient, index) => (
                                <Ingredient
                                    ingredient={ingredient}
                                    key={index}
                                    added={customizationDetails.toppings.includes(ingredient.id)}
                                    onToggle={(value) =>
                                        onDetailsChange(undefined, undefined, value)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Add To Cart */}
            <Button
                block
                onClick={onAddToCart}
                className="fixed bottom-0 rounded-none flex flex-row justify-between px-3"
            >
                {pizzaContext?.editing ? 'Update Pizza' : 'Add To Cart'}
                <div className="border-black px-2 text-xl font-medium font-sans">
                    <span className="rupee">{customizationDetails.price}</span>
                </div>
            </Button>
        </div>
    );
};

export default PizzaDetails;
