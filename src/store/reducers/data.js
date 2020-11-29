import * as actionTypes from "../actions/actiontypes";
import { updatedObject } from "../utility";

const initialState = {
  listdata: [],
  
};

const addData = (state, action) => {
  return updatedObject(state, {
    listdata: action.payload
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return addData(state, action);
    default:
      return state;
  }
};

export default reducer;
