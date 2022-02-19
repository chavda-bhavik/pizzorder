import classNames from 'classnames';

import { Icon } from '../Icon';

interface ButtonProps {
    text?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    icon?: IconsType;
    iconSize?: IconsSizesType;
    variant?: 'primary';
    block?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    customContent?: any;
}

export const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    type,
    icon,
    iconSize,
    variant = 'primary',
    block = false,
    loading,
    disabled,
    className,
}) => {
    let iconContent = null;
    if (icon) iconContent = <Icon icon={icon} size={iconSize} className="ml-1" />;
    if (loading) iconContent = <Icon icon="loader" size={iconSize} className="ml-1" />;
    return (
        <button
            className={classNames(
                'btn',
                {
                    'btn-primary': variant === 'primary',
                    'btn-disabled': disabled || loading,
                    'w-full': block,
                },
                className
            )}
            disabled={loading || disabled}
            type={type}
            onClick={onClick}
        >
            {text}
            {iconContent}
        </button>
    );
};