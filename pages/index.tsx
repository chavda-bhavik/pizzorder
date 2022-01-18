import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { PizzaItem } from "@/components/PizzaItem";

const Home: NextPage = () => {
	let pizzas: PizzaItemType[] = [
		{
			name: "Margherita",
			subName: "",
			price: 9,
			imageUrl: "/images/pizzas/margherita.png",
		},
		{
			name: "Capricciosa",
			subName: "",
			price: 12,
			imageUrl: "/images/pizzas/capricciosa.png",
		},
		{
			name: "Quattro Stagioni",
			subName: "",
			price: 14,
			imageUrl: "/images/pizzas/quattro-stagioni.png",
		},
		{
			name: "Hawaii",
			subName: "",
			price: 16,
			imageUrl: "/images/pizzas/hawaii.png",
		},
		{
			name: "Pugliese",
			subName: "",
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
				{/* Header */}
				<header className="py-4 px-2 flex flex-row justify-between border-b border-slate-200 bg-glassmorphic sticky top-0 bg-glassmorphic z-50">
					<Icon icon="pizzaSlice" className="cursor-pointer" />
					<Icon icon="shoppingCart" className="cursor-pointer" />
				</header>
				{/* Content */}
				<main className="space-y-6 py-2 px-4">
					{/* Shoutout */}
					<h1 className="font-semibold text-3xl md:text-4xl">
						Pizza's that makes <br /> your meal delightfull
					</h1>
					{/* Search */}
					<div className="flex flex-row w-full items-center">
						<div className="flex flex-row bg-classy-white items-center rounded-3xl border-2 border-classy-deemLight h-12 flex-grow focus-within:ring-1 ring-classy-golden transition-all duration-300 focus-within:border-classy-golden">
							<Icon icon="search" className="m-2" size="sm" />
							<input
								type="search"
								className="w-full flex-grow bg-classy-white h-full p-1 focus:outline-none focus:placeholder-transparent focus:ring-0 rounded-r-3xl"
								placeholder="Search for pizza's"
							/>
						</div>
						<Icon icon="adjustments" className="m-2" size="sm" />
					</div>
					{/* Listing */}
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
						{/* Pizza */}
						{pizzas.map((pizza, i) => (
							<PizzaItem pizza={pizza} key={i} />
						))}
					</div>
				</main>
			</div>
		</div>
	);
};

export default Home;
