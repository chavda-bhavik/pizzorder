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

type PizzaItemType = {
    id?: string;
    title: string;
    subtitle?: string;
    imageUrl: string;
    price: number;
    ingredients?: IngredientItemType[];
};

type IngredientItemType = {
    id?: number;
    name: string;
    imageUrl: string;
};

type CartItemType = {
    id?: number;
    pizza: PizzaItemType;
    ingredients?: IngredientIngredientItemTypeItemType[];
    quantity: number;
};

declare module 'react-credit-card-input';
