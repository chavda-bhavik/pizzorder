import classNames from 'classnames';

interface CategoryTagProps {
    category: string;
    className?: string;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ category, className }) => {
    return (
        <div className={classNames('mt-4 mb-2 border-b-2 border-classy-slate', className)}>
            <h2
                className="block text-classy-black font-sans font-semibold text-lg uppercase bg-classy-golden px-4 py-1 w-max rounded-t-xl cursor-default"
            >
                {category}
            </h2>
        </div>
    );
};
