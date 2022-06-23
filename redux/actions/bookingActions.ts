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
    ALL_BOOKINGS_SUCCESS,
    ALL_BOOKINGS_FAIL,
    UPDATE_BOOKING_REQUEST,
    UPDATE_BOOKING_SUCCESS,
    UPDATE_BOOKING_FAIL,
} from "../constants/bookingConstants";

interface CacheBookingDataInterface {
    price: number;
    pricePerSubmission: number;
    serviceFee: number;
    bookingType: String;
    expertisePostId: String;
    expertId: String;
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
    singleTextResponse?: {
        customerSubmission: String;
        expertResponse: String;
    }
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
 * It's a function that takes in a request object and a current page number, and returns a function
 * that takes in a dispatch function, and dispatches an action to the reducer
 * @param {any} [req=null] - any = null, currentPage: Number = 1
 * @param {Number} [currentPage=1] - Number = 1
 */
export const getBookings =
    (
        req: any,
        currentPage: Number = 1,
        title?: String,
        customer?: String,
        expert?: String
    ) =>
    async (dispatch: any) => {
        try {
            const { origin } = absoluteUrl(req);
            let link = `${origin}/api/bookings?page=${currentPage}`;
            if (title) link = link.concat(`&title=${title}`);
            if (customer) link = link.concat(`&customer=${customer}`);
            if (expert) link = link.concat(`&expert=${expert}`);

            // NOTE: having the config for axios is important.
            // https://stackoverflow.com/a/69058105/16435056
            // Requests originating from getServerSideProps, when passed
            // into Axios, will be STRIPPED of the cookie headers.
            // Without cookie headers, authentication using getSession is impossible.
            const { data } = await axios.get(link, {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie,
                },
            });

            dispatch({
                type: ALL_BOOKINGS_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: ALL_BOOKINGS_FAIL,
                payload: error.response.data.message,
            });
        }
    };

/**
 * It takes a bookingId and bookingData as arguments, and dispatches an action to update the booking
 * with the given bookingId with the given bookingData
 * @param {String} bookingId - The id of the booking to be updated.
 * @param {any} bookingData - This is the data that we want to update.
 */
export const updateBooking =
    (bookingId: String, bookingData: any) =>
    async (dispatch: any) => {
        try {
            dispatch({
                type: UPDATE_BOOKING_REQUEST,
            });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.put(
                `/api/bookings/${bookingId}`,
                bookingData,
                config
            );

            dispatch({
                type: UPDATE_BOOKING_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: UPDATE_BOOKING_FAIL,
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
