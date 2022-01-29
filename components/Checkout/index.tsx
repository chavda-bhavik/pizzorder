import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';

import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

interface CheckoutProps {
    collapsed?: boolean;
    setCollapsed?: (collapsed: boolean) => void;
}

const collapseVariants: Variants = {
    open: {
        height: 'auto',
        visibility: 'visible',
    },
    closed: {
        visibility: 'hidden',
        height: 0,
    },
};

export const Checkout: React.FC<CheckoutProps> = ({
    collapsed,
    setCollapsed,
}) => {
    return (
        <div className="fixed bottom-0 md:bottom-auto md:left-[50%] px-2 pb-2 w-full md:w-[50%] bg-classy-deemLight border-t-4 border-classy-lightBrown md:border-transparent">
            <div
                className="flex justify-center md:hidden"
                onClick={() =>
                    setCollapsed && setCollapsed(!collapsed)
                }
            >
                <Icon
                    icon={
                        collapsed
                            ? 'chevronDown'
                            : 'chevronUp'
                    }
                    className="rotate-180"
                />
            </div>
            <motion.div
                className={classNames('space-y-2', {
                    'pb-3': !collapsed,
                })}
                variants={collapseVariants}
                initial="closed"
                animate={collapsed ? 'closed' : 'open'}
            >
                <div className="flex justify-between px-1">
                    <p className="font-archivo-light">
                        Item Total:
                    </p>
                    <p className="font-archivo-semibold">
                        $77.00
                    </p>
                </div>
                <div className="flex justify-between px-1">
                    <p className="font-archivo-light">
                        Delivery Charge:
                    </p>
                    <p className="font-archivo-semibold">
                        $1.00
                    </p>
                </div>
                <div className="flex justify-between px-1">
                    <p className="font-archivo-light">
                        Tax:
                    </p>
                    <p className="font-archivo-semibold">
                        $0.50
                    </p>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-archivo-semibold px-1">
                    <p>Total:</p>
                    <p>$78.50</p>
                </div>
            </motion.div>
            <Button text={'Proceed to Checkout'} />
        </div>
    );
};
