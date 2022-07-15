import User from "../models/user";
import ErrorHandler from "./errorhandler";

const checkStripeField = async (
    email: string,
    checkedField: string,
    next: any | undefined
) => {
    // Retrieve user via request (placed there during
    // the isAuthenticatedUser middleware), to retrieve
    // their Stripe account id.
    const user = await User.findOne({email: email});

    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const account = await stripe.accounts.retrieve(user.stripeConnectId);

    if (!account) {
        if (next) {
            return next(
                new ErrorHandler(
                    `An error occurred when retrieving the Stripe account to check for the ${checkedField} field.`,
                    400
                )
            );
        } else {
            return false;
        }
    }

    let accountField: any;
    if (checkedField === "charges_enabled") {
        accountField = account.charges_enabled;
    }
    // Add more for new fields

    if (accountField === null || accountField === undefined) {
        if (next) {
            return next(
                new ErrorHandler(
                    `An error occurred when accessing the ${checkedField} field for the current user's Stripe Account.`,
                    400
                )
            );
        } else {
            return false;
        }
    }

    if (accountField === false) {
        if (next) {
            return next(
                new ErrorHandler(
                    "Stripe charges not enabled! Enable it via the expert dashboard to post this expertise post.",
                    401
                )
            );
        } else {
            return false
        }
    }

    return true;
};

export default checkStripeField;
