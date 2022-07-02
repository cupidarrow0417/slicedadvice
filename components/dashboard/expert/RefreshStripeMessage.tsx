import Router from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {
    checkStripeAccountField,
    getStripeSetupPayoutsLink,
} from "../../../redux/actionCreators/userActions";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../layout/Loader";

const RefreshStripeMessage = () => {
    const dispatch = useAppDispatch();
    const { user, loading: authLoading } = useAppSelector((state) => {
        return state.auth;
    });

    const {
        accountField: chargesEnabled,
        loading: checkStripeAccountFieldLoading,
        success: checkStripeAccountFieldSuccess,
        error: checkStripeAccountFieldError,
    } = useAppSelector((state) => {
        return state.checkStripeAccountField;
    });

    const {
        accountLink,
        success: setupPayoutsLinkSuccess,
        error: setupPayoutsLinkError,
        loading: setupPayoutsLinkLoading,
    } = useAppSelector((state) => {
        return state.stripeSetupPayoutsLink;
    });

    // Initial useEffect that checks for stripe id and dispatches
    // redux action to check whether charges are enabled
    useEffect(() => {
        // Check if the user has charges enabled on their Stripe
        // Connect account
        if (user) {
            if (user?.stripeId) {
                const field: any = {
                    field: "charges_enabled",
                };
                dispatch(checkStripeAccountField(field));
            } else {
                // If the user doesn't have a Stripe Id, they should be
                // sent to the Expert Home Dashboard to see the
                // Setup Payouts Alert, to begin Stripe onboarding.
                Router.push("/dashboard/expert/home");
            }
        }
    }, [user]);

    // Use effect that checks status of the charges_enabled field.
    // End goal is to either dispatch the getStripeSetupPayoutsLink
    // action if user doesn't have charges enabled fully, or to redirect
    // to the dashboard if they do.
    useEffect(() => {
        if (checkStripeAccountFieldError) {
            toast.error(checkStripeAccountFieldError);
        }

        if (checkStripeAccountFieldSuccess) {
            toast.success("Successfully retrieved charges enabled status.");
        }

        if (chargesEnabled === false) {
            // Charges not enabled yet, so create new account link and
            // redirect the user automatically
            dispatch(getStripeSetupPayoutsLink());
        }

        if (chargesEnabled === true) {
            // Charges already enabled, so send the user to
            // the expert dashboard home
            Router.push("/dashboard/expert/home");
        }
    }, [
        checkStripeAccountFieldError,
        checkStripeAccountFieldSuccess,
        chargesEnabled,
    ]);

    // useEffect that checks the status of the getStripeSetupPayoutsLink
    // action. End goal is to retrieve the url and redirect to it once received,
    // or display any errors if the action failed in any way.
    useEffect(() => {
        if (setupPayoutsLinkSuccess) {
            toast.success("Stripe Setup Payouts Link Created!");
        }

        if (setupPayoutsLinkError) {
            toast.error(setupPayoutsLinkError);
        }

        if (accountLink) {
            // Got the redirect url!
            Router.push(accountLink);
        }
    }, [setupPayoutsLinkSuccess, setupPayoutsLinkError, accountLink]);

    return (
        <div className=" h-60 flex flex-col gap-10 justify-center items-center">
            <h1 className="text-3xl font-bold">
                Looking for Stripe onboarding? No worries, I'll redirect you to
                the right place based on your Stripe account status.
            </h1>
            {authLoading && (
                <div className="flex gap-4">
                    <Loader />
                    <h1>Loading user...</h1>
                </div>
            )}
            {checkStripeAccountFieldLoading && (
                <div className="flex gap-4">
                    <Loader />
                    <h1>
                        Checking if your Stripe account has charges enabled...
                    </h1>
                </div>
            )}
            {setupPayoutsLinkLoading && (
                <div className="flex gap-4">
                    <Loader />
                    <h1>Creating a fresh payouts onboarding link...</h1>
                </div>
            )}
        </div>
    );
};

export default RefreshStripeMessage;
