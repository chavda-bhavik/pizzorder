export const toggleOverflowHidden = (show: boolean) => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
};
export const countPizzaPrice = (pizza: PizzaItemType, config: ConfigType, size: PizzaSizeTypes, extraCheese?: boolean, toppings?: string[]): number => {
    let newPrice = pizza.prices[size];
    if (typeof extraCheese !== "undefined") newPrice += config.extraCheesePrice!;
    if (toppings) newPrice += toppings.length * config.toppingPrice;
    return newPrice;
}