import { combineReducers } from "redux";
import { authReducer } from "./authReducer";



export const reducers = combineReducers({
    /* when we use useselector "authuser will be used" */
    authUser: authReducer,

})