import { Header } from "@/components/Header";

interface CheckoutProps {

}

const Checkout: React.FC<CheckoutProps> = ({ }) => {
    return (
        <div className="bg-classy-deemLight min-h-screen">
            <Header />

            <main>
                <h2 className='title-lg'>Address Information</h2>
                <h2 className='title-lg'>Payment Information</h2>
            </main>
        </div>
    );
}

export default Checkout;