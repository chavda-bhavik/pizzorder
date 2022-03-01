import classNames from 'classnames';

import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

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
                    'text-classy-slate': !added,
                })}
            />
            <div className="flex-grow px-2">
                <p>I want to add extra cheese @ 75.00</p>
            </div>
            <Button
                className=""
                variant="secondary"
                size="md"
                onClick={() => onToggle && onToggle(!added)}
            >
                {added ? 'Remove' : 'Add'}
            </Button>
        </div>
    );
};