// /app/api/create-payment-intent/route.js

import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export async function POST(req) {
  try {
    const { amount } = await req.json(); // Get amount from the body
    console.log('amount: ', amount)

    // Ensure the amount is greater than or equal to the minimum required (e.g. $0.50 USD)
    if (amount < 0.5) {
      return new Response(
        JSON.stringify({ error: 'Amount must be greater than or equal to $0.50 USD.' }),
        { status: 400 }
      );
    }

    // Create a PaymentIntent with the amount (converted to cents)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects the amount in cents
      currency: 'usd',
      // Optionally add other PaymentIntent options here
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
