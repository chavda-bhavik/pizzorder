import type { NextPage } from "next";
import Head from "next/head";
import { PizzaItem } from "@/components/PizzaItem";
import { Header } from "@/components/Header";
import { Search } from "@/components/Search";

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
				<Header />

				{/* Content */}
				<main className="space-y-6 py-2 px-4">
					{/* Shoutout */}
					<h1 className="text-3xl md:text-4xl font-archivo-bold my-2 md:my-4">
						Pizza's that makes your meal delightfull
					</h1>
					<Search />

					{/* Listing */}
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
