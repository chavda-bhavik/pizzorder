import Image from 'next/image';
import { Icon } from '../Icon';

interface PizzaProps {
    pizza: PizzaItemType;
    onClick?: () => void;
    liked?: boolean;
    toggleLike?: (id: string) => void;
}

export const PizzaItem: React.FC<PizzaProps> = ({ pizza, onClick, toggleLike, liked }) => {
    const onLikeClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (toggleLike) {
            toggleLike(pizza.id);
        }
    };
    return (
        <div
            className="bg-classy-white flex flex-col cursor-pointer border border-classy-slate shadow-sm shadow-classy-slate rounded-md duration-300"
            onClick={onClick}
        >
            <div className="relative w-full h-36 sm:h-40 lg:h-44">
                <Image
                    src={pizza.imageUrl}
                    loading="lazy"
                    className="rounded-t-md"
                    alt={pizza.title}
                    layout="fill"
                />
                <div className="absolute bottom-0 left-0 w-20 h-11 bg-shadow" />
                <div className="absolute bottom-0 left-0 text-lg font-noto-sans-bold text-classy-white pl-1 pb-1 leading-4">
                    <span className="rupee">{pizza.prices.medium}</span>
                </div>
                <div className="absolute top-0 right-0 h-10 w-11 bg-shadow rotate-180" />
                <button className="absolute right-2 top-1 h-5 w-5" onClick={onLikeClick}>
                    <Icon
                        icon={liked ? 'heartFill' : 'heart'}
                        className={liked ? 'text-red-500' : 'text-white'}
                        size="sm"
                    />
                </button>
            </div>
            <div className="text-left pt-2 px-3 pb-4 rounded-b-md flex-grow">
                <h2 className="font-sans font-semibold text-lg mb-1">{pizza.title}</h2>
                <p className="text-gray-900 font-sans text-sm leading-4">{pizza.subtitle}</p>
            </div>
        </div>
    );
};
