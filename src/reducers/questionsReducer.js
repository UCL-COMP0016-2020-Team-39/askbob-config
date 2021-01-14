import * as actionTypes from "../actions/types";
import { v4 } from "uuid";
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_QUESTION:
      return [
        ...state,
        {
          id: v4(),
          name: action.payload.question.name,
          variants: action.payload.question.variants,
        },
      ];
    default:
      return state;
  }
};

export default reducer;
