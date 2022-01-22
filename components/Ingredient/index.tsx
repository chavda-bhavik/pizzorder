import React from 'react'
import Image from 'next/image';
import { Icon } from '../Icon';

interface IngredientProps {
    content: IngredientItemType | IconsType;
}

export const Ingredient: React.FC<IngredientProps> = ({ content }) => {
    return (
        <div className="flex flex-col w-max bg-classy-lightBrown bg-opacity-60 border-classy-slate rounded-lg text-center px-2 md:px-3 pt-2 md:pt-3 pb-1">
            <div className='relative w-full min-w-[60px] min-h-[60px] h-full text-center flex justify-center items-center'>
                {
                    typeof content === 'string'
                        ? <Icon icon={content} />
                        : <Image src={content.imageUrl} alt={content.name} layout='fill' objectFit='contain' className="shadowed" />
                }
            </div>
            {
                typeof content !== 'string'
                    ? <span className="text-base m-1 font-sans">{content.name}</span>
                    : null
            }
        </div>
    );
}