import { useContext } from 'react';
import CreditCardInput from 'react-credit-card-input';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Layout } from '@/components/Layout';
import { DividedContent } from '@/components/DividedContent';
import { CartContext } from '@/context/CartContext';

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = ({}) => {
    const cartContext = useContext(CartContext);
    return (
        <Layout>
            <main className="py-5 space-y-7 max-w-lg">
                {/* Order Details */}
                <div className="space-y-3 px-2">
                    <h3 className="title">Order Details</h3>
                    <DividedContent>
                        <div title="Subtotal:">
                            <span className="rupee">{cartContext?.totalInfo.subtotal}</span>
                        </div>
                        <div title="Delivery Charge:">
                            <span className="rupee">{cartContext?.totalInfo.deliveryCharge}</span>
                        </div>
                        <div title="Tax:">
                            <span className="rupee">{cartContext?.totalInfo.tax}</span>
                        </div>
                        <div title="Total">
                            <span className="rupee">{cartContext?.totalInfo.total}</span>
                        </div>
                    </DividedContent>
                </div>

                {/* Delivery &amp; Payment Details */}
                <div className="space-y-3 px-2">
                    <h3 className="title">Delivery &amp; Payment Details</h3>
                    <div className="space-y-1">
                        <Input id="name" placeholder="Full Name" />
                        <Input id="address" type="textarea" placeholder="Address" />
                        <CreditCardInput
                            className="w-full"
                            // cardNumberInputProps={{ value: cardNumber, onChange: this.handleCardNumberChange }}
                            // cardExpiryInputProps={{ value: expiry, onChange: this.handleCardExpiryChange }}
                            // cardCVCInputProps={{ value: cvc, onChange: this.handleCardCVCChange }}
                            fieldClassName="input"
                        />
                    </div>
                </div>

                {/* Checkout */}
                <Button text="Let's Go" block className="fixed md:position-unset bottom-0 rounded-none md:rounded-md px-0 md:mx-2" />
            </main>
        </Layout>
    );
};

export default Checkout;
