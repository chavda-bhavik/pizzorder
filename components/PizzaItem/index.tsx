import React from "react";

interface PizzaProps {
	pizza: PizzaItemType;
	onClick?: () => void;
}

export const PizzaItem: React.FC<PizzaProps> = ({ pizza, onClick }) => {
	return (
		<div className="bg-classy-white flex flex-col cursor-pointer rounded shadow-bold hover:shadow-bolder transition-shadow duration-300" onClick={onClick}>
			<div className="relative w-full">
				<img
					src={pizza.imageUrl}
					height={200}
					width={200}
					loading="lazy"
					className="rounded-t-md w-full h-44"
					alt={pizza.title}
				/>
				<div className="absolute bottom-0 left-0 w-20 h-11 bg-shadow" />
				<h4 className="absolute bottom-0 left-0 text-lg font-archivo-semibold text-classy-white pl-1 pb-1 leading-4">
					<span className="rupee">{pizza.prices.medium}</span>
				</h4>
			</div>
			<div className="text-left bg-classy-deemLight p-3 rounded-b-md flex-grow">
				<h3 className="font-archivo-semibold text-lg">
					{pizza.title}
				</h3>
				<p className="text-gray-900 font-sans text-sm leading-4">{pizza.subtitle}</p>
			</div>
		</div>
	);
};
