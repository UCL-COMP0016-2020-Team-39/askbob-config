import * as actionTypes from "../actions/types";

const initialState = {
  currentQuestion: null,
  mode: actionTypes.ADD_MODE,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MODE:
      return {
        currentQuestion: null,
        mode: actionTypes.ADD_MODE,
      };
    case actionTypes.EDIT_MODE:
      return {
        currentQuestion: { ...action.payload.question },
        mode: actionTypes.EDIT_MODE,
      };
    default:
      return state;
  }
};

export default reducer;
