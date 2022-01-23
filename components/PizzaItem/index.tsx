import React from "react";
import Image from "next/image";

interface PizzaProps {
	pizza: PizzaItemType;
}

export const PizzaItem: React.FC<PizzaProps> = ({ pizza }) => {
	return (
		<div className="bg-classy-white drop px-2 py-4 flex flex-col cursor-pointer rounded-md group shadow-bolder">
			<div className="flex items-center justify-center rounded-t-lg flex-grow">
				<Image
					src={pizza.imageUrl}
					height={200}
					width={200}
					loading="lazy"
					// layout="responsive"
					className="shadowed w-36"
					alt={pizza.name}
				/>
			</div>
			<div className="pt-4">
				<div className="flex flex-col flex-grow text-center">
					<h3 className="font-semibold text-xl text-classy-golden">
						{pizza.name}
					</h3>
					<h4 className="text-lg md:text-xl font-base">
						${parseFloat("" + pizza.price).toFixed(2)}
					</h4>
				</div>
				{/* <Icon icon="plus" className="ml-1 text-primary-golden" /> */}
				{/* <p className="text-base">{pizza.subName}</p> */}
			</div>
		</div>
	);
};
