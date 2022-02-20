import { useContext, useEffect, useState } from 'react';

import { placeOrder } from '@/api';
import { Layout } from '@/components/Layout';
import { CartContext } from '@/context/CartContext';
import { CheckoutForm } from '@/components/CheckoutForm';
import { DividedContent } from '@/components/DividedContent';
import { OrderSuccessfull } from '@/components/OrderSuccessfull';

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

    const handleSubmit = async (userDetails: UserDetails) => {
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
    }

    return (
        <Layout stickyHeader>
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
                    <CheckoutForm handleSubmit={handleSubmit} formDisabled={formState.disabled} />

                    {/* Error */}
                    {formState.error && (
                        <div className="text-red-600 text-sm">{formState.errorMessage}</div>
                    )}
                </div>
            </main>

            <OrderSuccessfull show={formState.submitted && !formState.error} />
        </Layout>
    );
};

export default Checkout;
