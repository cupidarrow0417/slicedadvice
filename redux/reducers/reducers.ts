import { combineReducers } from "redux"
import { allExpertisePostsReducer, expertisePostDetailsReducer } from "./expertisePostReducers"
import { authReducer, userReducer } from "./userReducers"

/* Creating a new reducer that combines all of the individual reducers into one. */
const reducer = combineReducers({
    allExpertisePosts: allExpertisePostsReducer,
    expertisePostDetails: expertisePostDetailsReducer,
    auth: authReducer,
    user: userReducer,
})

export default reducer