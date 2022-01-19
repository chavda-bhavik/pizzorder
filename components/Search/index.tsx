import React from "react";
import { Icon } from "../Icon";

interface Search {}

export const Search: React.FC<Search> = ({}) => {
	return (
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
	);
};
