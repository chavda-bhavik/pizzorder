import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import CreditCardInput from 'react-credit-card-input';

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = ({}) => {
    return (
        <div className="bg-classy-deemLight min-h-screen relative">
            <Header />

            <main className="py-5 space-y-7 max-w-lg">
                {/* Order Details */}
                <div className="space-y-3 px-2">
                    <h3 className="title">Order Details</h3>
                    <div className="space-y-1">
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
                    </div>
                </div>

                {/* Delivery &amp; Payment Details */}
                <div className="space-y-3 px-2">
                    <h3 className="title">
                        Delivery &amp; Payment Details
                    </h3>
                    <div className="space-y-1">
                        <Input
                            id="name"
                            placeholder="Full Name"
                        />
                        <Input
                            id="address"
                            type="textarea"
                            placeholder="Address"
                        />
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
                <Button
                    text="Let's Go"
                    block
                    className="fixed md:position-unset bottom-0 rounded-none md:rounded-md px-0 md:mx-2"
                />
            </main>
        </div>
    );
};

export default Checkout;
