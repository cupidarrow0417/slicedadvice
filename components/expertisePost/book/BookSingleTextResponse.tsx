import React, { useState, useEffect, Fragment } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import Router, { useRouter } from "next/router";
import { PencilAltIcon } from "@heroicons/react/outline";
import Link from "next/link";
import PageHeader from "../../atoms/PageHeader";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    cacheBookingData,
    createStripePaymentIntent,
    clearStripePaymentIntentErrors,
    updateStripePaymentIntent,
} from "../../../redux/actionCreators/bookingActionCreators";
import { toast } from "react-toastify";
import Loader from "../../layout/Loader";
import CheckoutForm from "./CheckoutForm";
import OldPageHeader from "../../atoms/OldPageHeader";
import { useSession } from "next-auth/react";

// REINSTANTIATE STRIPE ELEMENTS PROVIDER, as for payment intent, we require
// an options that contains the paymentIntentClientSecret for the current
// payment intent.
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const BookSingleTextResponse = () => {
    const stripe = useStripe();
    // Get Session via useSession hook
    const { data: session }: any = useSession();
    const dispatch = useAppDispatch();
    const { query: queryParams } = useRouter();
    // Holds text that user types in
    const [textSubmission, setTextSubmission] = useState("");
    // Holds the final submission once the user clicks continue to
    // payment.
    const [finalTextSubmission, setFinalTextSubmission] = useState("");
    const [userClickedContinue, setUserClickedContinue] = useState(false);

    const { expertisePost, error } = useAppSelector(
        (state) => state.expertisePostDetails
    );

    const {
        stripePaymentIntentClientSecret,
        loading,
        error: stripePaymentIntentError,
    } = useAppSelector((state) => state.stripePaymentIntent);
    const { bookingData: cachedBookingData } = useAppSelector(
        (state) => state.cacheBookingData
    );

    // Calculate prices
    const pricePerSubmission: number = expertisePost?.pricePerSubmission;
    const serviceFeeString: string = (
        Math.round((pricePerSubmission * 0.029 + 0.3) * 100) / 100
    ).toFixed(2);
    const serviceFee: number = parseFloat(serviceFeeString);
    const total: number = pricePerSubmission + serviceFee;

    // First user step: user fills out a text submission
    // and clicks continue.
    const handleContinueClick = (e: any) => {
        e.preventDefault();
        if (!stripePaymentIntentError) {
            setUserClickedContinue(true);
            setFinalTextSubmission(textSubmission);
        }
    };

    useEffect(() => {
        if (userClickedContinue === true) {
            let paymentSectionElement =
                document.getElementById("paymentSection");
            paymentSectionElement?.scrollIntoView({ behavior: "smooth" });
        }
    }, [userClickedContinue]);

    useEffect(() => {
        if (userClickedContinue && session && expertisePost) {
            // Create PaymentIntent as soon as the user clicks the
            // continue button.

            // This data will be passed into the global state
            // as well as the Stripe Payment intent metadata
            // for book keeping. Mainly though, we need it in the global
            // state because once the user is redirected to the
            // success page, we need to create a booking associated
            // with this order data and the successful payment
            // intent (only if the bookingCreated boolean is false)
            const bookingData = {
                total,
                pricePerSubmission,
                serviceFee: serviceFee,
                bookingType: "Single Text Response",
                expertisePostId: expertisePost?._id,
                expertId: expertisePost?.user?._id,
                customerId: session?.user?._id,
                status: "Not Completed",
                customerSubmission: finalTextSubmission,
                bookingCreated: false,

                // USED IN STRIPE PAYMENT INTENT TO PAYOUT
                // TO EXPERT ONCE THEY FULFILL THE BOOKING
                expertStripeConnectId: expertisePost?.user?.stripeConnectId,
            };
            dispatch(cacheBookingData(bookingData));

            // (LEAVING THIS HERE UNTIL STRIPE ISSUE IS FIXED. 
            // Check if a Stripe Payment Intent Client Secret
            // already exists in the global state.
            // If it does, check if the payment intent is still referring to the same
            // expertise post (check transfer_data.destination). 
            // If it is, update it with the latest data by
            // retrieving the payment intent via the client secret,
            // and calling the updateStripePaymentIntent action creator
            // with the updated booking data and the id of the payment intent
            // if (stripePaymentIntentClientSecret && stripe) {
            //     stripe
            //         .retrievePaymentIntent(stripePaymentIntentClientSecret)
            //         .then(function (result) {
            //             // Handle result.error or result.paymentIntent
            //             if (result.error) {
            //                 // If error, prevent user from continuing
            //                 setUserClickedContinue(false);
            //                 toast.error(result.error.message);
            //                 return;
            //             } else if (result.paymentIntent) {
            //                 // If the payment intent is still referring to the same
            //                 // expertise post, update it with the latest data. 
            //                 // Else, just create a new payment intent.
            //                 console.log("result.paymentIntentt: ", result.paymentIntent);
            //                 // if (
            //                 //     result.paymentIntent.transfer_data.destination ===
            //                 //     expertisePost?.user?.stripeConnectId
            //                 // ) {
            //                 //     dispatch(
            //                 //         updateStripePaymentIntent(
            //                 //             bookingData,
            //                 //             result.paymentIntent.id
            //                 //         )
            //                 //     );
            //                 // }
            //             }
            //         }
            //         ).catch((err) => {
            //             console.log(err);
            //         }
            //         );
            // } else {
            //     // If no Stripe Payment Intent Client Secret exists in the global state,
            //     // create a new payment intent.
            //     dispatch(createStripePaymentIntent(bookingData));
            // }
            dispatch(createStripePaymentIntent(bookingData));
        }
    }, [userClickedContinue, session, expertisePost]);


    const appearance = {
        theme: "stripe",
    };

    const options: any = {
        clientSecret: stripePaymentIntentClientSecret,
        appearance,
        loader: "always",
    };

    // Display errors if they appear during creation of
    // Stripe Payment intent
    useEffect(() => {
        if (stripePaymentIntentError) {
            toast.error(stripePaymentIntentError);
            dispatch(clearStripePaymentIntentErrors());
        }
    }, [stripePaymentIntentClientSecret, stripePaymentIntentError]);

    // Check if user is logged in and is the owner of this post.
    // They shouldn't be able to Send a Submission if so, of course.
    if (session?.user?._id === expertisePost?.user?._id) {
        Router.push("/");
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <OldPageHeader
                pageName="Book a Single Text Response"
                heroPhrase="For those bite-sized, important questions."
                supportingText="Simply write your text submission then enter payment."
            />
            {!session ? (
                <Loader />
            ) : (
                <>
                    <div
                        className={classNames(
                            userClickedContinue ? "opacity-30" : "opacity-100",
                            "flex flex-col p-8 gap-6 bg-white w-full sm:w-[32rem] h-[32rem] shadow border border-black/10 rounded-xl"
                        )}
                    >
                        {/* Header for Text Input */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center w-16 h-16 rounded-full bg-black/10">
                                <PencilAltIcon className="w-3/5 m-auto" />
                            </div>
                            <div className="w-3/4">
                                <h1 className="text-2xl font-semibold w-fit">
                                    Write a message
                                </h1>
                                <p className="font-light opacity-60 text-sm mt-1 w-fit">
                                    The expert will read the message and reply
                                    back within a week.
                                </p>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-black/10"></div>
                        {/* Text Input Field */}
                        <textarea
                            id="textMessage"
                            name="textMessage"
                            autoComplete="none"
                            required
                            // maxLength={maxDescriptionLength}
                            className="block px-3 py-2 h-full w-8/9 rounded-md placeholder-gray-400 resize-none focus:ring-0 border-transparent focus:border-transparent sm:text-md"
                            placeholder="Hi! I was wondering if you could give me advice about..."
                            value={
                                userClickedContinue
                                    ? finalTextSubmission
                                    : textSubmission
                            }
                            onChange={(e) => setTextSubmission(e.target.value)}
                        />
                        <Link href="#">
                            <button
                                className={classNames(
                                    textSubmission.length < 20
                                        ? "opacity-40"
                                        : "opacity-100",
                                    `rounded-xl bg-black text-white p-3 font-semibold text-md md:text-lg`
                                )}
                                onClick={handleContinueClick}
                                disabled={
                                    textSubmission.length < 20 ? true : false
                                }
                            >
                                {textSubmission.length < 20
                                    ? "Type a question first!"
                                    : "Continue"}
                            </button>
                        </Link>
                    </div>
                    {userClickedContinue ? (
                        <div id="paymentSection" className="transition-all">
                            <div className="flex flex-col ">
                                <p className="text-xs font-light px-4 m-auto">
                                    {" "}
                                    Want to edit your response? Simply copy it,
                                    reload the page, and paste it back in.
                                </p>
                            </div>

                            <div className="flex flex-col items-center p-8 mt-4 gap-6 bg-white w-full sm:w-[32rem] h-fit border border-black/10 shadow rounded-xl">
                                <img
                                    className=" h-16 w-16 rounded-full"
                                    src={expertisePost.user.avatar.url}
                                    alt={`User Profile Pic for ${expertisePost.user.name}`}
                                />
                                <h1 className="text-2xl font-semibold w-fit text-center ">
                                    Personalized Expert Advice: Text Response
                                </h1>
                                <div className="w-full h-[1px] bg-black/10"></div>

                                {/* Pricing Summary */}
                                <div className="flex flex-col gap-3 w-full">
                                    <h1 className="text-xl font-semibold w-fit self-start">
                                        Summary
                                    </h1>
                                    <div className="flex justify-between w-full">
                                        <h1 className="text-lg font-semibold w-fit self-start opacity-40">
                                            Text Response
                                        </h1>
                                        <h1 className="text-lg font-semibold w-fit self-start opacity-40">
                                            ${pricePerSubmission}
                                        </h1>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <h1 className="text-lg font-semibold w-fit self-start opacity-40">
                                            Service Fee{" "}
                                            <span className="text-base">
                                                (2.9% + 0.3)
                                            </span>
                                        </h1>
                                        <h1 className="text-lg font-semibold w-fit self-start opacity-40">
                                            ${serviceFee}
                                        </h1>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <h1 className="text-xl font-semibold w-fit self-start">
                                            Total Due
                                        </h1>
                                        <h1 className="text-xl font-semibold w-fit self-start">
                                            ${total}
                                        </h1>
                                    </div>
                                </div>
                                <div className="w-full h-[1px] bg-black/10"></div>

                                {/* Stripe Payment Element */}
                                {loading ? (
                                    <Loader />
                                ) : (
                                    stripePaymentIntentClientSecret && (
                                        // REINSTANTIATE STRIPE ELEMENTS PROVIDER, as for payment intent, we require
                                        // an options that contains the stripePaymentIntentClientSecret for the current
                                        // payment intent.
                                        <Elements
                                            options={options}
                                            stripe={stripePromise}
                                        >
                                            <CheckoutForm />
                                        </Elements>
                                    )
                                )}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </>
            )}
        </div>
    );
};

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default BookSingleTextResponse;
