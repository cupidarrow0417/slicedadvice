import mongoose from 'mongoose'


// 1. Create an interface representing a document in MongoDB.
interface ExpertisePostInterface {
    title: string;
    description: string;
    pricePerSubmission: Number;
    ratings: Number;
    numOfReviews: Number;
    images: Array<Object>;
    category: String;
    reviews: Array<Object>;
    user: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
}


// 2. Create a Schema corresponding to the document interface.
const expertisePostSchema = new mongoose.Schema<ExpertisePostInterface>({
    title: {
        type: String,
        required: [true, 'Please enter a title for this post.'],
        trim: true,
        maxLength: [100, 'Room name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description for this post.'],
    },
    pricePerSubmission: {
        type: Number,
        required: [true, 'Please enter a price per bite-sized submission.'],
        default: 0.0
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please enter advice category'],
        enum: {
            values: [
                'Career Growth',
                'College Application',
                'Personal Development',
                'Other'
            ],
            message: 'Please select a correct advice category.'
        }
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.models['Expertise Post'] || mongoose.model<ExpertisePostInterface>("Expertise Post", expertisePostSchema);