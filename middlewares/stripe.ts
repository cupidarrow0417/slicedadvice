import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorhandler";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../models/user";
import checkStripeField from "../utils/checkStripeField";


/* A middleware function that checks if the user has enabled Stripe charges. */
const isStripeOnboardedUser = catchAsyncErrors(
    async (req: any, res: any, next: any) => {
        let isOnboarded: boolean = await checkStripeField(req.user.email, "charges_enabled", next);
        if (isOnboarded) {
            next();
        } else {
            return next(new ErrorHandler('Onboard with Stripe first to access this resource!', 401))
        }
    }
);

export { isStripeOnboardedUser };
