type IconsType =
    | 'plus'
    | 'plusCircle'
    | 'minus'
    | 'check'
    | 'close'
    | 'shoppingCart'
    | 'pizzaSlice'
    | 'search'
    | 'loader'
    | 'adjustments'
    | 'chevronUp'
    | 'chevronDown'
    | 'trash'
    | 'heart'
    | 'checkFill'
    | 'shoppingCartCheckFill';

type IconsSizesType = 'sm' | 'md' | 'lg';

type PizzaSizeTypes = 'small' | 'medium' | 'large';

type PizzaItemType = {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    prices: {
        [key in PizzaSizeTypes]: number;
    };
    extraCheeseAvailabe: boolean;
};

type IngredientItemType = {
    id: string;
    name: string;
    imageUrl: string;
};

type CartItemType = {
    quantity: number;
    pizza: Partial<PizzaItemType>;
    extraCheese?: Boolean;
    ingredients?: string[];
    size?: PizzaSizeTypes;
    price: number;
};

interface CustomizationDetails {
    extraCheese: boolean;
    size: PizzaSizeTypes;
    toppings: string[];
    price: number;
}

interface TotalInfo {
    total: number;
    subtotal: number;
    tax: number;
    deliveryCharge: number;
}

declare module 'react-credit-card-input';
