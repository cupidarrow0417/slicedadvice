import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import ExpertisePost from '../models/expertisePost'
import ErrorHandler from '../utils/errorhandler'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import APIFeatures from '../utils/apiFeatures'


//Get all expertisePosts => GET /api/expertisePosts
const allExpertisePosts = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const resPerPage = 4
    const expertisePostsCount = await ExpertisePost.countDocuments()

    //search with optional queries, handled via .search() method.
    const apiFeatures = new APIFeatures(ExpertisePost.find(), req.query)
        .search()
        .filter()
        
    
    let expertisePosts = await apiFeatures.query
    let filteredExpertisePostsCount = expertisePosts.length

    apiFeatures.pagination(resPerPage)
    expertisePosts = await apiFeatures.query.clone()

    res.status(200).json({
        success: true,
        expertisePostsCount,
        resPerPage,
        filteredExpertisePostsCount,
        expertisePosts
    })
})

//Get single expertisePost => GET /api/expertisePosts/:id
const getSingleExpertisePost = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse, next: (arg0: ErrorHandler) => any) => {
    const expertisePost = await ExpertisePost.findById(req.query.id);

    if (!expertisePost) {
        return next(new ErrorHandler('Room not found with this ID', 404));
    } 

    res.status(200).json({
        success: true,
        expertisePost
    })
})

//Create new expertisePost => POST /api/expertisePosts
const newExpertisePost = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const expertisePost = await ExpertisePost.create(req.body);

    res.status(200).json({
        success: true,
        expertisePost
    })
})

//Update single expertisePost => PUT /api/expertisePosts/:id
const updateSingleExpertisePost = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    let expertisePost = await ExpertisePost.findById(req.query.id);

    if (!expertisePost) {
        return res.status(404).json({
            success: false,
            error: 'Expertise Post not found with this ID'
        })
    } 

    expertisePost = await ExpertisePost.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        expertisePost
    })
})


//Delete single expertisePost => DELETE /api/expertisePosts/:id
//Note: haven't handled deleting images yet!
const deleteSingleExpertisePost = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    let expertisePost = await ExpertisePost.findById(req.query.id);

    if (!expertisePost) {
        return res.status(404).json({
            success: false,
            error: 'Expertise Post not found with this ID'
        })
    } 

    expertisePost.remove()

    res.status(200).json({
        success: true,
        message: 'Expertise Post was deleted.'
    })
})

export {
    allExpertisePosts,
    getSingleExpertisePost,
    newExpertisePost,
    updateSingleExpertisePost,
    deleteSingleExpertisePost
}