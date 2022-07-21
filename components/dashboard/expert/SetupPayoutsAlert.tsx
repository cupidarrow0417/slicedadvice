import { CashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    checkStripeAccountField,
    getStripeSetupPayoutsLink,
} from "../../../redux/actionCreators/userActions";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ButtonLoader from "../../layout/ButtonLoader";
import Loader from "../../layout/Loader";

// SetupPayoutsAlert is a reusable component primarily
// used in the HomeExpertDashboard and PaymentsExpertDashboard
// to visually notify the user that they need to setup payouts.
// It isn't featured in the other expert dashboard pages because
// the user can't even access those pages unless they have already
// setup payouts, as I coded that into the frontend and the
// getServerSideProps function for those other pages.
const SetupPayoutsAlert = () => {
    useEffect(() => {
        toast(
            "Hey friends and family! We highly recommend each of y'all to try out the expert onboarding and to create your first expertise post! Expect Stripe to verify your identity and collect payment info. Should take less than 5 minutes!",
            {
                autoClose: 10000,
            }
        );
    }, []);

    const dispatch = useAppDispatch();

    const { user: authUser, loading: authLoading } = useAppSelector((state) => {
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

    // Use effect that checks status of the charges_enabled field, called above.
    // End goal is to figure out whether charges are enabled. The chargesEnabled
    // field is used in the returned HTML to dynamically show different messages
    // to the user, either prompting them to begin the onboarding or to continue.
    useEffect(() => {
        if (checkStripeAccountFieldError) {
            toast.error(checkStripeAccountFieldError);
        }

        // Used for debugging
        // if (checkStripeAccountFieldSuccess) {
        //     toast.success("Successfully retrieved charges enabled status.");
        // }
    }, [checkStripeAccountFieldError, checkStripeAccountFieldSuccess]);

    // This is the useEffect that watches the status of the request to create a
    // payouts link. End goal is to get the accountLink and redirect the user there.
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

    // Helper functions
    const submitHandler = () => {
        dispatch(getStripeSetupPayoutsLink({ userId: authUser._id }));
    };

    const isLoading = (...loadStates: any[]) => {
        loadStates.forEach((state) => {
            if (state === true) {
                return true;
            }
        });
        return false;
    };

    return authLoading || checkStripeAccountFieldLoading ? (
        <Loader />
    ) : (
        <div className="flex justify-center items-center rounded-xl bg-white w-full p-9">
            <div className="flex flex-col gap-5 justify-center items-center max-w-md">
                <CashIcon className=" w-16 h-16 text-brand-primary-light" />
                <h1 className="text-3xl text-center -mt-4">
                    {!authUser?.stripeConnectId &&
                        "Setup payouts to be an expert on SlicedAdvice"}
                    {authUser?.stripeConnectId &&
                        !chargesEnabled &&
                        "Continue to setup payouts to be an expert on SlicedAdvice"}
                </h1>
                <p className="text-sm opacity-60 text-center ">
                    SlicedAdvice partners with Stripe to transfer earnings to
                    your bank account.
                </p>
                <button
                    onClick={submitHandler}
                    className="bg-brand-primary-light rounded-lg text-white w-full py-3 text-lg flex justify-center items-center"
                    disabled={
                        isLoading(
                            authLoading,
                            checkStripeAccountFieldLoading,
                            setupPayoutsLinkLoading
                        )
                            ? true
                            : false
                    }
                >
                    {setupPayoutsLinkLoading ? (
                        <ButtonLoader />
                    ) : !authUser?.stripeConnectId ? (
                        "Setup Payouts"
                    ) : !chargesEnabled ? (
                        "Continue Setup"
                    ) : (
                        "Else, woohoo, charges enabled! This won't show though, " +
                        "as this entire component won't even render if charges are enabled. " +
                        "the parent component should display something useful now, now that this " +
                        "expert has charges enabled."
                    )}
                </button>
                <p className="text-xs opacity-60 text-center ">
                    You&apos;ll be redirected to Stripe to complete the
                    onboarding process.
                </p>
            </div>
        </div>
    );
};

export default SetupPayoutsAlert;
