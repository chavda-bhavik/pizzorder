import React, { useState, createContext } from 'react';

export interface PizzaContextType {
    show: boolean;
    editing: boolean;
    likedPizzas: string[];
    pizzas: PizzaItemType[];
    ingredients: IngredientItemType[];
    pizzaDetails?: PizzaItemType;
    customizationDetails: CustomizationDetails;

    hide: () => void;
    toggleLike: (id: string) => void;
    storePizzas: (pizzas: PizzaItemType[]) => void;
    storePizzaDetails: (pizza: PizzaItemType, details?: CustomizationDetails) => void;
    updateCustomizationDetails: (customizationDetails: CustomizationDetails) => void;
    storeIngredients: (ingredients: IngredientItemType[]) => void;
}

export const PizzaContext = createContext<PizzaContextType | null>(null);

interface PizzaContextProps {
    ingredientsData: IngredientItemType[];
}

const PizzaProvider: React.FC<PizzaContextProps> = ({ children, ingredientsData }) => {
    const [show, setShow] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [details, setDetails] = useState<PizzaItemType>();
    const [likedPizzas, setLikedPizzas] = useState<string[]>([]);
    const [pizzas, setPizzas] = useState<PizzaItemType[]>([]);
    const [customizationDetails, setCustomizationDetails] = useState<CustomizationDetails>({
        extraCheese: false,
        toppings: [],
        price: 0,
    });
    const [ingredients, setIngredients] = useState<IngredientItemType[]>(ingredientsData);

    const storePizzas = (pizzas: PizzaItemType[]) => {
        setPizzas(pizzas);
    };
    const storePizzaDetails = (pizza: PizzaItemType, details?: CustomizationDetails) => {
        setDetails(pizza);
        if (details) {
            setCustomizationDetails(details);
            setEditing(true);
        } else {
            setCustomizationDetails({
                extraCheese: false,
                toppings: [],
                price: pizza.prices.medium,
                size: 'medium',
            });
            setEditing(false);
        }
        setShow(true);
    };
    const updateCustomizationDetails = (customizationDetails: CustomizationDetails) => {
        setCustomizationDetails(customizationDetails);
    };
    const storeIngredients = (ingredients: IngredientItemType[]) => {
        setIngredients(ingredients);
    };
    const toggleLike = (id: string) => {
        if (likedPizzas.includes(id)) {
            setLikedPizzas(likedPizzas.filter((pizzaId) => pizzaId !== id));
        } else {
            setLikedPizzas([...likedPizzas, id]);
        }
    };

    const contextValue: PizzaContextType = {
        show,
        pizzas,
        editing,
        ingredients,
        likedPizzas,
        customizationDetails,
        pizzaDetails: details,

        hide: () => setShow(false),
        toggleLike,
        storePizzas,
        storeIngredients,
        storePizzaDetails,
        updateCustomizationDetails,
    };

    return <PizzaContext.Provider value={contextValue}>{children}</PizzaContext.Provider>;
};

export default PizzaProvider;
