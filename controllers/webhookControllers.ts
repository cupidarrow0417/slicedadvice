import type { NextApiRequest, NextApiResponse } from "next";
import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { buffer } from "micro";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import User from "../models/user";
import Booking from "../models/booking";
import { format } from "date-fns";
import bookingCancelledEmailTemplate from "../components/emailTemplates/bookingCancelledEmailTemplate";
import sendEmail from "../utils/sendEmail";

//Stripe Webhook => POST /api/stripe/webhook
const stripeWebhook = async (req: any, res: any) => {
    const stripe: any = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2020-08-27",
    });

    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"];
        const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
        let event;
        let paymentIntent;

        try {
            if (!sig || !webhookSecret) return;
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (error: any) {
            console.log(`Webhook Error: ${error.message}`);
            return res.status(400).send(error.message);
        }

        switch (event.type) {
            case "payment_intent.created":
                paymentIntent = event.data.object;
                console.log(`A Intent was created!`);
                console.log(
                    `PaymentIntent for ${paymentIntent.amount} was successful!`
                );
                break;
            case "payment_intent.succeeded":
                paymentIntent = event.data.object;
                console.log(`A Intnet was successful!`);
                console.log(
                    `PaymentIntent for ${paymentIntent.amount} was successful!`
                );
                break;
            case "payment_intent.cancelled":
                // This case runs first when payment is cancelled in stripe dashboard
                paymentIntent = event.data.object;
                console.log(
                    `PaymentIntent for ${paymentIntent.amount} failed.`
                );
                break;
            case "charge.failed":
                console.log(`A Charge was failed!`);
                window.location.assign("/");
                break;
            case "charge.expired":
                console.log("Charge Expired!");
                break;
            case "charge.updated":
                console.log("Charge Updated");
                break;
            case "charge.refunded":
                paymentIntent = event.data.object;
                // This case runs after payment_intent.cancelled when payment is cancelled in stripe dashboard
                console.log("Charge Refunded");

                // Updating Booking Status
                const booking = await Booking.find({ stripePaymentIntentId: paymentIntent.payment_intent });
                Booking.updateOne({ _id: booking[0]._id }, { $set: { status: "Expired" } })
                .then(result => {
                    console.log(result);
                });

                const dateOfBooking = format(
                    new Date(paymentIntent.created * 1000),
                    "d LLLL yyyy"
                );
                const expertUser = await User.findById(
                    paymentIntent.metadata.expertId
                );
                const expertUserName = expertUser.name;
                // const details = { dateOfBooking, expertName: userName, userEmail: paymentIntent.receipt_email };

                // Create email template string
                const htmlBody: string = bookingCancelledEmailTemplate(
                    expertUserName,
                    dateOfBooking
                );
                const plainTextBody: string = `Hello,\n\n>We're sorry to see that your booking with ${expertUserName} placed on ${dateOfBooking} has expired, because the expert didn't respond in time. We've taken the hold off your credit card and you won't be charged for this booking. We hope you'll give us another chance and book with us again soon!\n\nSincerely,\nSlicedAdvice`;

                // Send the email!
                sendEmail({
                    email: paymentIntent.receipt_email,
                    subject: "SlicedAdvice: Your Booking has Expired",
                    htmlBody,
                    plainTextBody,
                });
                break;
            case "charge.pending":
                console.log("pending");
                break;
            default:
                console.log(`Unhandled event type ${event.type}.`);
                break;
        }

        console.log("event", event);
        res.status(200).send();
    }
};

export { stripeWebhook };
