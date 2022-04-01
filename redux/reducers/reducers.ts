import { combineReducers } from "redux"
import { allExpertisePostsReducer, expertisePostDetailsReducer } from "./expertisePostReducers"

/* Creating a new reducer that combines all of the individual reducers into one. */
const reducer = combineReducers({
    allExpertisePosts: allExpertisePostsReducer,
    expertisePostDetails: expertisePostDetailsReducer
})

export default reducer