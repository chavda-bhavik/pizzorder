import React from 'react'
import Image from 'next/image';

interface IngredientProps {
    content: IngredientItemType;
}

export const Ingredient: React.FC<IngredientProps> = ({ content }) => {
    return (
        <div className='flex flex-col items-center space-y-1 group cursor-pointer'>
            <div className="flex flex-col w-max bg-classy-lightBrown bg-opacity-60 border-classy-slate rounded-lg text-center px-2 md:px-3 pt-2 md:pt-3 pb-1">
                <div className='relative w-full min-w-[60px] min-h-[60px] h-full text-center flex justify-center items-center'>
                    <Image src={content.imageUrl} alt={content.name} layout='fill' objectFit='contain' className="shadowed" />
                </div>
                <span className="text-base font-sans">{content.name}</span>
            </div>
            <button className='border border-classy-slate px-1 rounded-md bg-classy-slate group-hover:bg-classy-golden transition-colors duration-400'>Remove</button>
        </div>
    );
}