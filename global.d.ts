type IconsType =
	| "plus"
	| "plusCircle"
	| "minus"
	| "check"
	| "close"
	| "shoppingCart"
	| "pizzaSlice"
	| "search"
	| "adjustments";

type IconsSizesType = "sm" | "md" | "lg";

type PizzaItemType = {
	id?: number;
	name: string;
	subName?: string;
	imageUrl: string;
	price: number;
	description?: string;
	ingredients?: IngredientItemType[];
};

type IngredientItemType = {
	id?: number;
	name: string;
	imageUrl: string;
	price: number;
	description?: string;
};

type CartItemType = {
	id?: number;
	pizza: PizzaItemType;
	ingredients?: IngredientItemType[];
	quantity: number;
}