import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

//Create new Stripe Payment Intent => POST /api/stripe/paymentIntent
const createStripePaymentIntent = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const { price } = req.body;

        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

        // Create a PaymentIntent with the order amount and currency
        // NOTE: "amount" is in CENTS, NOT dollars.
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(price.toFixed(2)*100),
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
            capture_method: 'manual',
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });
    }
);

export { createStripePaymentIntent };
