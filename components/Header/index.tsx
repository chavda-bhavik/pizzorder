import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = ({ }) => {
	const cartContext = useContext(CartContext);
	return (
		<header className="py-4 px-2 flex flex-row justify-between border-b border-slate-200 bg-glassmorphic sticky top-0 bg-glassmorphic z-10 shadow-md shadow-classy-slate">
			<Link href="/" prefetch>
				<a>
					<Icon
						icon="pizzaSlice"
						className="cursor-pointer hover:text-classy-golden transition-colors duration-300"
					/>
				</a>
			</Link>
			<Link href='/cart'>
				<a className="relative block group cursor-pointer">
					<div className="absolute right-0 -top-2  transition-colors duration-300 bg-classy-slate group-hover:bg-classy-lightGolden rounded-full px-1 text-xs font-sans font-bold">
						{cartContext?.items.reduce((sum, item) => sum + item.quantity, 0) || ''}
					</div>
					<Icon
						icon="shoppingCart"
						className="group-hover:text-classy-golden transition-colors duration-300"
					/>
				</a>
			</Link>
		</header>
	);
};
