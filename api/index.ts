export async function getPizzas(): Promise<
    PizzaItemType[]
> {
    let data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pizzas`
    );
    return data.json() as Promise<PizzaItemType[]>;
}

export async function getPizzaDetails(
    id: string
): Promise<PizzaItemType> {
    let data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pizzas/${id}`
    );
    return data.json() as Promise<PizzaItemType>;
}

export async function getIngredients(): Promise<
    IngredientItemType[]
> {
    let data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ingredients`
    );
    return data.json() as Promise<IngredientItemType[]>;
}
