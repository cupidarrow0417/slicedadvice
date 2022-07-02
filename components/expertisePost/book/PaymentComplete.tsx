import { useStripe } from "@stripe/react-stripe-js";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { cacheBookingData, clearBookingsErrors, createBooking } from "../../../redux/actionCreators/bookingActionCreators";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../layout/Loader";

const PaymentComplete = () => {
    const dispatch = useAppDispatch();
    const stripe = useStripe();
    const { query: queryParams } = useRouter();
    const [paymentIntentId, setPaymentIntentId] = useState("");
    const urlPaymentIntentId = queryParams.payment_intent;
    const [totalCents, setTotalCents] = useState(0);
    const [loading, setLoading] = useState(true);
    const paymentIntentClientSecret =
        queryParams.payment_intent_client_secret!.toString();
    const { bookingData } = useAppSelector((state) => state.cacheBookingData);
    const {
        error: errorCreateBooking,
    } = useAppSelector((state) => state.bookings);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        if (!paymentIntentClientSecret) {
            return;
        }

        stripe
            .retrievePaymentIntent(paymentIntentClientSecret)
            .then(({ paymentIntent }) => {
                // Set info about the payment that just occurred successfully, to display
                // a summary to the customer. Also just an extra way for a developer to know
                // that the cached booking data matches the actual payment intent. Technically
                // not neccessary.
                console.log("PAYMENT INTENT", paymentIntent);
                setTotalCents(paymentIntent?.amount!);
                setPaymentIntentId(paymentIntent?.id || "");
                setLoading(false);
            });
    }, [stripe, paymentIntentClientSecret]);

    // Retrieve the cached booking data (if it exists) and create a booking model
    // only if the boolean bookingCreated is false.
    useEffect(() => {
        if (bookingData && bookingData.bookingCreated === false && paymentIntentId !== "") {
            // Set once and for all, bookingCreated to be true.
            // This means that a booking will be created only once
            // from this cacheBookingData.
            const updatedBookingData = {
                ...bookingData,
                // Important part.
                bookingCreated: true,
            }
            // Dispatch again to update the cacheBookingData's bookingCreated field.
            // In order to never create a booking twice.
            dispatch(cacheBookingData(updatedBookingData))

            // dispatch the creation of a new booking model.
            const finalBookingData = {
                bookingType: bookingData.bookingType,
                expertisePostId: bookingData.expertisePostId,
                expertId: bookingData.expertId,
                customerId: bookingData.customerId,
                status: bookingData.status,
                customerSubmission: bookingData.customerSubmission,
                stripePaymentIntentId: paymentIntentId,
                expertStripeId: bookingData.expertisePost?.user?.stripeId,
            };
            dispatch(createBooking(finalBookingData));
        }
    }, [bookingData, paymentIntentId]);

    // Developer tool: To listen to createBooking process
    // Actually, don't think the user would get here if there
    // was a Stripe issue, so the booking wouldn't have gotten here.
    // But, just in case.
    useEffect(() => {
        if (errorCreateBooking) {
            toast.error(errorCreateBooking)
            dispatch(clearBookingsErrors);
        } 
    }, [errorCreateBooking]);
    return (
        <main className="relative lg:min-h-full">
            <div className="h-80 overflow-hidden lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-12">
                <img
                    src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-hero.jpg"
                    alt="TODO"
                    className="h-full w-full object-center object-cover"
                />
            </div>

            <div>
                <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-32 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
                    <div className="lg:col-start-2 flex flex-col gap-2">
                        <h1 className="text-sm font-medium text-brand-primary-light">
                            Payment intent successful
                        </h1>
                        <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            Thanks for booking!
                        </p>
                        <p className="mt-2 text-base text-gray-500">
                            You haven't been charged yet, but a hold has been
                            put on your card. Your expert will be help you
                            within 7 days, or you'll never be charged. To manage
                            bookings, view responses, and more, check the{" "}
                            <Link href="/dashboard/adviceSeeker/home">
                                <a className="text-brand-primary-light">
                                    dashboard for advice seekers.
                                </a>
                            </Link>
                        </p>
                        {/* <dl className="mt-16 text-sm font-medium">
                            <dt className="text-gray-900">Tracking number</dt>
                            <dd className="mt-2 text-brand-primary-light">
                                51547878755545848512
                            </dd>
                        </dl> */}
                        {loading ? (
                            <dl className="flex justify-center items-center text-sm font-medium text-gray-500 space-y-6 border-t border-gray-200 pt-6 mt-4">
                                <Loader />
                            </dl>
                        ) : (
                            <dl className="text-sm font-medium text-gray-500 space-y-6 border-gray-200 pt-6 mt-4">
                                <div className="flex justify-between">
                                    <dt>Subtotal</dt>
                                    <dd className="text-gray-900">
                                        ${bookingData.pricePerSubmission}
                                    </dd>
                                </div>

                                <div className="flex justify-between">
                                    <dt>Service fee (0.29% + 0.3)</dt>
                                    <dd className="text-gray-900">
                                        ${bookingData.serviceFee}
                                    </dd>
                                </div>

                                {/* <div className="flex justify-between">
                                <dt>Taxes</dt>
                                <dd className="text-gray-900">$6.40</dd>
                            </div> */}

                                <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                                    <dt className="text-base">Total</dt>
                                    <dd className="text-base">
                                        ${(totalCents / 100).toFixed(2)}
                                    </dd>
                                </div>
                            </dl>
                        )}
                        {/* <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                            <div>
                                <dt className="font-medium text-gray-900">
                                    Shipping Address
                                </dt>
                                <dd className="mt-2">
                                    <address className="not-italic">
                                        <span className="block">
                                            Kristin Watson
                                        </span>
                                        <span className="block">
                                            7363 Cynthia Pass
                                        </span>
                                        <span className="block">
                                            Toronto, ON N3Y 4H8
                                        </span>
                                    </address>
                                </dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-900">
                                    Payment Information
                                </dt>
                                <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                                    <div className="flex-none">
                                        <svg
                                            aria-hidden="true"
                                            width={36}
                                            height={24}
                                            viewBox="0 0 36 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-auto"
                                        >
                                            <rect
                                                width={36}
                                                height={24}
                                                rx={4}
                                                fill="#224DBA"
                                            />
                                            <path
                                                d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                                                fill="#fff"
                                            />
                                        </svg>
                                        <p className="sr-only">Visa</p>
                                    </div>
                                    <div className="flex-auto">
                                        <p className="text-gray-900">
                                            Ending with 4242
                                        </p>
                                        <p>Expires 12 / 21</p>
                                    </div>
                                </dd>
                            </div>
                        </dl> */}
                        <div className="mt-4 border-t border-gray-200 py-6 text-right">
                            <Link href="/categories">
                                <a className="text-sm font-medium text-brand-primary-light hover:text-brand-primary-light/90">
                                    Continue Browsing
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PaymentComplete;
