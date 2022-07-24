import type { NextApiRequest, NextApiResponse } from "next";
let cloudinary = require("cloudinary").v2;
import User from "../models/user";
import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import absoluteUrl from "next-absolute-url";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

//Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//Register user by credentials=> /api/auth/register
const registerUserByCredentials = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse) => {
        // Boolean to check if user inputted profile pic.
        let userInputtedImage =
            req.body.avatar !== "/images/default_avatar.jpeg";

        let result;

        // If user inputted profile pic, upload it to cloudinary.
        // Else, just use the default avatar, stored in the files.
        if (userInputtedImage) {
            result = await cloudinary.uploader.upload(req.body.avatar, {
                folder: "slicedadvice/avatars",
                width: "150",
                crop: "scale",
            });
        } else {
            result = {
                secure_url: "/images/default_avatar.jpeg",
                public_id: "slicedadvice/avatars/default_avatar",
            };
        }

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
            user,
        });
    }
);

//getUserProfileById => GET /api/me/[id
const getUserProfileById = catchAsyncErrors(
    async (req: any, res: NextApiResponse) => {
        const user = await User.findOne({
            _id: req.query.id,
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    }
);

//Update user profile => /api/me/update
const updateUserProfile = catchAsyncErrors(
    async (req: any, res: NextApiResponse) => {
        const user = await User.findById(req.body.userId)

        if (user) {
            if (req.body.name !== user.name) {
                // Check if req.body.name is a duplicate username in the database of users
                const duplicateUser = await User.findOne({
                    name: req.body.name,
                });

                if (duplicateUser) {
                    return res.status(400).json({
                        message: "Username already exists, try another!",
                    });
                } else {
                    user.name = req.body.name;
                }
            }

            // As of July 7th, this code should never run.
            // Email updating is not allowed, until we code in
            // email verification here as well.
            if (req.body.email !== "") {
                user.email = req.body.email;
            }

            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.body.avatar !== "") {
                const image_id = user.avatar.public_id;

                if (image_id !== "slicedadvice/avatars/default_avatar") {
                    //Delete user's previous avatar if they don't have the default currently.
                    await cloudinary.uploader.destroy(image_id);
                }

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

        if (user.role !== "user") {
            if (user.role === "googleUser") {
                return next(
                    new ErrorHandler(
                        "Account is registered with Google. Handle passwords via Google!",
                        400
                    )
                );
            } else {
                return next(
                    new ErrorHandler(
                        "Account registered via a provider (Google, Apple, etc). Handle passwords via the provider!",
                        400
                    )
                );
            }
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
            message: "Password updated successfully",
        });
    }
);

//Verify Email (Step 1) Send email verification code => POST /api/auth/email/sendVerification
const sendEmailVerification = catchAsyncErrors(
    async (req: any, res: NextApiResponse, next: any) => {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(
                new ErrorHandler("Cannot find user with that email!", 404)
            );
        }

        if (user.role !== "user") {
            if (user.role === "googleUser") {
                return next(
                    new ErrorHandler(
                        "Account is registered with Google. No need to verify the email!",
                        400
                    )
                );
            } else {
                return next(
                    new ErrorHandler(
                        "Account registered via a provider (Google, Apple, etc). No need to verify the email!",
                        400
                    )
                );
            }
        }

        if (user.verifiedEmail) {
            return next(
                new ErrorHandler("User's email is already verified!", 400)
            );
        }

        // If the user has an old verification code, delete it
        if (user.emailVerificationCode) {
            user.emailVerificationCode = undefined;
            user.emailVerificationExpire = undefined;
            await user.save({ validateBeforeSave: false });
        }

        const emailVerificationCode = user.getEmailVerificationCode();

        await user.save({ validateBeforeSave: false });

        const message = `Hey there! Welcome to SlicedAdvice! We're so happy you're here. 
            Here is your email verification code: ${emailVerificationCode} \n\n
            Please enter it in the already open verification page. \n\n
            \n\n
            Need to generate a new code? Head to the link below.\n\n
            ${process.env.NEXT_PUBLIC_ORIGIN_URL?.toString()}/emailVerification?email=${user.email} \n\n
            If you did not request this email, then please ignore it. Have a great day!`;

        try {
            await sendEmail({
                email: user.email,
                subject: `SlicedAdvice: ${emailVerificationCode} is your email verification code`,
                message,
            });
            res.status(200).json({
                success: true,
            });
        } catch (error: any) {
            user.emailVerificationCode = undefined;
            user.emailVerificationExpired = undefined;
            await user.save({ validateBeforeSave: false });

            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Verify Email (Step 2) Check user's entered verification code. => POST /api/auth/email/checkVerification
const checkEmailVerificationCode = catchAsyncErrors(
    async (req: any, res: NextApiResponse, next: any) => {
        const user = await User.findOne({
            email: req.body.email,
            emailVerificationCode: req.body.code,
            emailVerificationExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(
                new ErrorHandler(
                    "This email verification code is invalid or has expired.",
                    400
                )
            );
        }

        // Else, user is verified.

        user.verifiedEmail = true;

        //Change reset fields to undefined after successful password change
        user.emailVerificationCode = undefined;
        user.emailVerificationExpire = undefined;

        await user.save();
        res.status(200).json({
            success: true,
            user,
        });
    }
);

// Check for duplicate user's based on name and email => GET /api/auth/duplicate
const checkDuplicateUser = catchAsyncErrors(
    async (req: any, res: NextApiResponse) => {
        let user1, user2;
        const { name, email } = req.query;
        if (name) {
            user1 = await User.findOne({ name: name });
        }
        if (email) {
            user2 = await User.findOne({ email: email });
        }
        if (user1 || user2) {
            res.status(200).json({
                duplicateName: user1 ? true : false,
                duplicateEmail: user2 ? true : false,
            });
        } else {
            res.status(200).json({
                duplicateName: false,
                duplicateEmail: false,
            });
        }
    }
);

// Get Stripe Setup Payouts Link => POST /api/stripe/payouts/link
const getStripeSetupPayoutsLink = catchAsyncErrors(
    async (req: any, res: NextApiResponse, next: any) => {
        // Retrieve user, first check for an existing stripe account, then eventually save
        // a new stripe account id and also prepopulate
        // values in their onboarding process
        console.log("req.body", req.body);
        const user = await User.findById(req.body.userId);

        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

        let stripeConnectId: string;
        if (!user.stripeConnectId) {
            // Create a new Stripe Express account

            const account = await stripe.accounts.create({
                type: "express",
                email: user.email,
                business_type: "individual",
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                },
            });

            user.stripeConnectId = account.id;
            stripeConnectId = user.stripeConnectId;
            user.save();
        } else {
            stripeConnectId = user.stripeConnectId;
        }

        //Get origin
        const { origin } = absoluteUrl(req);

        // Create the account link to begin onboarding
        const accountLink = await stripe.accountLinks.create({
            account: stripeConnectId,
            refresh_url: `${origin}/dashboard/expert/refresh`,
            return_url: `${origin}/dashboard/expert/home`,
            type: "account_onboarding",
        });

        if (!accountLink) {
            return next(
                new ErrorHandler(
                    "An error occurred when creating the Stripe account link.",
                    400
                )
            );
        }

        res.status(200).json({
            accountLink: accountLink,
        });
    }
);

// Check stripe account field => POST /api/stripe/check
const checkStripeAccountField = catchAsyncErrors(
    async (req: any, res: NextApiResponse, next: any) => {
        // Retrieve user
        const user = await User.findById(req.body.userId);

        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

        const account = await stripe.accounts.retrieve(user.stripeConnectId);

        if (!account) {
            return next(
                new ErrorHandler(
                    `An error occurred when retrieving the Stripe account to check for the ${req.body.field} field.`,
                    400
                )
            );
        }

        let accountField: any;
        // Add more conditionals based on any other fields you need to check
        // in the future.

        if (req.body.field === "charges_enabled") {
            accountField = account.charges_enabled;
        }

        if (accountField === null || accountField === undefined) {
            return next(
                new ErrorHandler(
                    `An error occurred when accessing the ${req.body.field} field for the current user's Stripe Account.`,
                    400
                )
            );
        }

        res.status(200).json({
            accountField,
        });
    }
);

// Create Stripe Connect Login Link => POST /api/stripe/expertLoginLink
const createStripeConnectLoginLink = catchAsyncErrors(
    async (req: any, res: NextApiResponse, next: any) => {
        // Retrieve user
        const user = await User.findById(req.body.userId);

        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

        const account = await stripe.accounts.retrieve(user.stripeConnectId);
        if (!account) {
            return next(
                new ErrorHandler(
                    `An error occurred when retrieving the Stripe account to create a Stripe Connect Login Link.`,
                    400
                )
            );
        }

        // Create the login link
        const loginLink = await stripe.accounts.createLoginLink(
            user.stripeConnectId
        );
        if (!loginLink) {
            return next(
                new ErrorHandler(
                    `An error occurred when creating the Stripe Connect Login Link.`,
                    400
                )
            );
        }

        res.status(200).json({
            loginLink,
        });
    }
);

export {
    registerUserByCredentials,
    getUserProfileById,
    updateUserProfile,
    forgotPassword,
    resetPassword,
    checkDuplicateUser,
    getStripeSetupPayoutsLink,
    sendEmailVerification,
    checkEmailVerificationCode,
    checkStripeAccountField,
    createStripeConnectLoginLink,
};
