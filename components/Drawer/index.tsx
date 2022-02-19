import { motion } from 'framer-motion';
import { Icon } from '../Icon';

import { Backdrop } from '../Backdrop';

interface DrawerProps {
    open?: boolean;
    onClose?: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({ open = false, children, onClose }) => {
    return (
        <Backdrop open={open} onClose={onClose} className="left-0 pr-10 flex">
            {/* Slide-over panel, show/hide based on slide-over state.

                Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                From: "translate-x-full"
                To: "translate-x-0"
                Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                From: "translate-x-0"
                To: "translate-x-full"
            */}

            <motion.div
                className="relative w-screen max-w-full md:max-w-lg lg:max-w-xl xl:max-w-3xl bg-gray-50 transform transition ease-in-out duration-500 sm:duration-700"
                variants={{
                    open: {
                        translateX: 0,
                    },
                    closed: {
                        translateX: '-100%',
                    },
                }}
                initial="closed"
                animate={open ? 'open' : 'closed'}
                transition={{
                    duration: 0.1,
                }}
                aria-hidden="true"
            >
                <div className="h-full flex flex-col shadow-xl overflow-y-auto">{children}</div>

                {/* Close button, show/hide based on slide-over state.

                Entering: "ease-in-out duration-500"
                From: "opacity-0"
                To: "opacity-100"
                Leaving: "ease-in-out duration-500"
                From: "opacity-100"
                To: "opacity-0" */}
                <div className="absolute top-0 right-0 -mr-8 md:-mr-12 pt-4 pl-2 sm:-ml-10 md:pr-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md text-gray-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <span className="sr-only">Close panel</span>
                        <Icon icon="close" />
                    </button>
                </div>
            </motion.div>
        </Backdrop>
    );
}