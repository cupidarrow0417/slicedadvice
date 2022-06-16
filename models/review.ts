import mongoose from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface ReviewInterface {
    rating: Number; // Stars 1-5
    description: string;
    expertisePost: mongoose.Schema.Types.ObjectId; // more specificity?
    user: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const reviewSchema = new mongoose.Schema<ReviewInterface>({
    rating: {
        type: Number,
        default: 0,
        required: [true, "Please enter a rating."],
    },
    description: {
        type: String,
        required: false,
        maxLength: [
            1000,
            "Reviews cannot exceed 1000 characters.",
        ],
    },
    expertisePost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expertise Post",
        required: true,
        // The below option tells this plugin to always call `populate()` on
        // `expertisePost`
        autopopulate: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
        // The below option tells this plugin to always call `populate()` on
        // `User`
        autopopulate: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    } 
});

// Library used for auto population of certain fields you call
// autopopulate: true on in the mongoose.Schema
reviewSchema.plugin(require("mongoose-autopopulate"));

export default mongoose.models["Review"] ||
    mongoose.model<ReviewInterface>(
        "Review",
        reviewSchema
    );