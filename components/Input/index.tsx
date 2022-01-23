interface InputProps {
    type?: 'text' | 'number';
    placeholder?: string;
    className?: string;
    name?: string;
    autoFocus?: boolean;
    autoComplete?: string;
    autoCorrect?: string;
    register?: any;
}

export const Input: React.FC<InputProps> = ({ type, placeholder, className, name, autoFocus, autoComplete, autoCorrect, register }) => {
    return (
        <input name={name} type={type} placeholder={placeholder} className={className} autoFocus={autoFocus} autoComplete={autoComplete} autoCorrect={autoCorrect} {...register} />
    );
}