import type { NextApiRequest, NextApiResponse } from "next";
import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { buffer } from "micro";
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import User from "../models/user";
import Booking from "../models/booking";
import { format } from 'date-fns';
import emailTemplate from "../components/emailTemplates/template";

//Stripe Webhook => POST /api/stripe/webhook
async function sendRefundEmail(details: any) {

    // --- ETHEREAL TEST STUFF ---
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: testAccount.user, // generated ethereal user
    //         pass: testAccount.pass, // generated ethereal password
    //     },
    // });

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_DEFAULT_EMAIL,
            clientId: process.env.OAUTH2_CLIENT_ID,
            clientSecret: process.env.OAUTH2_CLIENT_SECRET,
            refreshToken: process.env.OAUTH2_REFRESH_TOKEN
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'SlicedAdvice ' + process.env.GMAIL_DEFAULT_EMAIL, // sender address
        to: `${details.userEmail}`, // list of receivers
        subject: "Your Booking Has Expired", // Subject line
        // text: ``, // plain text body
        html: emailTemplate(details), // html body
    });

    console.log("Message sent: %s", info.messageId);
    // await transporter.sendMail(info);

    // --- ETHEREAL TESTING STUFF ---
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


const stripeWebhook = async (req: any, res: any) => {
    console.log("Function Start!");
    const stripe: any = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" });

    if (req.method === "POST") {
        console.log("Here after post declaration!");
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];
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
                console.log('Charge Expired!');
                break;
            case "charge.updated":
                console.log("Charge Updated");
                break;
            case "charge.refunded":
                paymentIntent = event.data.object;
                // This case runs after payment_intent.cancelled when payment is cancelled in stripe dashboard
                console.log("Refunded");
                const dateOfBooking = format(new Date(paymentIntent.created * 1000), 'd LLLL yyyy');
                const user = await User.findById(paymentIntent.metadata.expertId);
                const userName = user.name;
                const details = { dateOfBooking, expertName: userName, userEmail: paymentIntent.receipt_email };
                // Here send an email if the booking was deemed invalid
                sendRefundEmail(details);
                break;
            case "charge.pending":
                console.log("pending");
                break;
            default:
                console.log(`Unhandled event type ${event.type}.`);
                break;
        }

        console.log('event', event);
        res.status(200).send();
    }
}


export {
    stripeWebhook,
}