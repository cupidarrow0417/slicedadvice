import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    CLEAR_REVIEW_SUCCESS_MESSAGE,
    CLEAR_REVIEW_ERRORS,
} from "../constants/reviewConstants";
import mongoose from "mongoose";


interface SubmittedReviewDataInterface {
    rating: number;
    content: string;
    expertisePostId: String;
    user: String;
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

            const { data } = await axios.post(
                `${origin}/api/expertisePosts/${reviewData.expertisePostId}/reviews`,
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
 * Get the reviews of a single expertise post
 * @param {any} req - any
 * @param {any} id - The id of the post to fetch.
 */
export const getReviews =
(req: any, id: any) => async (dispatch: any) => {
    try {
        const { origin } = absoluteUrl(req);
        const { data } = await axios.get(
            `${origin}/api/expertisePosts/${id}/reviews`
        );
        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews,
        });
    } catch (error: any) {
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message,
        });
    }
};
/**
 * This function is used to clear the errors from the state
 */
export const clearReviewSuccessMessage = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_REVIEW_SUCCESS_MESSAGE,
    });
};

export const clearReviewErrors = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_REVIEW_ERRORS,
    });
};
