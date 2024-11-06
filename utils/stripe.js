import Stripe from 'stripe';

// Initialize Stripe with your secret key (keep this key secret on the server)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export { stripe };
