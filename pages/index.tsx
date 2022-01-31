import { useState } from 'react';
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { PizzaItem } from "@/components/PizzaItem";
import { Header } from "@/components/Header";
import { Search } from '@/components/Search';
import { PizzaDetails } from '@/components/PizzaDetails';
import { getPizzas } from '@/api';

interface HomeProps {
    pizzas?: PizzaItemType[];
}

const Home: NextPage<HomeProps> = ({ pizzas }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Head>
                <title>Pizzorder</title>
                <meta
                    name="description"
                    content="Get your faviourite pizza delivered to your door step in just a few minutes with Pizzorder"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-classy-deemLight min-h-screen">
                <Header />

                {/* Content */}
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
                                onClick={() =>
                                    setOpen(!open)
                                }
                            />
                        ))}
                    </div>
                </main>
            </div>
            {
                pizzas && <PizzaDetails
                    onClose={() => setOpen(false)}
                    show={open}
                    pizza={pizzas[0]}
                />
            }
        </div>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    let data = await getPizzas();
    if (data) {
        return {
            props: {
                pizzas: data
            }
        }
    }
    return {
        props: {

        }
    };
};

export default Home;
