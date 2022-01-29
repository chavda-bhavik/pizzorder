import React from "react";
import { Icon } from "../Icon";

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = ({ }) => {
	return (
		<header className="py-4 px-2 flex flex-row justify-between border-b border-slate-200 bg-glassmorphic sticky top-0 bg-glassmorphic z-10 shadow-md shadow-classy-slate">
			<Icon
				icon="pizzaSlice"
				className="cursor-pointer hover:text-classy-golden transition-colors duration-300"
			/>
			<Icon
				icon="shoppingCart"
				className="cursor-pointer hover:text-classy-golden transition-colors duration-300"
			/>
		</header>
	);
};
