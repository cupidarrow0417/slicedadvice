import { createStore, applyMiddleware } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers/reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "../utils/reduxPersistStorage";

/**
 * If we're in development mode, we'll wrap our middleware with redux-devtools/extension's
 * composeWithDevTools. Otherwise, we'll just use applyMiddleware
 * @param {any} middleware - An array of middleware functions.
 * @returns A function that takes a reducer and returns a store.
 */
 const bindMiddleware = (middleware: any) => {

    //if in dev mode, wrap with redux-devtools/extension
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('@redux-devtools/extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }

    //else, in production.
    return applyMiddleware(...middleware)
}


/**
 * If the action type is HYDRATE, it will merge the state with the payload. Otherwise, it will run the
 * reducers
 * @param {any} state - The current state of the store.
 * @param {any} action - The action object that was dispatched.
 * @returns The reducer function is being returned.
 */
const rootReducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        // IMPORTANT: on client side page navigation, persist 
        // the global state we wish to not get deleted on hydration.
        if (state.cacheBookingData) {
            nextState.cacheBookingData = state.cacheBookingData;
        }
        return nextState;
    } else {
        return reducers(state, action);
    }
};

// Used to create persistedReducer
const persistConfig = {
    key: "nextjs",
    whitelist: ["cacheBookingData"], // only counter will be persisted, add other reducers if needed
    storage, // if needed, use a safer storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer


/**
 * If it's on server side, create a store. If it's on client side, create a store which will persist
 * @param {any}  - isServer - This is a boolean value which is true if the store is being created on
 * the server side.
 * @returns A function which takes an object as an argument and returns a store.
 */
const makeStore = ({ isServer }: any) => {
    if (isServer) {
        //If it's on server side, create a store
        return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
    } else {
        //If it's on client side, create a store which will persist

        const store: any = createStore(
            persistedReducer,
            bindMiddleware([thunkMiddleware])
        ); // Creating the store again

        store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

        return store;
    }
};

//https://stackoverflow.com/a/67656911/16435056 to add Typescript functionality
//to Redux store
const store = createStore(persistedReducer, bindMiddleware([thunkMiddleware]));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);
