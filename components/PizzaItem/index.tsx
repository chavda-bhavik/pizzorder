import Image from 'next/image';

interface PizzaProps {
    pizza: PizzaItemType;
    onClick?: () => void;
}

export const PizzaItem: React.FC<PizzaProps> = ({ pizza, onClick }) => {
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
                <h4 className="absolute bottom-0 left-0 text-lg font-noto-sans-bold text-classy-white pl-1 pb-1 leading-4">
                    <span className="rupee">{pizza.prices.medium}</span>
                </h4>
            </div>
            <div className="text-left pt-2 px-3 pb-4 rounded-b-md flex-grow">
                <h3 className="font-sans font-semibold text-lg mb-1">{pizza.title}</h3>
                <p className="text-gray-900 font-sans text-sm leading-4">{pizza.subtitle}</p>
            </div>
        </div>
    );
};
