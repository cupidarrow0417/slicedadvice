import {
    ALL_EXPERTISE_POSTS_SUCCESS,
    ALL_EXPERTISE_POSTS_FAIL,
    ALL_CAREER_GROWTH_EXPERTISE_POSTS_SUCCESS,
    ALL_CAREER_GROWTH_EXPERTISE_POSTS_FAIL,
    ALL_COLLEGE_APPLICATION_EXPERTISE_POSTS_SUCCESS,
    ALL_COLLEGE_APPLICATION_EXPERTISE_POSTS_FAIL,
    ALL_PERSONAL_DEVELOPMENT_EXPERTISE_POSTS_SUCCESS,
    ALL_PERSONAL_DEVELOPMENT_EXPERTISE_POSTS_FAIL,
    EXPERTISE_POST_DETAIL_SUCCESS,
    EXPERTISE_POST_DETAIL_FAIL,
    CREATE_EXPERTISE_POST_REQUEST,
    CREATE_EXPERTISE_POST_SUCCESS,
    CREATE_EXPERTISE_POST_FAIL,
    CLEAR_ERRORS,
} from "../constants/expertisePostConstants";

/**
 * This function is responsible for handling the state of the allExpertisePosts reducer.
 * Use this reducer any time you want to get all expertise posts from the global state after
 * dispatching an action that gets all expertise posts with no category query.
 * @param state - The state of the reducer.
 * @param {any} action - any
 * @returns The state of the reducer.
 */
export const allExpertisePostsReducer = (
    state = { expertisePosts: [] },
    action: any
) => {
    switch (action.type) {
        case ALL_EXPERTISE_POSTS_SUCCESS:
            return {
                allExpertisePostsCount: action.payload.expertisePostsCount,
                // resPerPage: action.payload.resPerPage,
                filteredAllExpertisePostsCount:
                    action.payload.filteredExpertisePostsCount,
                allExpertisePosts: action.payload.expertisePosts,
            };
        case ALL_EXPERTISE_POSTS_FAIL:
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
 * This function is responsible for handling the state of the allCareerGrowthExpertisePosts reducer.
 * Use this reducer any time you want to get all career growth expertise posts from the global state after
 * dispatching an action that gets all expertise posts with the 'Career Growth' category query.
 * @param state - The state of the reducer.
 * @param {any} action - any
 * @returns The state of the reducer.
 */
export const allCareerGrowthExpertisePostsReducer = (
    state = { expertisePosts: [] },
    action: any
) => {
    switch (action.type) {
        case ALL_CAREER_GROWTH_EXPERTISE_POSTS_SUCCESS:
            return {
                careerGrowthExpertisePostsCount:
                    action.payload.expertisePostsCount,
                // resPerPage: action.payload.resPerPage,
                filteredCareerGrowthExpertisePostsCount:
                    action.payload.filteredExpertisePostsCount,
                    careerGrowthExpertisePosts: action.payload.expertisePosts,
            };
        case ALL_CAREER_GROWTH_EXPERTISE_POSTS_FAIL:
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
 * This function is responsible for handling the state of the allCollegeApplicationExpertisePosts reducer.
 * Use this reducer any time you want to get all college application expertise posts from the global state after
 * dispatching an action that gets all expertise posts with the 'College Application' category query.
 * @param state - The state of the reducer.
 * @param {any} action - any
 * @returns The state of the reducer.
 */
export const allCollegeApplicationExpertisePostsReducer = (
    state = { expertisePosts: [] },
    action: any
) => {
    switch (action.type) {
        case ALL_COLLEGE_APPLICATION_EXPERTISE_POSTS_SUCCESS:
            return {
                collegeApplicationExpertisePostsCount:
                    action.payload.expertisePostsCount,
                // resPerPage: action.payload.resPerPage,
                filteredCollegeApplicationExpertisePostsCount:
                    action.payload.filteredExpertisePostsCount,
                collegeApplicationExpertisePosts: action.payload.expertisePosts,
            };
        case ALL_COLLEGE_APPLICATION_EXPERTISE_POSTS_FAIL:
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
 * This function is responsible for handling the state of the allPersonalDevelopmentExpertisePosts reducer.
 * Use this reducer any time you want to get all personal development expertise posts from the global state after
 * dispatching an action that gets all expertise posts with the 'Personal Development' category query.
 * @param state - The state of the reducer.
 * @param {any} action - any
 * @returns The state of the reducer.
 */
 export const allPersonalDevelopmentExpertisePostsReducer = (
    state = { expertisePosts: [] },
    action: any
) => {
    switch (action.type) {
        case ALL_PERSONAL_DEVELOPMENT_EXPERTISE_POSTS_SUCCESS:
            return {
                personalDevelopmentExpertisePostsCount:
                    action.payload.expertisePostsCount,
                // resPerPage: action.payload.resPerPage,
                filteredPersonalDevelopmentExpertisePostsCount:
                    action.payload.filteredExpertisePostsCount,
                personalDevelopmentExpertisePosts: action.payload.expertisePosts,
            };
        case ALL_PERSONAL_DEVELOPMENT_EXPERTISE_POSTS_FAIL:
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
