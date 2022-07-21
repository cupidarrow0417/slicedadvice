import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Booking from "../models/booking";
import User from "../models/user";
import { BookingAPIFeatures } from "../utils/apiFeatures";
import sendEmail from "../utils/sendEmail";

// interface OrderDataInterface {
//     price: number;
//     bookingType: String;
//     expertisePostId: String;
//     customerId: String;
//     status: String;
//     customerSubmission: String
// }

//Get all bookings => GET /api/bookings
const getBookings = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse, next: any) => {
        const resPerPage = 1000;
        const bookingsCount = await Booking.countDocuments();
        //search with optional queries, handled via .search() and .filter() method.
        const apiFeatures = new BookingAPIFeatures(
            Booking.find().sort({ createdAt: -1 }),
            req.query
        )
            .search()
            .filter();

        let bookings = await apiFeatures.query;
        let filteredBookingsCount = bookings.length;

        apiFeatures.pagination(resPerPage);
        bookings = await apiFeatures.query.clone();

        res.status(200).json({
            bookingsCount,
            resPerPage,
            filteredBookingsCount,
            bookings,
        });
    }
);

//Create new Stripe Payment Intent => POST /api/stripe/paymentIntent
const createStripePaymentIntent = catchAsyncErrors(
    async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: (arg0: ErrorHandler) => any
    ) => {
        // Most of these will be placed into the metadata
        const {
            total,
            serviceFee,
            bookingType,
            expertisePostId,
            expertId,
            customerId,
            status,

            // stripe
            expertStripeConnectId,
        } = req.body;

        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

        const { totalInCents, serviceFeeInCents, marketplaceFee } =
            calculateBookingPriceDetails(total, serviceFee);

        // Find customer by customerId
        const customerInDatabase = await User.findById(customerId);
        if (!customerInDatabase) {
            return next(new ErrorHandler("Customer not found", 404));
        }

        // Retrieve stripeCustomerId from customer so that when this payment intent
        // is confirmed (if it is), the payment info will be saved to the Stripe
        // Customer object for future usage.
        const stripeCustomerId = customerInDatabase.stripeCustomerId;

        // If does not have a stripeCustomerId, create a new Stripe Customer object and
        // attach it to the stripeCustomerId field in the customerInDatabase.
        if (!stripeCustomerId) {
            const stripeCustomer = await stripe.customers.create({
                email: customerInDatabase.email,
                description: `SlicedAdvice Stripe Customer for ${customerInDatabase.email}`,
                metadata: {
                    databaseId: customerInDatabase._id.toString(),
                    slicedAdviceUsername: customerInDatabase.name,
                },
            });
            customerInDatabase.stripeCustomerId = stripeCustomer.id;
            await customerInDatabase.save();
        }

        // Create a PaymentIntent with the order amount and currency
        // NOTE: "amount" is in CENTS, NOT dollars.
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalInCents,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
            // payment_method: paymentMethodId,
            customer: customerInDatabase.stripeCustomerId,
            receipt_email: customerInDatabase.email,
            // setup_future_usage: "on_session",
            capture_method: "manual",
            application_fee_amount: marketplaceFee + serviceFeeInCents,
            transfer_data: {
                destination: expertStripeConnectId,
            },
            metadata: {
                bookingType: bookingType,
                expertisePostId: expertisePostId,
                expertId: expertId,
                customerId: customerId,
                status: status,
                // 'customerSubmission': customerSubmission,
            },
            description: `Booking from customer with id ${customerId} of type ${bookingType} to expert with id ${expertId} for ${total} dollars.`,
        });

        if (!paymentIntent) {
            return next(
                new ErrorHandler("Payment Intent not created successfully", 400)
            );
        }

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    }
);

//DEFUNCT FOR NOW UNTIL STRIPE ADDS UPDATING TRANSFER_DATA
//Update Stripe Payment Intent => PATCH /api/stripe/paymentIntent
const updateStripePaymentIntent = catchAsyncErrors(
    async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: (arg0: ErrorHandler) => any
    ) => {
        // Most of these will be placed into the metadata
        const {
            total,
            serviceFee,
            bookingType,
            expertisePostId,
            expertId,
            customerId,
            status,

            // stripe
            expertStripeConnectId,
        } = req.body.bookingData;

        // Used to find the actual id for Payment Intent.
        const stripePaymentIntentId = req.body.stripePaymentIntentId;

        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

        const { totalInCents, serviceFeeInCents, marketplaceFee } =
            calculateBookingPriceDetails(total, serviceFee);

        // Create a PaymentIntent with the order amount and currency
        // NOTE: "amount" is in CENTS, NOT dollars.
        const paymentIntent = await stripe.paymentIntents.update(
            // Update this payment id
            stripePaymentIntentId,
            // Things we want to update
            {
                amount: totalInCents,
                currency: "usd",
                capture_method: "manual",
                application_fee_amount: marketplaceFee + serviceFeeInCents,
                // STRIPE DOES NOT ALLOW UPDATING TRANSFER DATA, WHICH IS WHY IN THE FRONTEND OF BOOKSINGLEEXPERTISEPOST,
                // WE CHECK IF THE CACHED PAYMENT INTENT HAS THE SAME TRANSFER DATA AS THE CURRENT BOOKING.
                // transfer_data: {
                //     destination: expertStripeConnectId,
                // },
                metadata: {
                    bookingType: bookingType,
                    expertisePostId: expertisePostId,
                    expertId: expertId,
                    customerId: customerId,
                    status: status,
                    // 'customerSubmission': customerSubmission,
                },
                description: `Booking from customer with id ${customerId} of type ${bookingType} to expert with id ${expertId} for ${total} dollars.`,
            }
        );

        if (!paymentIntent) {
            return next(
                new ErrorHandler("Payment Intent not updated successfully", 400)
            );
        }

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    }
);

//Update a booking => PUT /api/bookings/[id]
const updateBooking = catchAsyncErrors(
    async (req: any, res: NextApiResponse, next: any) => {
        const {
            // Booking data
            bookingType,
            expertisePost,
            expert,
            customer,
            status,
            singleTextResponse,
            stripePaymentIntentId,
            _id,

            // boolean denoting whether to charge the Stripe payment intent,
            // since "updating the booking" possibly means the expert just responded,
            // and thus should be paid!
            chargePaymentIntent,
        } = req.body;

        // Get Stripe Payment Intent from the stripePaymentIntentId and capture
        // the payment if chargePaymentIntent is true. Return an error and don't
        // continue to update the booking, if this fails.
        if (chargePaymentIntent) {
            const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
            const paymentIntent = await stripe.paymentIntents.capture(
                stripePaymentIntentId
            );
            if (!paymentIntent) {
                return next(
                    new ErrorHandler(
                        "Payment Intent not captured successfully",
                        400
                    )
                );
            }

            let customerEmailSubject = `SlicedAdvice: ${expert.name} has completed your booking!`;
            let customerEmailMessage = `Hi there, ${customer.name}, \n\n
            ${expert.name} has completed your booking! \n\n
            You can view the details of your booking here: \n
            ${process.env.NEXT_PUBLIC_ORIGIN_URL}/dashboard/adviceSeeker/bookings?booking=${_id} \n\n
            Make sure to leave a review on the expertise post, and feel free to contact us if you have any questions. \n\n
            Thanks for using SlicedAdvice! \n\n
            SlicedAdvice Team`;

            await sendEmail({
                email: customer.email,
                subject: customerEmailSubject,
                message: customerEmailMessage,
            });
        }

        const booking = await Booking.findByIdAndUpdate(
            _id,
            {
                bookingType,
                expert,
                customer,
                expertisePost,
                status,
                singleTextResponse,
                stripePaymentIntentId,
            },
            { new: true }
        );

        if (!booking) {
            return next(new ErrorHandler("Booking could not be updated", 400));
        }

        res.status(200).json({ booking });
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
            expertId,
            customerId,
            status,
            customerSubmission,
            stripePaymentIntentId,
        } = req.body;

        const booking = await Booking.create({
            bookingType,
            expert: expertId,
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

        let expertEmailSubject = `SlicedAdvice: ${booking.customer.name} has booked you for advice!`;
        let expertEmailMessage = `Hi there, ${
            booking.expertisePost.user.name
        }, \n\n
        ${
            booking.customer.name
        } has booked you for a ${booking.bookingType.toLowerCase()}! \n\n
        You can respond to the booking here: \n
        ${process.env.NEXT_PUBLIC_ORIGIN_URL}/dashboard/expert/bookings?booking=${
            booking._id
        } \n\n
        As a reminder, the window to respond is 7 days. Feel free to contact us if you have any questions. \n\n
        Thanks for using SlicedAdvice! \n\n
        SlicedAdvice Team`;

        await sendEmail({
            email: booking.expertisePost.user.email,
            subject: expertEmailSubject,
            message: expertEmailMessage,
        });

        res.status(200).json({
            bookingId: booking._id,
        });
    }
);

// HELPER FUNCTIONS

/**
 * "Calculate the total, service fee, and marketplace fee for a booking."
 *
 * The function takes two arguments, `total` and `serviceFee`, and returns an object with three
 * properties: `totalInCents`, `serviceFeeInCents`, and `marketplaceFee`
 * @param total - The total price of the booking.
 * @param serviceFee - The fee that the customer pays to SlicedAdvice.
 * @returns An object with three properties: totalInCents, serviceFeeInCents, and marketplaceFee.
 */
const calculateBookingPriceDetails = (
    total: { toFixed: (arg0: number) => number },
    serviceFee: { toFixed: (arg0: number) => number }
) => {
    const totalInCents = Math.round(total.toFixed(2) * 100);
    const serviceFeeInCents = Math.round(serviceFee.toFixed(2) * 100);

    // Only take a marketplace fee from the pricePerSubmission, not from the total.
    // The total that we, SlicedAdvice, will get, is the marketplaceFee plus to
    // service fee from the customer.
    const marketplaceFee = (totalInCents - serviceFeeInCents) * 0.2;
    return {
        totalInCents,
        serviceFeeInCents,
        marketplaceFee,
    };
};

export {
    createStripePaymentIntent,
    updateStripePaymentIntent,
    createBooking,
    getBookings,
    updateBooking,
};
