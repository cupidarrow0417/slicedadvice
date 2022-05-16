import {
    CREATE_STRIPE_PAYMENT_INTENT_REQUEST,
    CREATE_STRIPE_PAYMENT_INTENT_SUCCESS,
    CREATE_STRIPE_PAYMENT_INTENT_FAIL,
    CACHE_BOOKING_DATA,
    CLEAR_ERRORS,
} from "../constants/bookingConstants";


 /**
  * It returns an object with a loading property set to true if the action type is
  * CREATE_STRIPE_PAYMENT_INTENT_REQUEST, an object with a loading property set to false and a success
  * property set to true if the action type is CREATE_STRIPE_PAYMENT_INTENT_SUCCESS, and an object with
  * a loading property set to false and an error property set to the error message if the action type
  * is CREATE_STRIPE_PAYMENT_INTENT_FAIL
  * @param state - The current state of the reducer.
  * @param {any} action - any
  * @returns - The state is being returned with the loading, success, clientSecret, and error
  * properties.
  *     - The loading property is set to true when the CREATE_STRIPE_PAYMENT_INTENT_REQUEST action is
  * dispatched.
  *     - The success property is set to true when the CREATE_STRIPE_PAYMENT_INTENT_REQUEST
  */
 export const createStripePaymentIntentReducer = (
    state = { },
    action: any
) => {
    switch (action.type) {
        case CREATE_STRIPE_PAYMENT_INTENT_REQUEST:
            return {
                loading: true,
            };
        case CREATE_STRIPE_PAYMENT_INTENT_SUCCESS:
            return {
                loading: false,
                success: true,
                clientSecret: action.payload.clientSecret,
            };
        case CREATE_STRIPE_PAYMENT_INTENT_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};


export const cacheBookingDataReducer = (
    state = { },
    action: any
) => {
    switch (action.type) {
        case CACHE_BOOKING_DATA:
            return {
                ...state,
                bookingData: action.payload
            };
        default:
            return state;
    }
};

