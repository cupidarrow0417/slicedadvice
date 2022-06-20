import {
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    POST_REVIEWS_SUCCESS,
    POST_REVIEWS_FAIL,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    CLEAR_ERRORS
} from "../constants/reviewConstants";

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
export const createReviewReducer = (state = {}, action: any) => {
    switch (action.type) {
        case CREATE_REVIEW_REQUEST:
            return {
                loading: true,
            };
        case CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true,
                reviewId: action.payload.reviewId,
            };
        case CREATE_REVIEW_FAIL:
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
 export const getPostReviewsReducer = (
    state = { reviews: [] },
    action: any
) => {
    switch (action.type) {
        case POST_REVIEWS_SUCCESS:
            return {
                // reviewsCount: action.payload.reviewsCount,
                // resPerPage: action.payload.resPerPage,
                // filteredAllReviewsCount:
                //     action.payload.filteredReviewsCount,
                reviews: action.payload,
            };
        case POST_REVIEWS_FAIL:
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

/**
 * It returns a new state object with the properties of the old state object and the new properties of
 * the action object
 * @param state - This is the initial state of the reducer.
 * @param {any} action - any
 * @returns The state is being returned.
 */
export const allReviewsReducer = (
    state = { reviews: [] },
    action: any
) => {
    switch (action.type) {
        case ALL_REVIEWS_SUCCESS:
            return {
                allReviewsCount: action.payload.reviewsCount,
                resPerPage: action.payload.resPerPage,
                filteredAllReviewsCount:
                    action.payload.filteredReviewsCount,
                allReviews: action.payload.reviews,
            };
        case ALL_REVIEWS_FAIL:
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
