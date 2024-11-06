'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
    const { cart } = useCart(); // Get cart items from context
    const [loading, setLoading] = useState(false);
    const [ProceedToCheckout, setProceedToCheckout] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const router = useRouter(); // Initialize the router

    const totalAmount = cart.reduce((total, item) => total + (selectedItems.includes(item.id) ? item.price * item.quantity : 0), 0).toFixed(2);

    // Handle checkbox selection
    const handleCheckboxChange = (id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter(item => item !== id)
                : [...prevSelected, id]
        );
    };

    const handleCheckout = async () => {
        if (selectedItems.length === 0) {
            alert('Please select at least one item to proceed with checkout.');
            return;
        }

        setLoading(true);

        const cartItems = cart.filter(item => selectedItems.includes(item.id)).map(item => ({
            title: item.title,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            images: item.images,
        }));

        try {
            // Instead of making a fetch here, we pass the cartItems via URL or use localStorage
            const cartItemsString = encodeURIComponent(JSON.stringify(cartItems));

            // Redirect to payment page with cart data as query parameter
            setProceedToCheckout(true);
            router.push(`/checkout/payment?cartItems=${cartItemsString}`);
        } catch (error) {
            console.error('Error during checkout:', error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <Header></Header>
            <div className="max-w-4xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Checkout</h1>

                {cart.length === 0 ? (
                    <div className="text-center">
                        <p className="text-xl text-gray-600">Your cart is empty.</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6">
                            <div className="border-b border-gray-300 pb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">Cart Items</h2>
                                <ul className="space-y-4">
                                    {cart.map((item) => (
                                        <li key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200">
                                            <div className="flex items-center space-x-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                />
                                                <Image src={item.images[0]} alt={item.title} width={64} height={64} className="w-16 h-16 object-cover rounded-lg" />
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                                                    <p className="text-sm text-gray-500">{item.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-6">
                                                <p className="text-lg text-gray-800">${item.price}</p>
                                                <span className="text-sm text-gray-500">x{item.quantity}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <h3 className="text-xl font-semibold text-gray-800">Total Amount</h3>
                                <p className="text-xl text-gray-800">${totalAmount}</p>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={handleCheckout}
                                    disabled={loading || selectedItems.length === 0}
                                    className="w-full max-w-md bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:bg-gray-300"
                                >
                                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
