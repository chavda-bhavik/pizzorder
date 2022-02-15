import { useState } from "react";
import CreditCardInput from 'react-credit-card-input';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

interface CheckoutFormProps {
    handleSubmit: (data: UserDetails) => void;
    formDisabled?: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ handleSubmit, formDisabled = false }) => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
    });

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
        handleSubmit(userDetails);
        setUserDetails({
            name: '',
            phone: '',
            address: '',
            cardNumber: '',
            expiry: '',
            cvc: '',
        });
    };

    return (
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
                disabled={formDisabled}
                className="rounded-sm"
            />
        </form>
    );
}