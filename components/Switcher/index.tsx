import classNames from 'classnames'
import React from 'react'

interface SwitcherProps {
    className?: string
}

interface SwitchProps {
    onClick?: () => void;
    active?: boolean;
    title: string;
    subTitle?: string;
    className?: string;
}

const Switch: React.FC<SwitchProps> = ({ onClick = () => { }, active = false, title, subTitle, className }) => {
    return (
        <div
            className={classNames(
                "p-1 rounded-2xl md:rounded-full text-center hover:bg-classy-golden transition-colors duration-300",
                {
                    "bg-classy-golden": active
                },
                className
            )}
            onClick={onClick}
        >
            <p className="mb-0 font-archivo-bold">
                {title}
            </p>
            {subTitle ? <p className="mb-0 text-sm font-archivo">{subTitle}</p> : null}
        </div>
    )
}

const Switcher: React.FC<SwitcherProps> = ({ className, children }) => {
    return (
        <div className={classNames("bg-classy-deemLight rounded-2xl md:rounded-full grid grid-cols-3 gap-1 p-1 cursor-pointer border-2 border-classy-slate", className)}>
            {children}
        </div>
    );
}

export default Object.assign(Switcher, {
    Switch
});