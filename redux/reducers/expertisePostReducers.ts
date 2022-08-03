import {
    EXPERTISE_POST_DETAIL_SUCCESS,
    EXPERTISE_POST_DETAIL_FAIL,
    CREATE_EXPERTISE_POST_REQUEST,
    CREATE_EXPERTISE_POST_SUCCESS,
    CREATE_EXPERTISE_POST_FAIL,
    UPDATE_EXPERTISE_POST_REQUEST,
    UPDATE_EXPERTISE_POST_SUCCESS,
    UPDATE_EXPERTISE_POST_FAIL,
    CLEAR_ERRORS,
} from "../constants/expertisePostConstants";


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


/**
 * It returns an object with a loading property set to true if the action type is
 * CREATE_EXPERTISE_POST_REQUEST, an object with a loading property set to false and a success property
 * set to true if the action type is CREATE_EXPERTISE_POST_SUCCESS, an object with a loading property
 * set to false and a success property set to false if the action type is CREATE_EXPERTISE_POST_FAIL,
 * and the state if the action type is CLEAR_ERRORS
 * @param state - The current state of the reducer.
 * @param {any} action - any
 * @returns The reducer is returning the state of the application.
 */
export const createExpertisePostReducer = (
    state = { },
    action: any
) => {
    switch (action.type) {
        case CREATE_EXPERTISE_POST_REQUEST:
            return {
                loading: true,
            };
        case CREATE_EXPERTISE_POST_SUCCESS:
            return {
                loading: false,
                success: true,
                expertisePostId: action.payload.expertisePostId,
            };
        case CREATE_EXPERTISE_POST_FAIL:
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

// Update Reducer
export const updateExpertisePostReducer = (
    state = { },
    action: any
) => {
    switch (action.type) {
        case UPDATE_EXPERTISE_POST_REQUEST:
            return {
                loading: true,
            };
        case UPDATE_EXPERTISE_POST_SUCCESS:
            return {
                loading: false,
                success: true,
                expertisePostId: action.payload.updatedExpertisePostId,
            };
        case UPDATE_EXPERTISE_POST_FAIL:
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