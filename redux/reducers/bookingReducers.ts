import {
    CREATE_STRIPE_PAYMENT_INTENT_REQUEST,
    CREATE_STRIPE_PAYMENT_INTENT_SUCCESS,
    CREATE_STRIPE_PAYMENT_INTENT_FAIL,
    CLEAR_STRIPE_PAYMENT_INTENT_ERRORS,
    CACHE_BOOKING_DATA,
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAIL,
    GET_BOOKINGS_SUCCESS,
    GET_BOOKINGS_FAIL,
    UPDATE_BOOKING_REQUEST,
    UPDATE_BOOKING_SUCCESS,
    UPDATE_BOOKING_FAIL,
    CLEAR_BOOKINGS_SUCCESS,
    CLEAR_BOOKINGS_ERRORS,
} from "../constants/bookingConstants";

// MAIN BOOKING REDUCER HERE. HOLDS WHATEVER BOOKINGS WE RETRIEVED FROM THE SERVER, IN THE GLOBAL STATE,
// AND CHANGES WHENEVER WE MAKE CRUD CHANGES TO THE BOOKINGS.

// Initial State for allBookings global state
// Structure of all initial state for all slices of global state:
// Data, metadata, cache.
let initialState = {
    bookings: [],
    metadata: {
        loading: false,
        success: null,
        error: null,
        bookingsCount: 0,
        resPerPage: 0,
        filteredBookingsCount: 0,
    },
    cache: {},
};
/**
 *
 * @param state - This is the initial state of the reducer.
 * @param {any} action - any
 * @returns The state is being returned.
 */
export const bookingsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        // TYPE: GET BOOKINGS
        case GET_BOOKINGS_SUCCESS:
            return {
                ...state,
                bookings: action.payload.bookings,
                metadata: {
                    ...state.metadata,
                    loading: false,
                    error: null,
                    bookingsCount: action.payload.bookingsCount,
                    resPerPage: action.payload.resPerPage,
                    filteredBookingsCount:
                        action.payload.filteredBookingsCount,
                },
            };
        case GET_BOOKINGS_FAIL:
            return {
                ...state,
                bookings: [],
                metadata: {
                    ...state.metadata,
                    loading: false,
                    error: action.payload,
                },
            };

        // TYPE: UPDATE BOOKING
        case UPDATE_BOOKING_REQUEST:
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    loading: true,
                    error: null,
                },
            };
        case UPDATE_BOOKING_SUCCESS:
            return {
                ...state,
                bookings: state.bookings.map((booking: any) =>
                    booking._id === action.payload.booking._id        
                        ? { ...booking, ...action.payload.booking } 
                        : booking
                ),
                metadata: {
                    ...state.metadata,
                    loading: false,
                    success: "Booking updated successfully!",
                    error: null,
                },
            };
        case UPDATE_BOOKING_FAIL:
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    loading: false,
                    error: action.payload,
                },
            };
        // TYPE: CREATE BOOKING
        case CREATE_BOOKING_REQUEST:
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    loading: true,
                    error: null,
                },
            };
        case CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                bookings: [...state.bookings, action.payload.booking],
                metadata: {
                    ...state.metadata,
                    loading: false,
                    error: null,
                },
            };
        case CREATE_BOOKING_FAIL:
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    loading: false,
                    error: action.payload,
                },
            };
        
        // TYPE: CLEAR BOOKINGS SUCCESS
        case CLEAR_BOOKINGS_SUCCESS:
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    success: null,
                },
            };
        // TYPE: CLEAR BOOKINGS ERRORS
        case CLEAR_BOOKINGS_ERRORS:
            return {
                ...state,
                metadata: {
                    error: null,
                },
            };
        default:
            return state;
    }
};

// ALL MONITORING AND MISC. REDUCERS BELOW. ONLY FOR MONITORING PROGRESS OF API CALLS, STORING
// RANDOM RELATED DATA, etc.

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
        case CLEAR_STRIPE_PAYMENT_INTENT_ERRORS:
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

