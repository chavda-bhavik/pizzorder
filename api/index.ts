export async function getPizzas(): Promise<
    PizzaItemType[]
> {
    let data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pizzas`
    ).then((res) => res.json());
    return data as PizzaItemType[];
}
