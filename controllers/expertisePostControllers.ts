import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
let cloudinary = require("cloudinary").v2;
import ExpertisePost from "../models/expertisePost";
import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { ExpertisePostAPIFeatures } from "../utils/apiFeatures";
import updateExpertisePost from "../components/expertisePost/UpdateExpertisePost";

//Get all expertisePosts => GET /api/expertisePosts
const allExpertisePosts = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const resPerPage = 100;
        const expertisePostsCount = await ExpertisePost.countDocuments();
        //search with optional queries, handled via .search() method.
        const apiFeatures = new ExpertisePostAPIFeatures(
            ExpertisePost.find(),
            req.query
        )
            .search()
            .filter();

        let expertisePosts = await apiFeatures.query;
        let filteredExpertisePostsCount = expertisePosts.length;

        apiFeatures.pagination(resPerPage);
        expertisePosts = await apiFeatures.query.clone();

        res.status(200).json({
            success: true,
            expertisePostsCount,
            resPerPage,
            filteredExpertisePostsCount,
            expertisePosts,
        });
    }
);

//Get single expertisePost => GET /api/expertisePosts/:id
const getSingleExpertisePost = catchAsyncErrors(
    async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: (arg0: ErrorHandler) => any
    ) => {
        const expertisePost = await ExpertisePost.findById(req.query.id);

        if (!expertisePost) {
            return next(new ErrorHandler("Room not found with this ID", 404));
        }

        res.status(200).json({
            success: true,
            expertisePost,
        });
    }
);

//Create new expertisePost => POST /api/expertisePosts
const createExpertisePost = catchAsyncErrors(
    async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: (arg0: ErrorHandler) => any
    ) => {
        const {
            user,
            stripeConnectId,
            title,
            description,
            submissionTypes,
            pricePerSubmission,
            category,
            cloudinaryImageData,
        } = req.body;
        console.log("req.body", req.body);

        const expertisePost = await ExpertisePost.create({
            user,
            stripeConnectId,
            title,
            description,
            images: [
                cloudinaryImageData
            ],
            submissionTypes,
            pricePerSubmission,
            category,
        });
        console.log("expertisePost", expertisePost);

        if (!expertisePost) {
            return next(
                new ErrorHandler("Expertise post not created successfully", 400)
            );
        }

        res.status(200).json({
            success: true,
            expertisePostId: expertisePost._id,
        });
    }
);

//Update single expertisePost => PUT /api/expertisePosts/:id
const updateSingleExpertisePost = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse) => {
        let updatedExpertisePost = await ExpertisePost.findById(req.query.id);

        if (!updatedExpertisePost) {
            return res.status(404).json({
                success: false,
                error: "Expertise Post not found with this ID",
            });
        }

        const {
            title,
            description,
            submissionTypes,
            pricePerSubmission,
            category,
            cloudinaryImageData
        } = req.body;

        // console.log("CURRENT IMAGE: ");
        // console.log(currentImage);

        // const result = await cloudinary.uploader.upload(req.body.image, {
        //     folder: "slicedadvice/expertisePostImages",
        //     width: "750",
        //     crop: "scale",
        // });
        
        const destroy = await cloudinary.uploader.destroy(updatedExpertisePost.images[0].public_id);
        console.log(destroy);

        updatedExpertisePost = await ExpertisePost.findByIdAndUpdate(
            req.query.id,
            {
                title,
                description,
                images: [
                    {
                        public_id: cloudinaryImageData.public_id,
                        url: cloudinaryImageData.url,
                    },
                ],
                submissionTypes,
                pricePerSubmission,
                category,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        // console.log(updatedExpertisePost);

        res.status(200).json({
            success: true,
            updatedExpertisePostId: updatedExpertisePost._id,
        });
    }
);

//Delete single expertisePost => DELETE /api/expertisePosts/:id
//Note: haven't handled deleting images yet!
const deleteSingleExpertisePost = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse) => {
        let expertisePost = await ExpertisePost.findById(req.query.id);

        if (!expertisePost) {
            return res.status(404).json({
                success: false,
                error: "Expertise Post not found with this ID",
            });
        }

        expertisePost.remove();

        res.status(200).json({
            success: true,
            message: "Expertise Post was deleted.",
        });
    }
);

export {
    allExpertisePosts,
    getSingleExpertisePost,
    createExpertisePost,
    updateSingleExpertisePost,
    deleteSingleExpertisePost,
};
