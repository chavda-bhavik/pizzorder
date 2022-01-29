import classNames from 'classnames'
import React from 'react'
import { motion } from 'framer-motion';
import { Icon } from '../Icon';

interface DrawerProps {
    open?: boolean;
    onClose?: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({ open = false, children, onClose }) => {
    return (
        <motion.div
            className={"fixed inset-0 z-20 overflow-hidden"}
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
                        delay: 0.5,
                        ease: 'easeOut'
                    }
                }
            }}
            initial='close'
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
                            transitionDuration: '0.5s'
                        },
                        close: {
                            opacity: 0,
                            transitionDuration: '0.5s'
                        }
                    }}
                    animate={open ? 'open' : 'close'}
                    initial='close'
                    aria-hidden="true"
                />
                <div className="fixed inset-y-0 left-0 pr-10 max-w-full flex">

                    {/* Slide-over panel, show/hide based on slide-over state.

                        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                        From: "translate-x-full"
                        To: "translate-x-0"
                        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                        From: "translate-x-0"
                        To: "translate-x-full" 
                    */}

                    <motion.div
                        className="relative w-screen max-w-full md:max-w-md bg-green-50 transform transition ease-in-out duration-500 sm:duration-700"
                        variants={{
                            open: {
                                translateX: 0
                            },
                            closed: {
                                translateX: '-100%'
                            }
                        }}
                        initial="closed"
                        animate={open ? 'open' : 'closed'}
                        transition={{
                            duration: 0.1
                        }}
                        aria-hidden="true"
                    >
                        <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                            <div className="px-4 sm:px-6">
                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                                    Panel title
                                </h2>
                            </div>
                            <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                {/* Replace with your content */}
                                {children}
                                {/* <div className="absolute inset-0 px-4 sm:px-6">
                                    <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true"></div>
                                </div> */}
                                {/* /End replace */}
                            </div>
                        </div>

                        {/* Close button, show/hide based on slide-over state.

                        Entering: "ease-in-out duration-500"
                        From: "opacity-0"
                        To: "opacity-100"
                        Leaving: "ease-in-out duration-500"
                        From: "opacity-100"
                        To: "opacity-0" */}
                        <div className="absolute top-0 right-0 -mr-8 md:-mr-12 pt-4 pl-2 flex sm:-ml-10 sm:pr-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-md text-gray-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <span className="sr-only">Close panel</span>
                                {/* <!-- Heroicon name: outline/x --> */}
                                <Icon icon='close' />
                                {/* <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg> */}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}