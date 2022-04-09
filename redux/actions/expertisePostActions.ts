import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
    ALL_EXPERTISE_POSTS_SUCCESS,
    ALL_EXPERTISE_POSTS_FAIL,
    EXPERTISE_POST_DETAIL_SUCCESS,
    EXPERTISE_POST_DETAIL_FAIL,
    CLEAR_ERRORS,
} from "../constants/expertisePostConstants";

/**
 * This function is used to get all the expertise posts from the backend
 * @param {any} req - any
 */
export const getExpertisePosts = (req: any) => async (dispatch: any) => {
    try {
        const { origin } = absoluteUrl(req);
        const { data } = await axios.get(`${origin}/api/expertisePosts/`);

        dispatch({
            type: ALL_EXPERTISE_POSTS_SUCCESS,
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: ALL_EXPERTISE_POSTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

/**
 * Get the details of a single expertise post
 * @param {any} req - any
 * @param {any} id - The id of the post to fetch.
 */
export const getExpertisePostDetails =
    (req: any, id: any) => async (dispatch: any) => {
        try {
            const { origin } = absoluteUrl(req);
            const { data } = await axios.get(
                `${origin}/api/expertisePosts/${id}`
            );

            dispatch({
                type: EXPERTISE_POST_DETAIL_SUCCESS,
                payload: data.expertisePost,
            });
        } catch (error: any) {
            dispatch({
                type: EXPERTISE_POST_DETAIL_FAIL,
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
