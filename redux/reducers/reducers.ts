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
    getStripeSetupPayoutsLinkReducer,
    checkStripeAccountFieldReducer,
} from "./userReducers";

/* Creating a new reducer that combines all of the individual reducers into one. */
const reducer = combineReducers({
    // Expertise Post Global State
    allExpertisePosts: allExpertisePostsReducer,
    allCareerGrowthExpertisePosts: allCareerGrowthExpertisePostsReducer,
    allCollegeApplicationExpertisePosts:
        allCollegeApplicationExpertisePostsReducer,
    allPersonalDevelopmentExpertisePosts:
        allPersonalDevelopmentExpertisePostsReducer,
    expertisePostDetails: expertisePostDetailsReducer,

    // User global state
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    stripeSetupPayoutsLink: getStripeSetupPayoutsLinkReducer,
    checkStripeAccountField: checkStripeAccountFieldReducer,
});

export default reducer;
