import classNames from "classnames"

interface InputProps {
    type?: 'text' | 'number' | 'textarea';
    placeholder?: string;
    className?: string;
    id: string;
    name?: string;
    label?: string;
    autoFocus?: boolean;
    autoComplete?: 'on' | 'off';
    autoCorrect?: 'on' | 'off';
    block?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent) => void;
    required?: boolean;
}

export const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder,
    className,
    name,
    autoFocus,
    autoComplete,
    autoCorrect,
    block,
    label,
    id,
    value,
    onChange,
    required,
}) => {
    let input = null;
    switch (type) {
        case 'textarea':
            input = (
                <textarea
                    className={classNames('input', { 'w-full': block }, className)}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                    value={value}
                    onChange={(e) => onChange && onChange(e)}
                    required
                />
            );
            break;
        default:
            input = (
                <input
                    name={name}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className={classNames('input', { 'w-full': block }, className)}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                    value={value}
                    onChange={(e) => onChange && onChange(e)}
                    required
                />
            );
    }
    return (
        <div className="flex flex-col">
            {label && <label htmlFor={id}>{label}</label>}
            {input}
        </div>
    );
};