import { Icon } from '@/components/Icon';
import classNames from 'classnames';

interface CheeseSelectorProps {
    added?: boolean;
    onToggle?: (value: boolean) => void;
}

export const CheeseSelector: React.FC<CheeseSelectorProps> = ({ added = false, onToggle }) => {
    return (
        <div className="p-2 flex flex-row w-full border border-classy-slate rounded items-center">
            <Icon
                icon="checkFill"
                size="sm"
                className={classNames({
                    'text-green-700': added,
                    'text-classy-slate': !added
                })}
            />
            <div className="flex-grow px-2">
                <p>I want to add extra cheese @ 75.00</p>
            </div>
            <button
                className="border border-classy-slate px-2 py-1 rounded-md bg-classy-slate hover:bg-classy-golden transition-colors duration-400"
                onClick={() => onToggle && onToggle(!added)}
            >
                {added ? 'Remove' : 'Add'}
            </button>
        </div>
    );
}