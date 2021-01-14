import * as actionTypes from "./types";

export const switchToEditMode = question => {
  return {
    type: actionTypes.EDIT_MODE,
    payload: { question },
  };
};

export const switchToAddMode = () => {
  return {
    type: actionTypes.ADD_MODE,
  };
};
