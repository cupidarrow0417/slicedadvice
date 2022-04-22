import type { NextApiRequest, NextApiResponse } from "next";
import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { buffer } from "micro";

//Stripe Webhook => POST /api/stripe/webhook
const stripeWebhook = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const requestBuffer = await buffer(req);
            const signature = req.headers["stripe-signature"] as string;
            // Set your secret key. Remember to switch to your live secret key in production.
            // See your keys here: https://dashboard.stripe.com/apikeys
            const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
            const event = stripe.webhooks.constructEvent(
                requestBuffer.toString(), // Stringify the request for the Stripe library
                signature,
                process.env.STRIPE_WEBHOOK_SIGNING_SECRET // you get this secret when you register a new webhook endpoint
            );
            // you can now safely work with the request. The event returned is the parsed request body.
            res.send(200);
            // Handle the event
            let paymentIntent;
            switch (event.type) {
                case "payment_intent.succeeded":
                    paymentIntent = event.data.object;
                    console.log(
                        `PaymentIntent for ${paymentIntent.amount} was successful!`
                    );
                    // Then define and call a method to handle the successful payment intent.
                    // handlePaymentIntentSucceeded(paymentIntent);
                    break;
                case "payment_intent.processing":
                    paymentIntent = event.data.object;
                    console.log(
                        `PaymentIntent for ${paymentIntent.amount} is processing!`
                    );
                    // Then define and call a method to handle the processing of a payment intent.
                    // handlePaymentIntentProcessing(paymentIntent);
                    break;
                case "payment_intent.payment_failed":
                    paymentIntent = event.data.object;
                    console.log(
                        `PaymentIntent for ${paymentIntent.amount} failed.`
                    );
                    // Then define and call a method to handle the failed payment attempt.
                    // handlePaymentIntentFailed(paymentIntent);
                    break;
                default:
                    // Unexpected event type
                    console.log(`Unhandled event type ${event.type}.`);
            }
        } catch (error: any) {
            console.log(
                `⚠️  Webhook signature verification failed.`,
                error.message
            );
            return res.send(400);
        }
    }
);


export {
    stripeWebhook,
}