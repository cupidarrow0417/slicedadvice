import type { NextApiRequest, NextApiResponse } from "next";
let cloudinary = require("cloudinary").v2;
import User from "../models/user";
import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";
import absoluteUrl from "next-absolute-url";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

//Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//Register user => /api/auth/register
const registerUser = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const result = await cloudinary.uploader.upload(req.body.avatar, {
            folder: "slicedadvice/avatars",
            width: "150",
            crop: "scale",
        });

        const { name, email, password } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url,
            },
        });

        res.status(200).json({
            success: true,
            message: "Account registered successfully",
        });
    }
);

//Current user profile => /api/me
const currentUserProfile = catchAsyncErrors(
    async (req: any, res: NextApiResponse) => {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success: true,
            user,
        });
    }
);

//Update user profile => /api/me/update
const updateUserProfile = catchAsyncErrors(
    async (req: any, res: NextApiResponse) => {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name;
            user.email = req.body.email;

            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.body.avatar !== "") {
                const image_id = user.avatar.public_id;
                //Delete user's previous avatar
                await cloudinary.uploader.destroy(image_id);

                //Upload user's new avatar
                const result = await cloudinary.uploader.upload(
                    req.body.avatar,
                    {
                        folder: "slicedadvice/avatars",
                        width: "150",
                        crop: "scale",
                    }
                );

                user.avatar = {
                    public_id: result.public_id,
                    url: result.secure_url,
                };
            }
            await user.save();
        }

        res.status(200).json({
            success: true,
            user,
        });
    }
);

//Forgot password => /api/password/forgot
const forgotPassword = catchAsyncErrors(
    async (req: any, res: NextApiResponse, next: any) => {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(
                new ErrorHandler("User not found with this email", 404)
            );
        }

        //Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        //Get origin
        const { origin } = absoluteUrl(req);

        //Create reset password url that will be sent in email
        const resetUrl = `${origin}/password/reset/${resetToken}`;

        const message = `Hey there! Looking to reset your password? 
            Here is your password reset url: \n\n ${resetUrl} \n\n
            If you did not request this email, then please ignore it. Have a great day!`;

        try {
            await sendEmail({
                email: user.email,
                subject: "SlicedAdvice Password Recovery",
                message,
            });
            res.status(200).json({
                success: true,
                message: `Email sent to: ${user.email}`,
            });
        } catch (error: any) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpired = undefined;
            await user.save({ validateBeforeSave: false });

            return next(new ErrorHandler(error.message, 500));
        }
    }
);

//Forgot password => /api/password/forgot
const resetPassword = catchAsyncErrors(
    async (req: any, res: NextApiResponse, next: any) => {
        // Hash URL token
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.query.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(
                new ErrorHandler(
                    "This reset password token is invalid or has expired.",
                    400
                )
            );
        }

        //Get new password from req.body
        const newPassword = req.body.password;

        //Change user's password
        user.password = newPassword;

        //Change reset fields to undefined after successful password change
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    }
);

export {
    registerUser,
    currentUserProfile,
    updateUserProfile,
    forgotPassword,
    resetPassword,
};
