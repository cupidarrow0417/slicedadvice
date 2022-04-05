import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    CLEAR_ERRORS
} from '../constants/userConstants'



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
                loading: true
            }
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case REGISTER_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}