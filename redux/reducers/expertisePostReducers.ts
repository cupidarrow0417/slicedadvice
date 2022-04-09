import {
    ALL_EXPERTISE_POSTS_SUCCESS,
    ALL_EXPERTISE_POSTS_FAIL,
    EXPERTISE_POST_DETAIL_SUCCESS,
    EXPERTISE_POST_DETAIL_FAIL,
    CLEAR_ERRORS,
} from "../constants/expertisePostConstants";

/**
 * This function is responsible for handling the state of the allExpertisePosts reducer
 * @param state - The state of the reducer.
 * @param {any} action - any
 * @returns The state of the reducer.
 */
export const allExpertisePostsReducer = (
    state = { expertisePosts: [] },
    action: any
) => {
    switch (action.type) {
        case ALL_EXPERTISE_POSTS_SUCCESS:
            return {
                expertisePostsCount: action.payload.expertisePostsCount,
                resPerPage: action.payload.resPerPage,
                filteredExpertisePostsCount:
                    action.payload.filteredExpertisePostsCount,
                expertisePosts: action.payload.expertisePosts,
            };
        case ALL_EXPERTISE_POSTS_FAIL:
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
 * This function is responsible for handling the state of the expertise post details
 * @param state - The state of the reducer.
 * @param {any} action - any
 * @returns The reducer returns the state of the component.
 */
export const expertisePostDetailsReducer = (
    state = { expertisePost: [] },
    action: any
) => {
    switch (action.type) {
        case EXPERTISE_POST_DETAIL_SUCCESS:
            return {
                expertisePost: action.payload,
            };
        case EXPERTISE_POST_DETAIL_FAIL:
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
