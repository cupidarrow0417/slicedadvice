import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useAppSelector } from "../../../redux/hooks";
import { toast } from "react-toastify";
import ButtonLoader from "../../layout/ButtonLoader";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);

    const {
        clientSecret,
        loading: createStripePaymentIntentLoading,
        success: createStripePaymentIntentSuccess,
        error: createStripePaymentIntentError,
    } = useAppSelector((state) => state.createStripePaymentIntent);

    
    useEffect(() => {
        if (!stripe) {
            return;
        }

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                // Inspect the PaymentIntent `status` to indicate the status of the payment
                // to your customer.
                //
                // Some payment methods will [immediately succeed or fail][0] upon
                // confirmation, while others will first enter a `processing` state.
                //
                // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
                case "succeeded":
                    toast.success("Payment succeeded!");
                    break;
                case "processing":
                    toast.info("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    // toast.error(
                    //     "Please enter your payment method and information."
                    // );
                    break;
                default:
                    toast.error("Something went wrong.");
                    break;
            }
        });
    }, [stripe, clientSecret]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);
        

        
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000/expertisePost/book/paymentComplete",
            },
        })

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            toast.error(error.message);
        } else {
            toast.error("An unexpected error occured.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element"/>
            <button
                disabled={isLoading || !stripe || !elements}
                className="rounded-xl bg-brand-primary-light mt-4  w-full text-white p-3 font-semibold text-md md:text-lg"
            >
                <span id="button-text" className="flex justify-center">
                    {isLoading ? <ButtonLoader /> : "Pay now"}
                </span>
            </button>
        </form>
    );
}
