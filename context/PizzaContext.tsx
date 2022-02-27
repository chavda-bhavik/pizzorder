import useLocalStorage from '@/util/hooks/useLocalStorage';
import { useRouter } from 'next/router';
import React, { useState, createContext } from 'react';

export interface PizzaContextType {
    show: boolean;
    editing: boolean;
    likedPizzas: string[];
    ingredients?: IngredientItemType[];
    pizzaDetails?: PizzaItemType;
    customizationDetails: CustomizationDetails;

    toggleDrawer: (id?: string) => void;
    toggleLike: (id: string) => void;
    storePizzaDetails: (pizza: PizzaItemType, details?: CustomizationDetails) => void;
    updateCustomizationDetails: (customizationDetails: CustomizationDetails) => void;
    storeIngredients: (ingredients: IngredientItemType[]) => void;
}

export const PizzaContext = createContext<PizzaContextType | null>(null);

interface PizzaContextProps {}

const PizzaProvider: React.FC<PizzaContextProps> = ({ children }) => {
    const router = useRouter();
    const [show, setShow] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [details, setDetails] = useState<PizzaItemType>();
    const [likedPizzas, setLikedPizzas] = useLocalStorage<string[]>('likes', []);
    const [customizationDetails, setCustomizationDetails] = useState<CustomizationDetails>({
        extraCheese: false,
        toppings: [],
        price: 0,
    });
    const [ingredients, setIngredients] = useState<IngredientItemType[]>();

    const storePizzaDetails = (pizza: PizzaItemType, details?: CustomizationDetails) => {
        setDetails(pizza);
        if (details) {
            setCustomizationDetails(details);
            setEditing(true);
        } else {
            setCustomizationDetails({
                extraCheese: false,
                toppings: [],
                price: pizza.prices.medium ? pizza.prices.medium : pizza.prices.small!,
                size: pizza.prices.medium ? 'medium' : 'small',
            });
            setEditing(false);
        }
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
    const handleToggle = (id?: string) => {
        let queryObj = router.query;
        if (!show && id) {
            queryObj.id = id;
        } else {
            delete queryObj.id;
        }
        router.push(
            {
                pathname: router.pathname,
                query: queryObj,
            },
            undefined,
            { shallow: true }
        );
        setShow(!show);
    };

    const contextValue: PizzaContextType = {
        show,
        editing,
        ingredients,
        likedPizzas,
        customizationDetails,
        pizzaDetails: details,

        toggleDrawer: handleToggle,
        toggleLike,
        storeIngredients,
        storePizzaDetails,
        updateCustomizationDetails,
    };

    return <PizzaContext.Provider value={contextValue}>{children}</PizzaContext.Provider>;
};

export default PizzaProvider;
