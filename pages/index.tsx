import { useState, useContext, useEffect } from 'react';
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'

import { Drawer } from '@/components/Drawer';
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
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const pizzaContext = useContext(PizzaContext);

    useEffect(() => {
        pizzaContext?.storePizzas(pizzas);
    }, [pizzaContext, pizzas]);

    useEffect(() => {
        (async () => {
            if (router.query.id) {
                const data = await getPizzaDetails(router.query.id as string);
                pizzaContext?.storePizzaDetails(data);
                setOpen(true);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query.id]);

    const handleSelectPizza = async (id: string) => {
        try {
            let pizza = await getPizzaDetails(id);
            pizzaContext?.storePizzaDetails(pizza);
            setOpen(true);
            router.push(
                {
                    pathname: '/',
                    query: {
                        id,
                    },
                },
                undefined,
                { shallow: true }
            );
        } catch (error) {}
    };
    const handleClose = () => {
        setOpen(false);
        router.push('/', undefined, { shallow: true });
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 max-w-7xl">
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

            <Drawer open={open} onClose={handleClose}>
                <DynamicPizzaDetails
                    onClose={handleClose}
                    show={open}
                    pizza={pizzaContext?.pizzaDetails!}
                    ingredients={pizzaContext?.ingredients!}
                />
            </Drawer>
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
