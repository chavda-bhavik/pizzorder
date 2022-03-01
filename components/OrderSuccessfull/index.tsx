import Image from 'next/image';
import Router from 'next/router';
import { motion } from 'framer-motion';

import { Backdrop } from '@/components/Backdrop';
import { Button } from '@/components/Button';

interface OrderSuccessfullProps {
    show?: boolean;
    onClose?: () => void;
}

export const OrderSuccessfull: React.FC<OrderSuccessfullProps> = ({ onClose, show }) => {
    const continueShoppingClick = () => {
        Router.push('/');
    };
    return (
        <Backdrop onClose={onClose} open={show} className="p-2">
            <div className="relative w-full h-full">
                {/* Order Successfull card, show/hide based on show state.

                    Entering: "ease-in-out duration-500"
                    From: "opacity-0"
                    To: "opacity-100"
                    Leaving: "ease-in-out duration-500"
                    From: "opacity-100"
                    To: "opacity-0" 
                */}
                <motion.div
                    variants={{
                        show: {
                            opacity: 1,
                            translateY: 0,
                        },
                        hide: {
                            opacity: 0,
                            translateY: '100%',
                        },
                    }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut',
                    }}
                    animate={show ? 'show' : 'hide'}
                    initial="hide"
                    className="bg-gray-50 absolute bottom-0 inset-x-0 w-max mx-auto rounded-md px-5 py-3 text-center"
                >
                    <p className="text-lg font-sans font-medium text-center leading-5 mb-4">
                        Thank You.
                    </p>

                    <Image
                        src="/images/other/order-placed.png"
                        height={240}
                        width={240}
                        alt="Order Placed"
                        className="mx-auto"
                    />

                    <p className="text-lg font-sans font-medium text-center leading-5 mb-4">
                        Your Order is Placed successfully.
                        <br />
                        It will be delivered to you soon.
                    </p>

                    <Button block onClick={continueShoppingClick} className="rounded-md p-1">
                        Continue Shopping
                    </Button>
                </motion.div>
            </div>
        </Backdrop>
    );
};