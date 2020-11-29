import * as actionTypes from "./actiontypes";

export const getCurrentUser = (data) => {
  return {
    type: actionTypes.CURRENT_USER,
    payload: data,
  };
};