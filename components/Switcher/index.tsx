import classNames from 'classnames';

interface SwitcherProps {
    className?: string;
}

interface SwitchProps {
    onClick?: () => void;
    active?: boolean;
    title: string;
    subTitle?: string;
    className?: string;
}

const Switch: React.FC<SwitchProps> = ({
    onClick = () => {},
    active = false,
    title,
    subTitle,
    className,
}) => {
    return (
        <div
            className={classNames(
                'p-2 rounded text-center hover:bg-classy-golden transition-colors duration-300 flex flex-col justify-center',
                {
                    'bg-classy-golden': active,
                },
                className
            )}
            onClick={onClick}
        >
            <p className="mb-0 font-noto-sans-bold" dangerouslySetInnerHTML={{ __html: title }} />
            {subTitle ? (
                <p className="mb-0 text-sm" dangerouslySetInnerHTML={{ __html: subTitle }} />
            ) : null}
        </div>
    );
};

const Switcher: React.FC<SwitcherProps> = ({ className, children }) => {
    return (
        <div
            className={classNames(
                'bg-classy-deemLight rounded grid grid-cols-3 gap-1 p-1 cursor-pointer border-2 border-classy-slate',
                className
            )}
        >
            {children}
        </div>
    );
};

export default Object.assign(Switcher, {
    Switch,
});
