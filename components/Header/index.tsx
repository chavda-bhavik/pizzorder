import Link from "next/link";
import { Icon } from "@/components/Icon";
import classNames from 'classnames';

interface HeaderProps {
    stickyHeader?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ stickyHeader }) => {
    return (
        <header
            className={classNames(
                'py-4 px-2 flex flex-row justify-between border-b-2 border-classy-slate bg-glassmorphic z-10',
                {
                    'top-0 sticky shadow-md shadow-classy-slate': stickyHeader,
                }
            )}
        >
            <Link href="/">
                <a aria-label="Home">
                    <Icon
                        icon="pizzaSlice"
                        className="cursor-pointer hover:text-classy-golden transition-colors duration-300"
                    />
                </a>
            </Link>
        </header>
    );
};
