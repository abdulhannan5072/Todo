import * as actionTypes from "../actions/actiontypes";
import { updatedObject } from "../utility";

const initialState = {
  authUser: null
  
};

const getCurrentUser = (state, action) => {
  return updatedObject(state, {
    authUser: action.payload
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CURRENT_USER:
      return getCurrentUser(state, action);
    default:
      return state;
  }
};

export default reducer;
