import React from 'react'
import Image from "next/image";
import { Drawer } from '../Drawer';
import { Ingredient } from "@/components/Ingredient";
import Switcher from "@/components/Switcher";

interface PizzaDetailsProps {
    pizza: PizzaItemType;
    show: boolean;
    onClose: () => void;
}

const ingredients: IngredientItemType[] = [
    {
        imageUrl: "/images/ingredients/tomato.png",
        name: "Tomato",
        price: 1.5,
    }, {
        imageUrl: "/images/ingredients/capsicum.png",
        name: "Capsicum",
        price: 1.5,
    }, {
        imageUrl: "/images/ingredients/golden-corn.png",
        name: "Corn",
        price: 1.5,
    }, {
        imageUrl: "/images/ingredients/jalapeno.png",
        name: "Jalapeno",
        price: 1.5,
    }, {
        imageUrl: "/images/ingredients/mashroom.png",
        name: "Mashroom",
        price: 1.5,
    }, {
        imageUrl: "/images/ingredients/olives.png",
        name: "Olives",
        price: 1.5,
    }, {
        imageUrl: "/images/ingredients/onion.png",
        name: "Onion",
        price: 1.5,
    }, {
        imageUrl: "/images/ingredients/paneer.png",
        name: "Paneer",
        price: 1.5,
    }, {
        imageUrl: "/images/ingredients/paprika.png",
        name: "Paprika",
        price: 1.5,
    }
]

export const PizzaDetails: React.FC<PizzaDetailsProps> = ({ show, onClose }) => {
    return (
        <Drawer open={show} onClose={onClose}>
            <div className="flex justify-center items-center">
                {/* Pizza Image */}
                <div className="h-60 w-60 relative">
                    <Image
                        src="/images/pizzas/margherita.png"
                        layout="fill"
                        loading="lazy"
                        // layout="responsive"
                        className="shadowed object-scale-down"
                        alt="Pizza Image"
                    />
                </div>
            </div>
            <div className="bg-classy-white">
                <div className="grid grid-cols-1 pt-3">
                    {/* Title */}
                    <div className="flex flex-col justify-center">
                        <h3 className="font-semibold font-sans text-xl md:text-2xl">
                            Black Papper Club
                        </h3>
                        <h4 className="text-2xl font-archivo-light">$199</h4>
                    </div>
                    {/* Size */}
                    <Switcher className="mt-4">
                        <Switcher.Switch title="Small" subTitle="Serves 2" />
                        <Switcher.Switch title="Medium" subTitle="Serves 4" active />
                        <Switcher.Switch title="Large" subTitle="Serves 7" />
                    </Switcher>
                </div>

                {/* Ingredients */}
                <h4 className="title mt-8 mb-3">Ingredients</h4>
                <div className="flex flex-row gap-x-1 md:gap-x-2 overflow-x-scroll max-w-full">
                    {
                        ingredients.map((ingredient, index) => <Ingredient content={ingredient} key={index} />)
                    }
                </div>
            </div>
        </Drawer>
    );
}