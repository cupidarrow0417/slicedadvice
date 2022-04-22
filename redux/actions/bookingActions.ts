import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
    CREATE_STRIPE_PAYMENT_INTENT_REQUEST,
    CREATE_STRIPE_PAYMENT_INTENT_SUCCESS,
    CREATE_STRIPE_PAYMENT_INTENT_FAIL,
    CLEAR_ERRORS,
} from "../constants/bookingConstants";



interface OrderDataInterface {
    price: number;
}

/**
 * This takes in an orderData object, and then makes a post request to the backend to create a payment
 * intent
 * @param {OrderDataInterface} orderData - OrderDataInterface
 */
export const createStripePaymentIntent =
    (orderData: OrderDataInterface) => async (dispatch: any) => {
        try {
            dispatch({
                type: CREATE_STRIPE_PAYMENT_INTENT_REQUEST
            })

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const { data } = await axios.post(`/api/stripe/paymentIntent/`, orderData, config);

            dispatch({
                type: CREATE_STRIPE_PAYMENT_INTENT_SUCCESS,
                payload: data
            })
        } catch (error: any) {
            dispatch({
                type: CREATE_STRIPE_PAYMENT_INTENT_FAIL,
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
