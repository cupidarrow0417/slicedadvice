import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Review from "../models/review";
import ExpertisePost from "../models/expertisePost";

//Create new Booking  => POST /api/bookings
const createReview = catchAsyncErrors(
    async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: (arg0: ErrorHandler) => any
    ) => {
        const {
            rating,
            content,
            user,
            expertisePostId,
        } = req.body;

        const review = await Review.create({
            rating: rating,
            content: content,
            user: user,
            expertisePostId: expertisePostId,
        });

        if (!review) {
            return next(new ErrorHandler("Review could not be created", 400));
        }

        res.status(200).json({
            success: true,
            reviewId: review._id,
        });
    }
);

//Get single expertisePost => GET /api/expertisePosts/:id/reviews
const getSinglePostReviews = catchAsyncErrors(
    async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: (arg0: ErrorHandler) => any
    ) => {
        const reviews = await Review.find({expertisePost: req.query.id})

        console.log("reviews", reviews)
        if (!reviews) {
            return next(new ErrorHandler("Room not found with this ID", 404));
        }

        res.status(200).json({
            success: true,
            reviews,
        });
    }
);


export { createReview, getSinglePostReviews };
