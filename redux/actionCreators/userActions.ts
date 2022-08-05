import axios from "axios";
import absoluteUrl from "next-absolute-url";
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
    SETUP_PAYOUTS_LINK_REQUEST,
    SETUP_PAYOUTS_LINK_SUCCESS,
    SETUP_PAYOUTS_LINK_FAIL,
    CHECK_STRIPE_ACCOUNT_FIELD_REQUEST,
    CHECK_STRIPE_ACCOUNT_FIELD_SUCCESS,
    CHECK_STRIPE_ACCOUNT_FIELD_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants";

// Register the user by credentials (email and password)
// export const registerUser = (userData: any) => async (dispatch: any) => {
//     try {
//         dispatch({ type: REGISTER_USER_REQUEST });

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         };
//         const { data } = await axios.post(
//             `/api/auth/register`,
//             userData,
//             config
//         );

//         dispatch({
//             type: REGISTER_USER_SUCCESS,
//             payload: data,
//         });
//     } catch (error: any) {
//         dispatch({
//             type: REGISTER_USER_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };

//Load user
export const loadUser = (req: any, userId: any) => async (dispatch: any) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const { origin } = absoluteUrl(req);

        // STOPPED HERE. I THINK ADDING IN ORIGIN IS PROBABLY SUPER IMPORTANT?
        // NEED TO DO MORE THOUGH. SESSION ISN"T BEING FOUND FOR SOME REASON.
        const { data } = await axios.get(`${origin}/api/me/${userId}`);

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
        console.log("userData", userData);
        
        const { data } = await axios.put(`/api/me/update`, userData);

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
        const { data } = await axios.post(
            `/api/password/forgot`,
            email,
            config
        );

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        });
    } catch (error: any) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Reset Password Action
export const resetPassword =
    (password: any, token: any) => async (dispatch: any) => {
        try {
            dispatch({ type: RESET_PASSWORD_REQUEST });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.put(
                `/api/password/reset/${token}`,
                password,
                config
            );

            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// This action creates a Stripe Connect Express Account
// and returns an Onboarding Link for the user.
export const getStripeSetupPayoutsLink =
    (userData: { userId: string }) => async (dispatch: any) => {
        try {
            dispatch({
                type: SETUP_PAYOUTS_LINK_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                `/api/stripe/payouts/link`,
                userData,
                config
            );

            // Redirect Link to Connect Onboarding Successfully created
            // Return data as payload
            dispatch({
                type: SETUP_PAYOUTS_LINK_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: SETUP_PAYOUTS_LINK_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// This action checks and returns a specific inputted field on
// a user's Stripe Express Account.
export const checkStripeAccountField =
    (postData: { userId: string, field: string }) => async (dispatch: any) => {
        try {
            dispatch({
                type: CHECK_STRIPE_ACCOUNT_FIELD_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/api/stripe/check`,
                postData,
                config
            );

            // If no errors, dispatch success. This does NOT necessarily
            // mean that the requested field is true. Check tht via the
            // action.payload.accountField boolean.
            dispatch({
                type: CHECK_STRIPE_ACCOUNT_FIELD_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: CHECK_STRIPE_ACCOUNT_FIELD_FAIL,
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
