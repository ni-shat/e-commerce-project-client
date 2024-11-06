'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import FailureModal from '@/app/components/FailureModal';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
}

function PaymentForm() {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const { cart } = useCart();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [showFailureModal, setShowFailureModal] = useState(false);
    const [failureMessage, setFailureMessage] = useState('');

    // Fetch client secret when the page loads
    useEffect(() => {
        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        console.log('total amount: ', totalAmount)

        async function createPaymentIntent() {
            try {
                const res = await fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: totalAmount }),
                });
                const { clientSecret } = await res.json();
                setClientSecret(clientSecret);
            } catch (error) {
                console.error('Error creating payment intent:', error);
            }
        }

        createPaymentIntent();
    }, [cart]);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        setLoading(true);

        try {
            const cardElement = elements.getElement(CardElement);

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name,
                        email,
                    },
                },
            });

            if (error) {
                // Show custom failure modal
                setFailureMessage(`Payment failed: ${error.message}`);
                setShowFailureModal(true);
            } else if (paymentIntent.status === 'succeeded') {
                // Remove cart from localStorage
                localStorage.removeItem('cart');
                router.push('/thank-you'); // Navigate to the success route
            }
        } catch (error) {
            console.error('Error during payment:', error.message);
            setFailureMessage('An unexpected error occurred. Please try again.');
            setShowFailureModal(true);
        } finally {
            setLoading(false);
        }
    };

    // If the failure modal should be shown
    if (showFailureModal) {
        return <FailureModal message={failureMessage} onClose={() => setShowFailureModal(false)} />;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
            <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-md flex gap-8">
                {/* Cart Details */}
                <div className="w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart</h2>
                    <ul className="space-y-4">
                        {cart.map(item => (
                            <li key={item.id} className="border-b border-gray-300 py-4">
                                <p className="text-lg font-medium text-gray-900">{item.title}</p>
                                <p className="text-sm text-gray-500">Price: ${item.price}</p>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800">Total Amount</h3>
                        <p className="text-xl font-semibold text-gray-800">${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Proceed with Payment</h2>
                    <form onSubmit={handlePayment} className="space-y-6">
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Card Details</label>
                            <div className="border border-gray-300 p-3 rounded-md">
                                <CardElement options={{ hidePostalCode: true }} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg text-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!stripe || loading}
                        >
                            {loading ? 'Processing...' : 'Proceed to Payment'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
