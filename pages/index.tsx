import { useState } from 'react';
import type { NextPage } from "next";
import Head from "next/head";
import { PizzaItem } from "@/components/PizzaItem";
import { Header } from "@/components/Header";
import { Search } from "@/components/Search";
import { Drawer } from "@/components/Drawer";
import { PizzaDetails } from '@/components/PizzaDetails';

const Home: NextPage = () => {
	const [open, setOpen] = useState(false);
	let pizzas: PizzaItemType[] = [
		{
			name: "Margherita",
			subName: "A classic delight with 100% Real mozzarella cheese",
			price: 9,
			imageUrl: "/images/pizzas/margherita.png",
		},
		{
			name: "Capricciosa",
			subName: "Veg delight - onion, capsicum, grilled mushroom, corn & paneer",
			price: 12,
			imageUrl: "/images/pizzas/capricciosa.jpg",
		},
		{
			name: "Quattro Stagioni",
			subName: "Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese",
			price: 14,
			imageUrl: "/images/pizzas/quattro-stagioni.png",
		},
		{
			name: "Hawaii",
			subName: "Mexican herbs sprinkled on onion, capsicum, tomato & jalapeno",
			price: 16,
			imageUrl: "/images/pizzas/hawaii.png",
		},
		{
			name: "Pugliese",
			subName: "The awesome foursome! Golden corn, black olives, capsicum, red paprika",
			price: 17,
			imageUrl: "/images/pizzas/pugliese.png",
		},
	];
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
                        {pizzas.map((pizza, i) => (
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
            <PizzaDetails
                onClose={() => setOpen(false)}
                show={open}
                pizza={pizzas[0]}
            />
            {/* <Drawer open={open} onClose={() => setOpen(false)}>
			</Drawer> */}
        </div>
    );
};

export default Home;
