import classNames from "classnames"

interface InputProps {
    type?: 'text' | 'number' | 'textarea';
    placeholder?: string;
    className?: string;
    id: string;
    name?: string;
    label?: string;
    autoFocus?: boolean;
    autoComplete?: string;
    autoCorrect?: string;
    block?: boolean;
    register?: any;
}

export const Input: React.FC<InputProps> = ({ type = "text", placeholder, className, name, autoFocus, autoComplete, autoCorrect, register, block, label, id }) => {
    let input = null;
    switch (type) {
        case 'textarea':
            input = <textarea
                className={classNames("input", { 'w-full': block }, className)}
                name={name}
                id={id}
                placeholder={placeholder}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                {...register}
            />
            break;
        default:
            input = <input
                name={name}
                id={id}
                type={type}
                placeholder={placeholder}
                className={classNames("input", {
                    'w-full': block
                }, className)}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                {...register}
            />
    }
    return (
        <div className="flex flex-col">
            {label && <label htmlFor={id}>{label}</label>}
            {input}
        </div>
    );
}