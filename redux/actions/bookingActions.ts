import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
    CREATE_STRIPE_PAYMENT_INTENT_REQUEST,
    CREATE_STRIPE_PAYMENT_INTENT_SUCCESS,
    CREATE_STRIPE_PAYMENT_INTENT_FAIL,
    CLEAR_ERRORS,
    CACHE_BOOKING_DATA,
} from "../constants/bookingConstants";

// const orderData = {
//     price: total,
//     bookingType: "Single Text Response",
//     expertisePostId: expertisePost?._id,
//     customerId: user?._id,
//     status: "Pending Acceptance",
//     customerSubmission: finalTextSubmission,
// };
interface BookingDataInterface {
    price: number;
    bookingType: String;
    expertisePostId: String;
    customerId: String;
    status: String;
    customerSubmission: String;
}

/**
 * This takes in an orderData object, and then makes a post request to the backend to create a payment
 * intent
 * @param {BookingDataInterface} orderData - OrderDataInterface
 */
export const createStripePaymentIntent =
    (bookingData: BookingDataInterface) => async (dispatch: any) => {
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
  * @param {BookingDataInterface} bookingData - BookingDataInterface
  */
 export const cacheBookingData =
 (bookingData: BookingDataInterface) => (dispatch: any) => {
     dispatch({
         type: CACHE_BOOKING_DATA,
         payload: bookingData,
     })
 }


/**
 * This function is used to clear the errors from the state
 */
export const clearErrors = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
