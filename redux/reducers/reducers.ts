import { combineReducers } from "redux";
import {
    allExpertisePostsReducer,
    allCareerGrowthExpertisePostsReducer,
    allCollegeApplicationExpertisePostsReducer,
    allPersonalDevelopmentExpertisePostsReducer,
    expertisePostDetailsReducer,
    createExpertisePostReducer,
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
    createStripePaymentIntentReducer,
    cacheBookingDataReducer,
    // createBookingReducer,
    bookingsReducer,
    // updateBookingReducer,
} from "./bookingReducers"
import {
    createReviewReducer,
    getPostReviewsReducer,
    allReviewsReducer,
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

    // User global state
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    stripeSetupPayoutsLink: getStripeSetupPayoutsLinkReducer,
    checkStripeAccountField: checkStripeAccountFieldReducer,

    // Booking global state
    createStripePaymentIntent: createStripePaymentIntentReducer,
    cacheBookingData: cacheBookingDataReducer,
    bookings: bookingsReducer,
    // updateBooking: updateBookingReducer,

    // Review global state
    createReview: createReviewReducer,
    postReviews: getPostReviewsReducer,
    allReviews: allReviewsReducer
});

export default reducer;
