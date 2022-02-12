import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';

import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { DividedContent } from '../DividedContent';

interface CheckoutProps {
    collapsed?: boolean;
    setCollapsed?: (collapsed: boolean) => void;
    totalInfo?: TotalInfo;
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

export const Checkout: React.FC<CheckoutProps> = ({ collapsed, setCollapsed, totalInfo }) => {
    return (
        <div className="fixed bottom-0 md:bottom-auto md:left-[50%] px-2 pb-2 w-full md:w-[50%] bg-classy-deemLight border-t-4 border-classy-lightBrown md:border-transparent">
            <div className="flex justify-center md:hidden" onClick={() => setCollapsed && setCollapsed(!collapsed)}>
                <Icon icon={collapsed ? 'chevronDown' : 'chevronUp'} className="rotate-180" />
            </div>
            <motion.div
                className={classNames({
                    'pb-3': !collapsed,
                })}
                variants={collapseVariants}
                initial="closed"
                animate={collapsed ? 'closed' : 'open'}
            >
                {totalInfo && (
                    <DividedContent>
                        <div title="Subtotal:">
                            <span className="rupee">{totalInfo.subtotal}</span>
                        </div>
                        <div title="Delivery Charge:">
                            <span className="rupee">{totalInfo.deliveryCharge}</span>
                        </div>
                        <div title="Tax:">
                            <span className="rupee">{totalInfo.tax}</span>
                        </div>
                        <div title="Total">
                            <span className="rupee">{totalInfo.total}</span>
                        </div>
                    </DividedContent>
                )}
            </motion.div>
            <Button text={'Proceed to Checkout'} />
        </div>
    );
};
