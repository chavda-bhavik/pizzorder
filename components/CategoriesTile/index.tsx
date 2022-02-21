import classNames from 'classnames';

interface CategoriesTileProps {
    pizzas: GrouppedPizzaType;
    selectedIndex?: number;
    onSelect: (id: string) => void;
}

export const CategoriesTile: React.FC<CategoriesTileProps> = ({ pizzas, selectedIndex, onSelect }) => {
    return (
        <div className="space-x-1 overflow-y-auto flex flex-row px-4 pt-2 pb-1 max-w-7xl sticky top-0 z-20 bg-classy-deemLight   border-b-4 border-classy-slate">
            {Object.keys(pizzas).map((category, i) => (
                <h1
                    className={classNames('category-title', {
                        'category-selected': i === selectedIndex,
                    })}
                    onClick={() => onSelect(category)}
                    key={category}
                >
                    {category}
                </h1>
            ))}
        </div>
    );
}