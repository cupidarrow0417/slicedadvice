import mongoose from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface ExpertisePostInterface {
    title: string;
    description: string;
    pricePerSubmission: Number;
    submissionTypes: string[];
    numOfReviews: Number; // We need to dynamically update this field
    images: Array<Object>;
    category: String;
    reviews: Array<Object>;
    user: mongoose.Schema.Types.ObjectId;
    stripeId: String;
    createdAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const expertisePostSchema = new mongoose.Schema<ExpertisePostInterface>({
    title: {
        type: String,
        required: [true, "Please enter a title for this post."],
        trim: true,
        maxLength: [100, "Expertise post title cannot exceed 100 characters."],
    },
    description: {
        type: String,
        required: [true, "Please enter a description for this post."],
        maxLength: [
            1000,
            "Expertise post description cannot exceed 1000 characters.",
        ],
    },
    pricePerSubmission: {
        type: Number,
        required: [true, "Please enter a price per bite-sized submission."],
        min: 1,
        default: 1,
    },
    submissionTypes: [
        {
            type: String,
            required: [
                true,
                "Please enter at least one type of bite-sized submissions someone might send you.",
            ],
        },
    ],
    numOfReviews: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please enter advice category"],
        enum: {
            values: [
                "Career Growth",
                "College Application",
                "Personal Development",
                "Other",
            ],
            message: "Please select a correct advice category.",
        },
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
            required: false,
            // The below option tells this plugin to always call `populate()` on
            // `review`
            autopopulate: true,
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
        // The below option tells this plugin to always call `populate()` on
        // `User`
        autopopulate: true,
    },
    stripeId: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Library used for auto population of certain fields you call
// autopopulate: true on in the mongoose.Schema
expertisePostSchema.plugin(require("mongoose-autopopulate"));

export default mongoose.models["Expertise Post"] ||
    mongoose.model<ExpertisePostInterface>(
        "Expertise Post",
        expertisePostSchema
    );
