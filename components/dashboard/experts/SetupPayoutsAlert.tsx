import { CashIcon } from "@heroicons/react/outline";
import Router from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    checkStripeAccountField,
    getStripeSetupPayoutsLink,
} from "../../../redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ButtonLoader from "../../layout/ButtonLoader";
import Loader from "../../layout/Loader";

//Set
const SetupPayoutsAlert = () => {
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
    // redux action to check whether charges are enabled. Important
    // for this component, as we want to display different messages
    // based on those Stripe account fields.
    useEffect(() => {
        // Check if the user has charges enabled on their Stripe
        // Connect account
        if (user) {
            if (user?.stripeId) {
                const field: any = {
                    field: "charges_enabled",
                };
                dispatch(checkStripeAccountField(field));
            }
        }
    }, [user]);

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
        dispatch(getStripeSetupPayoutsLink());
    };

    const isLoading = (...loadStates: any[]) => {
        loadStates.forEach((state) => {
            if (state === true) {
                return true;
            }
        });
        return false;
    };

    return authLoading ? (
        <Loader />
    ) : (
        <div className="flex justify-center items-center rounded-xl border-y-[1px] sm:border-x-[1px] border-black/10 bg-white w-full p-9">
            <div className="flex flex-col gap-5 justify-center items-center max-w-md">
                <CashIcon className=" w-16 h-16 text-brand-primary-light" />
                <h1 className="text-3xl text-center -mt-4">
                    {!user?.stripeId &&
                        "Setup payouts to be an expert on SlicedAdvice"}
                    {user?.stripeId &&
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
                    ) : !user?.stripeId ? (
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
                    You'll be redirected to Stripe to complete the onboarding
                    process.
                </p>
            </div>
        </div>
    );
};

export default SetupPayoutsAlert;
