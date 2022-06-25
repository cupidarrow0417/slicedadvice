import {
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    CLEAR_REVIEW_SUCCESS_MESSAGE,
    CLEAR_REVIEW_ERRORS,
} from "../constants/reviewConstants";

let initialState = {
    reviews: [],
    metadata: {
        loading: false,
        successMessage: null,
        error: null,
        // reviewsCount: 0,
        // resPerPage: 0,
        // filteredReviewCount: 0,
    },
    cache: {},
}

export const reviewReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_REVIEWS_SUCCESS:
            return {
                ...state,
                reviews: action.payload,
                metadata: {
                    ...state.metadata,
                    loading: false,
                    error: null,
                    // reviewsCount: action.payload.reviewsCount,
                    // resPerPage: action.payload.resPerPage,
                    // filteredReviewCount: action.payload.filteredReviewCount,
                },
            };
        case GET_REVIEWS_FAIL:
        return {
            ...state,
            reviews: [],
            metadata: {
                ...state.metadata,
                loading: false,
                error: action.payload,
            },
        };

        case CREATE_REVIEW_REQUEST:
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    loading: true,
                    error: null,
                },
            };
        case CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                reviews: [...state.reviews, action.payload.review],
                metadata: {
                    ...state.metadata,
                    loading: false,
                    successMessage: "Review created successfully",
                    error: null,
                    // reviewsCount: state.metadata.reviewsCount + 1
                },
            };
        case CREATE_REVIEW_FAIL:
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    loading: false,
                    successMessage: null,
                    error: action.payload,
                },
            };

        // TYPE: CLEAR BOOKINGS SUCCESS
        case CLEAR_REVIEW_SUCCESS_MESSAGE:
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    success: null,
                },
            };
        // TYPE: CLEAR BOOKINGS ERRORS
        case CLEAR_REVIEW_ERRORS:
            return {
                ...state,
                metadata: {
                    error: null,
                },
            };
        default:
            return state;
    }
}
