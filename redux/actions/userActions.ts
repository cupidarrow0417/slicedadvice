import axios from "axios";
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants";

export const registerUser = (userData: any) => async (dispatch: any) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            `/api/auth/register`,
            userData,
            config
        );

        dispatch({
            type: REGISTER_USER_SUCCESS,
        });
    } catch (error: any) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Load user
export const loadUser = () => async (dispatch: any) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/me`);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });
    } catch (error: any) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateUserProfile = (userData: any) => async (dispatch: any) => {
    try {
        dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/me/update`, userData, config);

        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload: data.user,
        });

        //Import for the Settings.tsx component, as after pressing save,
        //we don't want the user state in the authReducer to overwrite
        //the user in the userReducer. So also update the user state in
        //the userReducer side as well.
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });
    } catch (error: any) {
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};


//Forgot Password Action
export const forgotPassword = (email: any) => async (dispatch: any) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`/api/password/forgot`, email, config);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        });

    } catch (error: any) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};


//Reset Password Action
export const resetPassword = (password: any, token: any) => async (dispatch: any) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/password/reset/${token}`, password, config);

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        });

    } catch (error: any) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
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
