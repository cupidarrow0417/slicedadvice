import axios from "axios";
import absoluteUrl from "next-absolute-url";
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

interface postDataInterface {
    user: string;
    stripeConnectId: string;
    title: string;
    description: string;
    submissionTypes: string[];
    cloudinaryImageData: {
        public_id: string;
        url: string;
    }
    pricePerSubmission: number;
    category: string;
}
export const createExpertisePost =
    (postData: postDataInterface) => async (dispatch: any) => {
        try {
            dispatch({
                type: CREATE_EXPERTISE_POST_REQUEST
            })

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            
            console.log("postData in action creator", postData);
            const { data } = await axios.post(`/api/expertisePosts/`, postData, config);

            dispatch({
                type: CREATE_EXPERTISE_POST_SUCCESS,
                payload: data
            })
        } catch (error: any) {
            dispatch({
                type: CREATE_EXPERTISE_POST_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// Update Expertise Action
export const updateExpertisePost =
    (id: any, postData: postDataInterface) => async (dispatch: any) => {
        try {
            dispatch({
                type: UPDATE_EXPERTISE_POST_REQUEST
            })

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const { data } = await axios.put(`/api/expertisePosts/${id}`, postData, config);
            

            dispatch({
                type: UPDATE_EXPERTISE_POST_SUCCESS,
                payload: data
            })
        } catch (error: any) {
            dispatch({
                type: UPDATE_EXPERTISE_POST_FAIL,
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
