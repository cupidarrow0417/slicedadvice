import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import ExpertisePost from '../models/expertisePost'
import ErrorHandler from '../utils/errorhandler'

console.log("ExpertisePost: ", ExpertisePost);



//Get all expertisePosts => GET /api/expertisePosts
const allExpertisePosts = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const expertisePosts = await ExpertisePost.find();
    
        res.status(200).json({
            success: true,
            expertisePosts
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        })
    }
}

//Get single expertisePost => GET /api/expertisePosts/:id
const getSingleExpertisePost = async (req: NextApiRequest, res: NextApiResponse, next: (arg0: ErrorHandler) => any) => {

    try {
        const expertisePost = await ExpertisePost.findById(req.query.id);
    
        if (!expertisePost) {
            return next(new ErrorHandler('Room not found with this ID', 404));
        } 

        res.status(200).json({
            success: true,
            expertisePost
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        })
    }
}

//Create new expertisePost => POST /api/expertisePosts
const newExpertisePost = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const expertisePost = await ExpertisePost.create(req.body);

        res.status(200).json({
            success: true,
            expertisePost
        })
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            success: false,
            error: error
        })
    }
}

//Update single expertisePost => PUT /api/expertisePosts/:id
const updateSingleExpertisePost = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
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
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        })
    }
}


//Delete single expertisePost => DELETE /api/expertisePosts/:id
//Note: haven't handled deleting images yet!
const deleteSingleExpertisePost = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
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
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        })
    }
}
export {
    allExpertisePosts,
    getSingleExpertisePost,
    newExpertisePost,
    updateSingleExpertisePost,
    deleteSingleExpertisePost
}