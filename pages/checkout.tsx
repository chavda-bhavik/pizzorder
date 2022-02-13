import React, { useContext, useEffect, useState } from 'react';
import CreditCardInput from 'react-credit-card-input';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Layout } from '@/components/Layout';
import { DividedContent } from '@/components/DividedContent';
import { CartContext } from '@/context/CartContext';
import { placeOrder } from '@/api';

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = ({}) => {
    const cartContext = useContext(CartContext);
    const [formState, setFormState] = useState({
        submitted: false,
        submitting: false,
        error: false,
        errorMessage: '',
        disabled: false,
        orderId: '',
    });
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
    });

    useEffect(() => {
        if (!cartContext?.items || !cartContext?.items.length) {
            setFormState({
                ...formState,
                disabled: true,
                error: true,
                errorMessage: 'Your cart is empty. Please add items to your cart to order.',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onInputChange = (e: React.ChangeEvent) => {
        e.persist();
        const { name, value } = e.target as HTMLInputElement;
        setUserDetails({ ...userDetails, [name]: value });
    };
    const onCreditCardInputChange = (e: React.ChangeEvent, name: string) => {
        e.persist();
        const { value } = e.target as HTMLInputElement;
        setUserDetails({ ...userDetails, [name]: value });
    };
    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setFormState({
                ...formState,
                submitting: true,
                error: false,
                errorMessage: '',
                submitted: false,
            });
            let pizzaDetails = [];
            pizzaDetails =
                cartContext?.items.map((item) => {
                    return {
                        id: item.pizza.id!,
                        size: item.size!,
                        toppings: item.ingredients || [],
                        extraCheese: !!item.extraCheese,
                    };
                }) || [];

            let response = await placeOrder({
                user: userDetails,
                pizzas: pizzaDetails,
            });
            if (typeof response !== 'string') {
                setFormState({
                    ...formState,
                    orderId: response.id!,
                    submitted: true,
                    submitting: false,
                });
                cartContext?.clearCart();
            } else {
                throw new Error(response);
            }
        } catch (error) {
            setFormState({
                ...formState,
                error: true,
                errorMessage: (error as Error).message,
            });
        }
    };

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
                    <form className="space-y-1" onSubmit={formSubmitHandler}>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Full Name"
                            value={userDetails.name}
                            onChange={onInputChange}
                            autoFocus
                            autoComplete="on"
                            required
                        />
                        <Input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Phone Number"
                            value={userDetails.phone}
                            onChange={onInputChange}
                            autoComplete="on"
                            required
                        />
                        <Input
                            id="address"
                            name="address"
                            type="textarea"
                            placeholder="Address"
                            value={userDetails.address}
                            onChange={onInputChange}
                            autoComplete="on"
                            required
                        />
                        <CreditCardInput
                            className="w-full"
                            cardNumberInputProps={{
                                value: userDetails.cardNumber,
                                onChange: (e: React.ChangeEvent) =>
                                    onCreditCardInputChange(e, 'cardNumber'),
                            }}
                            cardExpiryInputProps={{
                                value: userDetails.expiry,
                                onChange: (e: React.ChangeEvent) =>
                                    onCreditCardInputChange(e, 'expiry'),
                            }}
                            cardCVCInputProps={{
                                value: userDetails.cvc,
                                onChange: (e: React.ChangeEvent) =>
                                    onCreditCardInputChange(e, 'cvc'),
                            }}
                            fieldClassName="input"
                        />

                        {/* Checkout */}
                        <Button
                            text="Let's Go"
                            type="submit"
                            block
                            disabled={formState.disabled}
                            className="rounded-sm"
                        />

                        {/* Error */}
                        {formState.error && (
                            <div className="text-red-600 text-sm">{formState.errorMessage}</div>
                        )}

                        {/* Success */}
                        {formState.submitted && (
                            <div className="text-green-600 text-sm">
                                Your order has been placed successfully.
                            </div>
                        )}
                    </form>
                </div>
            </main>
        </Layout>
    );
};

export default Checkout;
