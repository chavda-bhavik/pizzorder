import { useState, useContext, useEffect } from 'react';
import type { NextPage, GetStaticProps } from "next";
import dynamic from 'next/dynamic'

import { Search } from '@/components/Search';
import { Layout } from '@/components/Layout';
import { PizzaItem } from "@/components/PizzaItem";
import { getPizzas, getPizzaDetails } from '@/api';
import { PizzaContext } from '@/context/PizzaContext';

const DynamicPizzaDetails = dynamic(() => import('@/components/PizzaDetails'), { ssr: false });

interface HomeProps {
    pizzas: PizzaItemType[];
}

const Home: NextPage<HomeProps> = ({ pizzas }) => {
    const [open, setOpen] = useState(false);
    const pizzaContext = useContext(PizzaContext);

    useEffect(() => {
        pizzaContext?.storePizzas(pizzas);
    }, [pizzaContext, pizzas]);

    const handleSelectPizza = async (id: string) => {
        try {
            let pizza = await getPizzaDetails(id);
            pizzaContext?.storePizzaDetails(pizza);
            setOpen(true);
        } catch (error) {}
    };

    return (
        <Layout>
            <main className="space-y-6 py-2 px-4">
                {/* Shoutout */}
                <h1 className="text-3xl md:text-4xl font-archivo-bold my-2 md:my-4">
                    Pizza&apos;s that makes your meal delightfull
                </h1>
                <Search />

                {/* Listing */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                    {/* Pizza */}
                    {pizzas &&
                        pizzas.map((pizza, i) => (
                            <PizzaItem
                                pizza={pizza}
                                key={i}
                                onClick={() => handleSelectPizza(pizza.id)}
                            />
                        ))}
                </div>
            </main>
            {open && (
                <DynamicPizzaDetails
                    onClose={() => setOpen(false)}
                    show={true}
                    pizza={pizzaContext?.pizzaDetails!}
                    ingredients={pizzaContext?.ingredients!}
                />
            )}
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    let pizzas: PizzaItemType[] = [];
    try {
        pizzas = await getPizzas();
        return {
            props: {
                pizzas,
            },
        };
    } catch (error) {
        return {
            props: {
                pizzas,
            },
        };
    }
};

export default Home;
