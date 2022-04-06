import type { NextApiRequest, NextApiResponse } from 'next'
let cloudinary = require('cloudinary').v2
import User from '../models/user'
import ErrorHandler from '../utils/errorhandler'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import APIFeatures from '../utils/apiFeatures'


//Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})



//Register user => /api/auth/register
const registerUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const result = await cloudinary.uploader.upload(req.body.avatar, {
        folder: 'slicedadvice/avatars',
        width: '150',
        crop: 'scale'
    })

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    res.status(200).json({
        success: true,
        message: 'Account registered successfully'
    })
})


//Current user profile => /api/me
const currentUserProfile = catchAsyncErrors(async (req: any, res: NextApiResponse) => {
    const user = await User.findById(req.user._id)
    res.status(200).json({
        success: true,
        user
    })
})

//Update user profile => /api/me/update
const updateUserProfile = catchAsyncErrors(async (req: any, res: NextApiResponse) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name
        user.email = req.body.email

        if (req.body.password) {
            user.password = req.body.password
        }
        if (req.body.avatar !== '') {
            const image_id = user.avatar.public_id
            //Delete user's previous avatar
            await cloudinary.uploader.destroy(image_id)

            //Upload user's new avatar
            const result = await cloudinary.uploader.upload(req.body.avatar, {
                folder: 'slicedadvice/avatars',
                width: '150',
                crop: 'scale'
            })

            user.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            }
        }
        await user.save()
    }

    res.status(200).json({
        success: true,
        user
    })
})


export {
    registerUser,
    currentUserProfile,
    updateUserProfile,
}