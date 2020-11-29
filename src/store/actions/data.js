import * as actionTypes from "./actiontypes";

export const addData = (data) => {
  return {
    type: actionTypes.ADD,
    payload: data,
  };
};