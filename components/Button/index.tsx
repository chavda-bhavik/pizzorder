import classNames from 'classnames';

import { Icon } from '../Icon';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    icon?: IconsType;
    iconSize?: IconsSizesType;
    variant?: 'primary'
    block?: boolean
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, type, icon, iconSize, variant = 'primary', block = false }) => {
    return (
        <button
            className={classNames("btn", {
                'btn-primary': variant === 'primary',
                'w-full': block
            })}
            type={type}
            onClick={onClick}
        >
            {text} {icon ? <Icon icon={icon} size={iconSize} /> : null}
        </button>
    );
}