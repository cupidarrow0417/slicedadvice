import {
    CREATE_STRIPE_PAYMENT_INTENT_REQUEST,
    CREATE_STRIPE_PAYMENT_INTENT_SUCCESS,
    CREATE_STRIPE_PAYMENT_INTENT_FAIL,
    CACHE_BOOKING_DATA,
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAIL,
    ALL_BOOKINGS_SUCCESS,
    ALL_BOOKINGS_FAIL,
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
export const createStripePaymentIntentReducer = (state = {}, action: any) => {
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
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

/**
 * It takes in a state object and an action object, and returns a new state object
 * @param state - This is the current state of the reducer.
 * @param {any} action - any - this is the action that is being dispatched.
 * @returns The state is being returned.
 */
export const cacheBookingDataReducer = (state = {}, action: any) => {
    switch (action.type) {
        case CACHE_BOOKING_DATA:
            return {
                ...state,
                bookingData: action.payload,
            };
        default:
            return state;
    }
};

/**
 * It returns an object with a loading property set to true if the action type is
 * CREATE_BOOKING_REQUEST, an object with a loading property set to false, a success property set to
 * true, and a bookingId property set to the bookingId in the payload if the action type is
 * CREATE_BOOKING_SUCCESS, and an object with a loading property set to false, a success property set
 * to false, and an error property set to the error in the payload if the action type is
 * CREATE_BOOKING_FAIL
 * @param state - This is the initial state of the reducer.
 * @param {any} action - any - This is the action that is dispatched from the component.
 * @returns The reducer is returning an object with the following properties:
 * loading: boolean
 * success: boolean
 * bookingId: string
 * error: string
 */
export const createBookingReducer = (state = {}, action: any) => {
    switch (action.type) {
        case CREATE_BOOKING_REQUEST:
            return {
                loading: true,
            };
        case CREATE_BOOKING_SUCCESS:
            return {
                loading: false,
                success: true,
                bookingId: action.payload.bookingId,
            };
        case CREATE_BOOKING_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

/**
 * It returns a new state object with the properties of the old state object and the new properties of
 * the action object
 * @param state - This is the initial state of the reducer.
 * @param {any} action - any
 * @returns The state is being returned.
 */
export const allBookingsReducer = (
    state = { bookings: [] },
    action: any
) => {
    switch (action.type) {
        case ALL_BOOKINGS_SUCCESS:
            return {
                allBookingsCount: action.payload.bookingsCount,
                resPerPage: action.payload.resPerPage,
                filteredAllBookingsCount:
                    action.payload.filteredBookingsCount,
                allBookings: action.payload.bookings,
            };
        case ALL_BOOKINGS_FAIL:
            return {
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
