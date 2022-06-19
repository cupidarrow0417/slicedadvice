import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Review from "../models/review";
import APIFeatures from "../utils/apiFeatures";
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
            description,
            expertisePostId,
            userId,
            status,

        } = req.body;

        const review = await Review.create({
            rating: rating,
            description: description,
            user: userId,
            expertisePost: expertisePostId,
            status,
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
        const reviews = await Review.find({expertisePostID: req.query.id})

        if (!reviews) {
            return next(new ErrorHandler("Room not found with this ID", 404));
        }

        res.status(200).json({
            success: true,
            reviews,
        });
    }
);


//Get all bookings => GET /api/reviews
const allReviews = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse, next: any) => {
        const resPerPage = 20;
        const reviewCount = await Review.countDocuments();
        //search with optional queries, handled via .search() method.
        const apiFeatures = new APIFeatures(Review.find(), req.query)

        let reviews = await apiFeatures.query;
        let filteredBookingsCount = reviews.length;

        apiFeatures.pagination(resPerPage);
        reviews = await apiFeatures.query.clone();

        res.status(200).json({
            success: true,
            reviewCount,
            resPerPage,
            filteredBookingsCount,
            reviews,
        });
    }
);

export { createReview, getSinglePostReviews, allReviews };
