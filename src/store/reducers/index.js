import { combineReducers } from "redux";
import dataReducer from './data';
import authReducer from './auth';

export default combineReducers({
    data: dataReducer,
    auth: authReducer
});