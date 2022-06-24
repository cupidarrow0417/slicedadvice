import axios from "axios";
import absoluteUrl from "next-absolute-url";
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

interface SubmittedReviewDataInterface {
    rating: Number;
    description: String;
    expertisePostId: String;
    userId: String;
    status: String;
}


export const createReview =
    (reviewData: SubmittedReviewDataInterface) => async (dispatch: any) => {
        try {
            dispatch({
                type: CREATE_REVIEW_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            // CHANGE THE DATA THAT IS PULLED
            const { data } = await axios.post(
                `/api/reviews`,
                reviewData, 
                config
            );

            dispatch({
                type: CREATE_REVIEW_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: CREATE_REVIEW_FAIL,
                payload: error.response.data.message,
            });
        }
    };

/**
 * Get the details of a single expertise post
 * @param {any} req - any
 * @param {any} id - The id of the post to fetch.
 */
export const getPostReviews =
(req: any, id: any) => async (dispatch: any) => {
    try {
        const { origin } = absoluteUrl(req);
        const { data } = await axios.get(
            `${origin}/api/expertisePosts/${id}/reviews`
        );
        dispatch({
            type: POST_REVIEWS_SUCCESS,
            payload: data.reviews,
        });
    } catch (error: any) {
        dispatch({
            type: POST_REVIEWS_FAIL,
            payload: error.response.data.message,
        });
    }
};

/**
 * It's a function that takes in a request object and a current page number, and returns a function
 * that takes in a dispatch function, and dispatches an action to the reducer
 * @param {any} [req=null] - any = null, currentPage: Number = 1
 * @param {Number} [currentPage=1] - Number = 1
 */
export const getAllReviews =
    (req: any = null, currentPage: Number = 1) =>
    async (dispatch: any) => {
        try {
            const { origin } = absoluteUrl(req);
            let link = `${origin}/api/reviews?page=${currentPage}`;
            // if (category) link = link.concat(`&category=${category}`);

            // NOTE: having the config for axios is important.
            // https://stackoverflow.com/a/69058105/16435056
            // Requests originating from getServerSideProps, when passed
            // into Axios, will be STRIPPED of the cookie headers. 
            // Without cookie headers, authentication using getSession is impossible.
            const { data } = await axios.get(link, {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie,
                },
            });

            dispatch({
                type: ALL_REVIEWS_SUCCESS,
                payload: data,
            });
        } catch (error: any) {

            dispatch({
                type: ALL_REVIEWS_FAIL,
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
