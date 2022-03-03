import { useEffect, useRef } from "react"

import { CategoryTag } from "@/components/CategoryTag"
import { PizzaItem } from "@/components/PizzaItem"

interface PizzaListProps {
    category?: string;
    likedPizzas: string[];
    pizzas: Partial<PizzaItemType>[];
    onSelectPizza: (id: string) => void;
    onLikeClick?: (id: string) => void;
    setSize: (size: number) => void;
}

export const PizzaList: React.FC<PizzaListProps> = ({ pizzas, category, onSelectPizza, onLikeClick, likedPizzas, setSize }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSize(itemRef.current?.getBoundingClientRect().height || 0);
        // eslint-disable-next-line
    }, []);

    return <div
        key={category}
        id={category}
        className="p-2 max-w-7xl"
        ref={itemRef}
    >
        {/* Category Tag */}
        {category && <CategoryTag
            category={category}
        />}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {/* Pizza Listing */}
            {pizzas.map((pizza, i) => (
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
}