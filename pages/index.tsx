import { useState, useContext, useEffect } from 'react';
import type { NextPage, GetStaticProps } from "next";

import { Search } from '@/components/Search';
import { Layout } from '@/components/Layout';
import { PizzaItem } from "@/components/PizzaItem";
import { PizzaDetails } from '@/components/PizzaDetails';
import { getPizzas, getIngredients, getPizzaDetails } from '@/api';
import { PizzaContext } from '@/context/PizzaContext';

interface HomeProps {
    pizzas: PizzaItemType[];
    ingredients: IngredientItemType[];
}

const Home: NextPage<HomeProps> = ({ pizzas, ingredients }) => {
    const [open, setOpen] = useState(false);
    const pizzaContext = useContext(PizzaContext);

    useEffect(() => {
        pizzaContext?.storePizzas(pizzas);
        pizzaContext?.storeIngredients(ingredients);
    }, [pizzaContext, pizzas, ingredients])

    const handleSelectPizza = async (id: string) => {
        try {
            let pizza = await getPizzaDetails(id);
            pizzaContext?.storePizzaDetails(pizza);
            setOpen(true);
        } catch (error) {

        }
    }

    return (
        <Layout>
            <main className="space-y-6 py-2 px-4">
                {/* Shoutout */}
                <h1 className="text-3xl md:text-4xl font-archivo-bold my-2 md:my-4">
                    Pizza&apos;s that makes your meal
                    delightfull
                </h1>
                <Search />

                {/* Listing */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                    {/* Pizza */}
                    {pizzas && pizzas.map((pizza, i) => (
                        <PizzaItem
                            pizza={pizza}
                            key={i}
                            onClick={() => handleSelectPizza(pizza.id)}
                        />
                    ))}
                </div>
            </main>
            {
                open && <PizzaDetails
                    onClose={() => setOpen(false)}
                    show={true}
                    pizza={pizzaContext?.pizzaDetails!}
                    ingredients={ingredients}
                />
            }
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    let pizzas: PizzaItemType[] = [];
    let ingredients: IngredientItemType[] = [];
    try {
        pizzas = await getPizzas();
        ingredients = await getIngredients();
        return {
            props: {
                pizzas,
                ingredients
            }
        }
    } catch (error) {
        return {
            props: {
                pizzas,
                ingredients
            }
        }
    }
};

export default Home;
