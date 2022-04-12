import { combineReducers } from "redux";
import {
    allExpertisePostsReducer,
    allCareerGrowthExpertisePostsReducer,
    allCollegeApplicationExpertisePostsReducer,
    allPersonalDevelopmentExpertisePostsReducer,
    expertisePostDetailsReducer,
} from "./expertisePostReducers";
import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
} from "./userReducers";

/* Creating a new reducer that combines all of the individual reducers into one. */
const reducer = combineReducers({
    allExpertisePosts: allExpertisePostsReducer,
    allCareerGrowthExpertisePosts: allCareerGrowthExpertisePostsReducer,
    allCollegeApplicationExpertisePosts:
        allCollegeApplicationExpertisePostsReducer,
    allPersonalDevelopmentExpertisePosts:
        allPersonalDevelopmentExpertisePostsReducer,
    expertisePostDetails: expertisePostDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
});

export default reducer;
