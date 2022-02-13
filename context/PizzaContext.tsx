import React, { useState, createContext } from 'react';

export interface PizzaContextType {
    pizzas: PizzaItemType[];
    ingredients: IngredientItemType[];
    pizzaDetails?: PizzaItemType;

    storePizzas: (pizzas: PizzaItemType[]) => void;
    storePizzaDetails: (pizza: PizzaItemType) => void;
    storeIngredients: (ingredients: IngredientItemType[]) => void;
}

export const PizzaContext = createContext<PizzaContextType | null>(null);

interface PizzaContextProps {
    ingredientsData: IngredientItemType[];
}

const PizzaProvider: React.FC<PizzaContextProps> = ({ children, ingredientsData }) => {
    const [pizzas, setPizzas] = useState<PizzaItemType[]>([]);
    const [details, setDetails] = useState<PizzaItemType>();
    const [ingredients, setIngredients] = useState<IngredientItemType[]>(ingredientsData);

    const storePizzas = (pizzas: PizzaItemType[]) => {
        setPizzas(pizzas);
    };
    const storePizzaDetails = (pizza: PizzaItemType) => {
        setDetails(pizza);
    };
    const storeIngredients = (ingredients: IngredientItemType[]) => {
        setIngredients(ingredients);
    };

    const contextValue: PizzaContextType = {
        pizzas,
        ingredients,
        pizzaDetails: details,

        storePizzas,
        storePizzaDetails,
        storeIngredients,
    };

    return <PizzaContext.Provider value={contextValue}>{children}</PizzaContext.Provider>;
};

export default PizzaProvider;
