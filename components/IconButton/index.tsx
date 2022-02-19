import classNames from 'classnames';
import { Icon } from '../Icon';

interface IconButtonProps {
    variant?: 'primary' | 'secondary';
    icon: IconsType;
    iconSize?: IconsSizesType;
    className?: string;
    onClick?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({ variant, icon, iconSize, onClick, className }) => {
    let classes = 'p-2 text-lg font-noto-sans-bold transition-colors duration-300 rounded-full';

    return (
        <button
            className={classNames(classes, {
                'bg-classy-lightGolden hover:bg-classy-golden': variant === 'primary',
                'bg-classy-slate hover:bg-classy-golden': variant === 'secondary',
            }, className)}
            onClick={onClick}
        >
            <Icon icon={icon} size={iconSize} />
        </button>
    );
}