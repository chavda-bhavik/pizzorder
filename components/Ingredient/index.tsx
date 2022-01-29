import React from 'react'
import Image from 'next/image';

interface IngredientProps {
    content: IngredientItemType;
}

export const Ingredient: React.FC<IngredientProps> = ({ content }) => {
    return (
        <div className="flex flex-col items-center space-y-1 group cursor-pointer">
            <div className="flex flex-col w-max bg-classy-lightBrown bg-opacity-60 border-classy-slate rounded-lg text-center p-2 items-center mb-2">
                <div className="relative w-full min-w-[75px] min-h-[75px] h-full m-2">
                    <Image
                        src={content.imageUrl}
                        alt={content.name}
                        layout="fill"
                        objectFit="contain"
                        className="shadowed"
                    />
                </div>
                <span className="text-base font-sans">
                    {content.name}
                </span>
            </div>
            <button className="border border-classy-slate px-1 rounded-md bg-classy-slate group-hover:bg-classy-golden transition-colors duration-400">
                Remove
            </button>
        </div>
    );
}