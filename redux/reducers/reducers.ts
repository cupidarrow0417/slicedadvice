import { combineReducers } from "redux";
import {
    allExpertisePostsReducer,
    allCareerGrowthExpertisePostsReducer,
    allCollegeApplicationExpertisePostsReducer,
    allPersonalDevelopmentExpertisePostsReducer,
    expertisePostDetailsReducer,
    createExpertisePostReducer,
    updateExpertisePostReducer
} from "./expertisePostReducers";
import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
    getStripeSetupPayoutsLinkReducer,
    checkStripeAccountFieldReducer,
} from "./userReducers";
import {
    stripePaymentIntentReducer,
    cacheBookingDataReducer,
    bookingsReducer,
} from "./bookingReducers"
import {
    reviewReducer
} from "./reviewReducers"

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
    createExpertisePost: createExpertisePostReducer,
    updateExpertisePost: updateExpertisePostReducer,

    // User global state
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    stripeSetupPayoutsLink: getStripeSetupPayoutsLinkReducer,
    checkStripeAccountField: checkStripeAccountFieldReducer,

    // Booking global state
    stripePaymentIntent: stripePaymentIntentReducer,
    cacheBookingData: cacheBookingDataReducer,
    bookings: bookingsReducer,

    // Review global state
    reviews: reviewReducer,
});

export default reducer;
