import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_RESET,
    UPDATE_USER_PROFILE_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants";

/**
 * The authReducer function takes in the state of the auth reducer and an action.
 * It then checks the type of the action and returns the state with the appropriate changes
 * @param state - The state of the reducer.
 * @param {any} action - any
 * @returns The state of the reducer.
 */
export const authReducer = (state = { user: null }, action: any) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                loading: true,
            };
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case REGISTER_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
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
 * This function is responsible for handling the state of the user profile
 * @param state - The current state of the reducer.
 * @param {any} action - any
 * @returns The reducer is returning a new state object.
 */
export const userReducer = (state = {}, action: any) => {
    switch (action.type) {
        case UPDATE_USER_PROFILE_REQUEST:
            return {
                loading: true,
            };

        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                loading: false,
                isUpdated: true,
                user: action.payload,
            };
        case UPDATE_USER_PROFILE_RESET:
            return {
                loading: false,
                isUpdated: false,
            };

        case UPDATE_USER_PROFILE_FAIL:
            return {
                loading: false,
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
 * This function is used to handle the state of the forgot password form.
 * @param state - The state of the reducer.
 * @param {any} action - any
 * @returns The state of the reducer.
 */
export const forgotPasswordReducer = (state = {}, action: any) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                loading: true,
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                loading: false,
                message: action.payload,
            };

        case FORGOT_PASSWORD_FAIL:
            return {
                loading: false,
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
 * This function handles the state of the reset password form.
 * @param state - This is the initial state of the reducer.
 * @param {any} action - any - This is the action that is dispatched from the component.
 * @returns The reducer is returning the state of the application.
 */
export const resetPasswordReducer = (state = {}, action: any) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                loading: true,
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            };

        case RESET_PASSWORD_FAIL:
            return {
                loading: false,
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
