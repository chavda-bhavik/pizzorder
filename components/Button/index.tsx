import classNames from 'classnames';

import { Icon } from '../Icon';

interface ButtonProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary';
    block?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    customContent?: any;
}

export const Button: React.FC<ButtonProps> = ({
    onClick,
    type,
    size = 'md',
    variant = 'primary',
    block = false,
    loading,
    disabled,
    className,
    children,
}) => {
    let loader = <Icon icon="loader" size={size} className="ml-1" />;
    return (
        <button
            className={classNames(
                'btn',
                {
                    'btn-primary': variant === 'primary',
                    'btn-secondary': variant === 'secondary',
                    'btn-disabled': disabled || loading,
                    'btn-sm': size === 'sm',
                    'btn-md': size === 'md',
                    'btn-lg': size === 'lg',
                    'w-full': block,
                },
                className
            )}
            disabled={loading || disabled}
            type={type}
            onClick={onClick}
        >
            {loading ? loader : children}
        </button>
    );
};