import classNames from 'classnames';

interface CategoryTagProps {
    category: string;
    className?: string;
    onClick?: () => void;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ category, className, onClick }) => {
    return (
        <div className={classNames('mt-4 mb-2 border-b-2 border-classy-slate', className)}>
            <h2
                onClick={() => onClick && onClick()}
                className="block text-classy-black font-sans font-semibold text-lg uppercase bg-classy-golden px-4 py-1 w-max rounded-t-xl hover:bg-classy-slate hover:text-classy-white cursor-pointer transition-colors duration-300"
            >
                {category}
            </h2>
        </div>
    );
};
