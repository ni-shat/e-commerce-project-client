// // pages/api/create-payment-intent.js
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { amount } = req.body; // This should be calculated based on the cart

//         try {
//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount: amount * 100, // Amount in cents
//                 currency: 'usd',
//                 payment_method_types: ['card'],
//             });
//             res.status(200).json({ clientSecret: paymentIntent.client_secret });
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     } else {
//         res.setHeader('Allow', 'POST');
//         res.status(405).end('Method Not Allowed');
//     }
// }
