import Image from "next/image";
import { Header } from "@/components/Header";
import { Ingredient } from "@/components/Ingredient";
import Switcher from "@/components/Switcher";
import { Icon } from "@/components/Icon";

interface PizzaDetailsProps { }

const PizzaDetails: React.FC<PizzaDetailsProps> = ({ }) => {
	const ingredients: IngredientItemType[] = [
		{
			imageUrl: "/images/ingredients/tomato.png",
			name: "Tomato",
			price: 1.5,
		}, {
			imageUrl: "/images/ingredients/capsicum.png",
			name: "Capsicum",
			price: 1.5,
		}, {
			imageUrl: "/images/ingredients/golden-corn.png",
			name: "Corn",
			price: 1.5,
		}, {
			imageUrl: "/images/ingredients/jalapeno.png",
			name: "Jalapeno",
			price: 1.5,
		}, {
			imageUrl: "/images/ingredients/mashroom.png",
			name: "Mashroom",
			price: 1.5,
		}, {
			imageUrl: "/images/ingredients/olives.png",
			name: "Olives",
			price: 1.5,
		}, {
			imageUrl: "/images/ingredients/onion.png",
			name: "Onion",
			price: 1.5,
		}, {
			imageUrl: "/images/ingredients/paneer.png",
			name: "Paneer",
			price: 1.5,
		}, {
			imageUrl: "/images/ingredients/paprika.png",
			name: "Paprika",
			price: 1.5,
		}
	]
	return (
		<div className="bg-classy-deemLight min-h-screen">
			<Header />
			{/* Content */}
			<main className="py-2">
				<div className="flex justify-center items-center">
					{/* Pizza Image */}
					<div className="h-60 w-60 relative">
						<Image
							src="/images/pizzas/margherita.png"
							layout="fill"
							loading="lazy"
							// layout="responsive"
							className="shadowed object-scale-down"
						/>
					</div>
				</div>
				<div className="bg-classy-white px-4 py-2">
					<div className="grid grid-cols-1 md:grid-cols-2 pt-3">
						{/* Title */}
						<div className="flex flex-col justify-center">
							<h3 className="font-semibold font-sans text-xl md:text-2xl">
								Black Papper Club
							</h3>
							<h4 className="text-2xl font-archivo-light">$199</h4>
						</div>
						{/* Size */}
						<Switcher className="mt-4 md:mt-0">
							<Switcher.Switch title="Small" subTitle="Serves 2" />
							<Switcher.Switch title="Medium" subTitle="Serves 4" active />
							<Switcher.Switch title="Large" subTitle="Serves 7" />
						</Switcher>
					</div>

					{/* Ingredients */}
					<h4 className="font-semibold text-lg md:text-xl mt-8 mb-3">Ingredients</h4>
					<div className="flex flex-row gap-x-1 md:gap-x-2 overflow-auto">
						{
							ingredients.map((ingredient, index) => <Ingredient content={ingredient} key={index} />)
						}
						<Ingredient content="plusCircle" />
					</div>

					{/* About */}
					<h4 className="font-semibold text-lg md:text-xl mt-8 mb-3">About</h4>
					<div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget fringilla lectus. Aenean ut lectus gravida, suscipit lacus vitae, pretium ex. Donec eget libero sit amet ex malesuada vestibulum.</p>
						<p>Morbi pellentesque nulla justo, ut posuere odio gravida quis. Mauris tempus sem sed lectus euismod fringilla. Donec vitae nisl non purus maximus tempor egestas non orci. Ut rhoncus sit amet magna id elementum. Vivamus euismod rhoncus suscipit. Phasellus volutpat scelerisque dolor sit amet rutrum. Duis sed viverra neque.</p>
						<p>Phasellus dapibus molestie dignissim. Aliquam pellentesque sollicitudin ultrices.Quisque dapibus eget mi non ornare. Morbi vel venenatis neque. </p>
						<p>Quisque aliquet leo at luctus varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc non gravida magna, sit amet varius justo. Nunc porttitor nec ligula et sollicitudin.</p>
						<p>Pellentesque at fermentum lorem. Nunc ornare consectetur malesuada. Aliquam id odio nisl. Nulla ultrices id libero sit amet pharetra. Aliquam id lacus luctus, malesuada orci quis, efficitur nibh. Duis dictum nec orci vel euismod. Proin tincidunt accumsan nisi sit amet finibus.</p>
					</div>
					<div className="sticky bottom-0 p-2 bg-glassmorphic bg-opacity-50 mt-3">
						<button className="rounded-2xl bg-classy-golden text-black p-2 text-center w-full font-archivo-bold text-lg flex flex-row justify-center items-center gap-x-1">
							Add To Cart <Icon icon="plusCircle" size="sm" />
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default PizzaDetails;
