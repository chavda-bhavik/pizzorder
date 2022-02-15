import { useEffect } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { toggleOverflowHidden } from '@/util/helper';

interface BackdropProps {
    open?: boolean;
    onClose?: () => void;
    className?: string;
}

export const Backdrop: React.FC<BackdropProps> = ({ open = false, children, onClose, className }) => {
    useEffect(() => {
        toggleOverflowHidden(open);
    }, [open]);

    return (
        <motion.div
            className={'fixed inset-0 z-20 overflow-hidden'}
            variants={{
                open: {
                    display: 'block',
                    transition: {
                        duration: 0.2,
                        ease: 'easeIn',
                    },
                },
                close: {
                    display: 'none',
                    transition: {
                        delay: 0.4,
                        ease: 'easeOut',
                    },
                },
            }}
            initial="close"
            animate={open ? 'open' : 'close'}
            aria-labelledby="Pizza Details"
            role="dialog"
            aria-modal="true"
        >
            <div className="absolute inset-0 overflow-hidden">
                {/* Background overlay, show/hide based on slide-over state.

                    Entering: "ease-in-out duration-500"
                    From: "opacity-0"
                    To: "opacity-100"
                    Leaving: "ease-in-out duration-500"
                    From: "opacity-100"
                    To: "opacity-0" 
                */}

                <motion.div
                    className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-500"
                    variants={{
                        open: {
                            opacity: 1,
                            transitionDuration: '0.5s',
                        },
                        close: {
                            opacity: 0,
                            transitionDuration: '0.5s',
                        },
                    }}
                    animate={open ? 'open' : 'close'}
                    initial="close"
                    aria-hidden="true"
                    onClick={() => onClose && onClose()}
                />
                <div className={classNames("fixed inset-0 w-full ", className)}>
                    {children}
                </div>
            </div>
        </motion.div>
    );
}