import Head from "next/head";
import classNames from 'classnames';

import { Header } from "../Header";

interface LayoutProps {
    title?: string;
    description?: string;
    className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
    title = "Pizzorder",
    description = "Get your faviourite pizza delivered to your door step in just a few minutes with Pizzorder",
    className = "",
    children
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="description"
                    content={description}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classNames("bg-classy-deemLight min-h-screen", className)}>
                <Header />
                {children}
            </div>
        </>
    );
}