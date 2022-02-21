import Link from 'next/link';

interface StickyBottomWidgetProps {
    link: string;
    ariaLabel?: string;
}

export const StickyBottomWidget: React.FC<StickyBottomWidgetProps> = ({ link, ariaLabel, children }) => {
    return (
        <Link href={link}>
            <a className='fixed bottom-1 right-1 bg-classy-golden rounded-2xl px-3 py-2'>
                <div className="group cursor-pointer flex flex-row items-center space-x-2" aria-label={ariaLabel}>
                    {children}
                </div>
            </a>
        </Link>
    )
}