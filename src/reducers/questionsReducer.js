import * as actionTypes from "../actions/types";
import { v4 } from "uuid";

const initialState = [];

const localStorageKey = "questions";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_QUESTIONS:
      return JSON.parse(localStorage.getItem(localStorageKey)) || [];
    case actionTypes.STORE_QUESTIONS:
      localStorage.setItem(localStorageKey, JSON.stringify(state));
      return state;
    case actionTypes.ADD_QUESTION:
      return [
        ...state,
        {
          id: v4(),
          name: action.payload.question.name,
          variants: action.payload.question.variants,
        },
      ];
    case actionTypes.DELETE_QUESTION:
      return state.filter(question => question.id !== action.payload.id);
    case actionTypes.UPDATE_QUESTION:
      console.log("in reducer");
      return state.map(question =>
        question.id !== action.payload.question.id
          ? question
          : action.payload.question
      );
    default:
      return state;
  }
};

export default reducer;
