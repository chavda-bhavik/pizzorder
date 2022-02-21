import { MutableRefObject } from "react"

import { CategoryTag } from "../CategoryTag"
import { PizzaItem } from "../PizzaItem"

interface PizzaListProps {
    pizzas: GrouppedPizzaType;
    sectionRefs: MutableRefObject<(HTMLDivElement | null)[]>;
    onSelectCategory: (id: string) => void;
    onSelectPizza: (id: string) => void;
    onLikeClick: (id: string) => void;
    likedPizzas: string[];
}

export const PizzaList: React.FC<PizzaListProps> = ({ pizzas, onSelectCategory, onSelectPizza, onLikeClick, likedPizzas, sectionRefs }) => {
    return <>
        {
            Object.keys(pizzas).map((category, i) => (
                <div
                    key={category}
                    id={category}
                    ref={(el) => (sectionRefs.current[i] = el)}
                >
                    {/* Category Tag */}
                    <CategoryTag
                        category={category}
                        onClick={() => onSelectCategory(category)}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                        {/* Pizza Listing */}
                        {pizzas[category].map((pizza, i) => (
                            <PizzaItem
                                pizza={pizza}
                                key={i}
                                onClick={() => onSelectPizza(pizza.id!)}
                                liked={likedPizzas.includes(pizza.id!)}
                                toggleLike={onLikeClick}
                            />
                        ))}
                    </div>
                </div>
            ))
        }
    </>
}