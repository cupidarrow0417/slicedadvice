import mongoose from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface BookingInterface {
    expertisePost: mongoose.Schema.Types.ObjectId;
    bookingType: String;
    expert: mongoose.Schema.Types.ObjectId;
    customer: mongoose.Schema.Types.ObjectId;
    status: String;
    createdAt: Date;
    stripePaymentIntentId: String;
    singleTextResponse: {
        customerSubmission: String;
        expertResponse: String;
    };
}

// 2. Create a Schema corresponding to the document interface.
const bookingSchema = new mongoose.Schema<BookingInterface>({
    expertisePost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expertise Post",
        required: true,
        // The below option tells this plugin to always call `populate()` on
        // `User`
        autopopulate: true,
    },
    bookingType: {
        type: String,
        required: [true, "Please enter a booking type."],
        enum: {
            values: ["Single Text Response"],
            message: "Please select a valid booking type.",
        },
    },
    expert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        autopopulate: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        autopopulate: true,
    },
    status: {
        type: String,
        required: [true, "Please enter a status."],
        default: "Pending Acceptance",
        enum: {
            values: [
                "Pending Acceptance",
                "Accepted, Not Completed",
                "Rejected",
                "Completed",
            ],
            message: "Please select a valid status for this booking.",
        },
    },
    stripePaymentIntentId: {
        type: String,
        required: [
            true,
            "Please enter the Stripe payment intent id associated with this booking.",
        ],
    },
    singleTextResponse: {
        customerSubmission: {
            type: String,
            required: [
                true,
                "Please enter the customer's text submission for this single text response booking.",
            ],
            maxLength: [
                1000,
                "The text submission cannot be more than 1000 characters",
            ],
        },
        expertResponse: {
            type: String,
            maxLength: [
                1000,
                "The expert's response to this single text response booking cannot be more than 1000 characters",
            ],
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Library used for auto population of certain fields you call
// autopopulate: true on in the mongoose.Schema
bookingSchema.plugin(require("mongoose-autopopulate"));

export default mongoose.models["Booking"] ||
    mongoose.model<BookingInterface>(
        "Booking",
        bookingSchema
    );
