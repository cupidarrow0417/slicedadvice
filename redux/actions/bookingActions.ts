import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
    CREATE_STRIPE_PAYMENT_INTENT_REQUEST,
    CREATE_STRIPE_PAYMENT_INTENT_SUCCESS,
    CREATE_STRIPE_PAYMENT_INTENT_FAIL,
    CLEAR_ERRORS,
    CACHE_BOOKING_DATA,
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAIL,
} from "../constants/bookingConstants";

interface CacheBookingDataInterface {
    price: number;
    pricePerSubmission: number;
    serviceFee: number;
    bookingType: String;
    expertisePostId: String;
    customerId: String;
    status: String;
    customerSubmission: String;
    bookingCreated: boolean;
}

interface SubmittedBookingDataInterface {
    bookingType: String;
    expertisePostId: String;
    customerId: String;
    status: String;
    customerSubmission: String;
    stripePaymentIntentId: String;
}

/**
 * Creates a stripe payment intent, used on the checkout page for a booking.
 * It sends a POST request to the server to create a Stripe PaymentIntent, and then dispatches a
 * success or fail action depending on the response
 * @param {CacheBookingDataInterface} bookingData - CacheBookingDataInterface
 */
export const createStripePaymentIntent =
    (bookingData: CacheBookingDataInterface) => async (dispatch: any) => {
        try {
            dispatch({
                type: CREATE_STRIPE_PAYMENT_INTENT_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/api/stripe/paymentIntent/`,
                bookingData,
                config
            );

            dispatch({
                type: CREATE_STRIPE_PAYMENT_INTENT_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: CREATE_STRIPE_PAYMENT_INTENT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

/**
 * It takes a bookingData object as an argument, and returns a function that takes a dispatch function
 * as an argument, and dispatches an action with the type CACHE_BOOKING_DATA and the bookingData
 * object as the payload
 * @param {CacheBookingDataInterface} bookingData - CacheBookingDataInterface
 */
export const cacheBookingData =
    (bookingData: CacheBookingDataInterface) => (dispatch: any) => {
        dispatch({
            type: CACHE_BOOKING_DATA,
            payload: bookingData,
        });
    };

export const createBooking =
    (bookingData: SubmittedBookingDataInterface) => async (dispatch: any) => {
        try {
            dispatch({
                type: CREATE_BOOKING_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/api/bookings`,
                bookingData,
                config
            );

            dispatch({
                type: CREATE_BOOKING_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: CREATE_BOOKING_FAIL,
                payload: error.response.data.message,
            });
        }
    };

/**
 * This function is used to clear the errors from the state
 */
export const clearErrors = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
