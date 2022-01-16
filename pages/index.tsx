import type { NextPage } from 'next'
import Head from "next/head";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import PizzaImage from "@/assets/5-margharita.png";

const Home: NextPage = () => {
	return (
		<div className="min-h-scree p-1">
			<Head>
				<title>Pizzorder</title>
				<meta
					name="description"
					content="Get your faviourite pizza delivered to your door step in just a few minutes with Pizzorder"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="bg-primary-deemLight rounded-md">
				<header className="p-2 flex flex-row justify-between">
					<Icon icon="pizzaSlice" />
					<Icon icon="shoppingCart" />
				</header>
				<main>
					<h1>Pizza's that makes your meal delightfull</h1>
					<div className="flex flex-row w-full items-center">
						<div className="flex flex-row bg-primary-white items-center rounded-3xl border-2 border-primary-deemLight h-12 flex-grow">
							<Icon icon="search" className="m-2" size="sm" />
							<input
								type="search"
								className="w-full flex-grow bg-primary-white h-full py-1 px-2 outline-none rounded-r-3xl"
								placeholder="Search for pizza's"
							/>
						</div>
						<Icon icon="adjustments" className="m-2" size="sm" />
					</div>
					<div className="grid grid-cols-3 space-y-2 space-x-2 p-2">
						{/* Pizza */}
						<div className="bg-primary-white rounded-md drop-shadow-lg">
							<div className="p-2 text-center">
								<Image
									src={PizzaImage}
									height={200}
									width={200}
									className="drop-shadow-xl m-1"
								/>
							</div>
							<div className="p-2">
								<div className="flex flex-row w-full">
									<div className="flex flex-col flex-grow">
										<h3 className="font-semibold text-3xl">
											Black Papper Club
										</h3>
										<h4 className="text-2xl font-medium">
											<span className="text-sm text-primary-golden align-top">
												$
											</span>
											199
										</h4>
									</div>
									<Icon
										icon="plus"
										className="m-2 text-primary-golden"
									/>
								</div>
								<p>Cheeze pizza with black papper crust</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Home
