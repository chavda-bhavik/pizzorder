import { Header } from '@/components/Header';
import { CartItem } from '@/components/CartItem';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

interface CartProps {

}

const Cart: React.FC<CartProps> = ({ }) => {
    let cartItems: CartItemType[] = [
        {
            pizza: {
                name: 'Margherita',
                imageUrl: '/images/pizzas/margherita.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }, {
            pizza: {
                name: 'Hawaii',
                imageUrl: '/images/pizzas/hawaii.png',
                price: 199,
            },
            quantity: 1,
        }
    ];
    return (
        <div className="bg-classy-deemLight min-h-screen">
            <Header />

            {/* Content */}
            <main className="py-2 md:grid md:grid-cols-2 relative">
                <div className='px-2 mb-60 md:mb-0'>
                    <h2 className='title-lg'>Your Cart</h2>
                    <div className='space-y-2'>
                        {
                            cartItems.map((item, index) => <CartItem item={item} key={index} />)
                        }
                    </div>
                </div>
                <div className='fixed bottom-0 md:bottom-auto md:left-[50%] p-2 w-full md:w-[50%] bg-classy-deemLight border-t-4 border-classy-lightBrown md:border-transparent'>
                    <div className='flex justify-between p-1'>
                        <p className='font-archivo-light'>Item Total:</p>
                        <p className='font-archivo-semibold'>$77.00</p>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p className='font-archivo-light'>Delivery Charge:</p>
                        <p className='font-archivo-semibold'>$1.00</p>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p className='font-archivo-light'>Tax:</p>
                        <p className='font-archivo-semibold'>$0.50</p>
                    </div>
                    <hr />
                    <div className='flex justify-between p-1 text-lg font-archivo-semibold'>
                        <p>Total:</p>
                        <p>$78.50</p>
                    </div>
                    <Button text='Checkout' icon='check' />
                </div>
            </main>
        </div>
    );
}

export default Cart;