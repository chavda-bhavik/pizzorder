type IconsType =
	| "plus"
	| "plusCircle"
	| "close"
	| "shoppingCart"
	| "pizzaSlice"
	| "search"
	| "adjustments";

type IconsSizesType = "sm" | "md" | "lg";

type PizzaItemType = {
	id?: number;
	name: string;
	subName: string;
	imageUrl: string;
	price: number;
	description?: string;
};

type IngredientItemType = {
	id?: number;
	name: string;
	imageUrl: string;
	price: number;
	description?: string;
};