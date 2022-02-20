export async function getPizzas(): Promise<GrouppedPizzaType> {
    let data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/pizzas`);
    return data.json() as Promise<GrouppedPizzaType>;
}

export async function getPizzaDetails(id: string): Promise<PizzaItemType> {
    let data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/pizzas/${id}`);
    return data.json() as Promise<PizzaItemType>;
}

export async function getIngredients(): Promise<IngredientItemType[]> {
    let data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ingredients`);
    return data.json() as Promise<IngredientItemType[]>;
}

export async function getConfig(): Promise<ConfigType> {
    let data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/config`);
    return data.json() as Promise<ConfigType>;
}

export async function placeOrder(data: OrderDataType): Promise<OrderDataType | string> {
    let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/place-order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        return response.json() as Promise<OrderDataType>;
    } else {
        throw new Error(response.statusText);
    }
}