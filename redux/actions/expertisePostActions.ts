import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
    ALL_EXPERTISE_POSTS_SUCCESS,
    ALL_EXPERTISE_POSTS_FAIL,
    ALL_CAREER_GROWTH_EXPERTISE_POSTS_SUCCESS,
    ALL_COLLEGE_APPLICATION_EXPERTISE_POSTS_SUCCESS,
    ALL_COLLEGE_APPLICATION_EXPERTISE_POSTS_FAIL,
    ALL_PERSONAL_DEVELOPMENT_EXPERTISE_POSTS_SUCCESS,
    EXPERTISE_POST_DETAIL_SUCCESS,
    EXPERTISE_POST_DETAIL_FAIL,
    CLEAR_ERRORS,
    ALL_CAREER_GROWTH_EXPERTISE_POSTS_FAIL,
    ALL_PERSONAL_DEVELOPMENT_EXPERTISE_POSTS_FAIL,
} from "../constants/expertisePostConstants";

/**
 * It gets all the expertise posts from the database and dispatches the result to the reducer
 * @param {any} [req=null] - This is the request object that is passed to the server when the page is
 * loaded.
 * @param {Number} [currentPage=1] - Number = 1 - this is the current page number.
 * @param {string} [category] - string = '' - this is the optional category filter.
 */
export const getExpertisePosts =
    (req: any = null, currentPage: Number = 1, category: string = "") =>
    async (dispatch: any) => {
        try {
            const { origin } = absoluteUrl(req);
            let link = `${origin}/api/expertisePosts?page=${currentPage}`;
            if (category) link = link.concat(`&category=${category}`);

            const { data } = await axios.get(link);

            // Save the retrieved data to different global states based on category
            if (category === "Career Growth") {
                dispatch({
                    type: ALL_CAREER_GROWTH_EXPERTISE_POSTS_SUCCESS,
                    payload: data,
                });
            } else if (category === "College Application") {
                dispatch({
                    type: ALL_COLLEGE_APPLICATION_EXPERTISE_POSTS_SUCCESS,
                    payload: data,
                });
            } else if (category === "Personal Development") {
                dispatch({
                    type: ALL_PERSONAL_DEVELOPMENT_EXPERTISE_POSTS_SUCCESS,
                    payload: data,
                });
            } else {
                // Basic general query of expertise posts.
                dispatch({
                    type: ALL_EXPERTISE_POSTS_SUCCESS,
                    payload: data,
                });
            }
        } catch (error: any) {
            // Dispatch errors based on advice category
            if (category === "Career Growth") {
                dispatch({
                    type: ALL_CAREER_GROWTH_EXPERTISE_POSTS_FAIL,
                    payload: error.response.data.message,
                });
            } else if (category === "College Application") {
                dispatch({
                    type: ALL_COLLEGE_APPLICATION_EXPERTISE_POSTS_FAIL,
                    payload: error.response.data.message,
                });
            } else if (category === "Personal Development") {
                dispatch({
                    type: ALL_PERSONAL_DEVELOPMENT_EXPERTISE_POSTS_FAIL,
                    payload: error.response.data.message,
                });
            } else {
                // Basic general query of expertise posts.
                dispatch({
                    type: ALL_EXPERTISE_POSTS_FAIL,
                    payload: error.response.data.message,
                });
            }
            
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
