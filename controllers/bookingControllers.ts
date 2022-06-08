import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Booking from "../models/booking";
import APIFeatures from "../utils/apiFeatures";

// interface OrderDataInterface {
//     price: number;
//     bookingType: String;
//     expertisePostId: String;
//     customerId: String;
//     status: String;
//     customerSubmission: String
// }

//Create new Stripe Payment Intent => POST /api/stripe/paymentIntent
const createStripePaymentIntent = catchAsyncErrors(
    async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: (arg0: ErrorHandler) => any
    ) => {
        // Most of these will be placed into the metadata
        const { price, bookingType, expertisePostId, customerId, status } =
            req.body;

        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

        // Create a PaymentIntent with the order amount and currency
        // NOTE: "amount" is in CENTS, NOT dollars.
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(price.toFixed(2) * 100),
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
            capture_method: "manual",
            metadata: {
                bookingType: bookingType,
                expertisePostId: expertisePostId,
                customerId: customerId,
                status: status,
                // 'customerSubmission': customerSubmission,
            },
            description: `Booking from customer with id ${customerId} of type ${bookingType} for ${price} dollars.`,
        });

        if (!paymentIntent) {
            return next(
                new ErrorHandler("Payment Intent not created successfully", 400)
            );
        }

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });
    }
);

//Create new Booking  => POST /api/bookings
const createBooking = catchAsyncErrors(
    async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: (arg0: ErrorHandler) => any
    ) => {
        const {
            bookingType,
            expertisePostId,
            customerId,
            status,
            customerSubmission,
            stripePaymentIntentId,
        } = req.body;

        const booking = await Booking.create({
            bookingType,
            customer: customerId,
            expertisePost: expertisePostId,
            status,
            singleTextResponse: {
                customerSubmission: customerSubmission,
            },
            stripePaymentIntentId: stripePaymentIntentId,
        });

        if (!booking) {
            return next(new ErrorHandler("Booking could not be created", 400));
        }

        res.status(200).json({
            success: true,
            bookingId: booking._id,
        });
    }
);

//Get all bookings => GET /api/bookings
const allBookings = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse, next: any) => {
        console.log("HELLO WORLD")
        const resPerPage = 20;
        const bookingsCount = await Booking.countDocuments();
        console.log("BookingsCount: ", bookingsCount)
        //search with optional queries, handled via .search() method.
        const apiFeatures = new APIFeatures(Booking.find(), req.query)

        let bookings = await apiFeatures.query;
        let filteredBookingsCount = bookings.length;

        apiFeatures.pagination(resPerPage);
        bookings = await apiFeatures.query.clone();

        res.status(200).json({
            success: true,
            bookingsCount,
            resPerPage,
            filteredBookingsCount,
            bookings,
        });
    }
);

export { createStripePaymentIntent, createBooking, allBookings };
