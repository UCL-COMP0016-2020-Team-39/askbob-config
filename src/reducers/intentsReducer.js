import * as actionTypes from "../actions/types";
import { v4 } from "uuid";

const initialState = [];

const localStorageKey = "intents";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_INTENTS:
      return JSON.parse(localStorage.getItem(localStorageKey)) || [];
    case actionTypes.STORE_INTENTS:
      localStorage.setItem(localStorageKey, JSON.stringify(state));
      return state;
    case actionTypes.ADD_INTENT:
      return [
        ...state,
        {
          id: v4(),
          name: action.payload.intent.name,
          variants: action.payload.intent.variants,
        },
      ];
    case actionTypes.DELETE_INTENT:
      return state.filter(intent => intent.id !== action.payload.id);
    case actionTypes.UPDATE_INTENT:
      return state.map(intent =>
        intent.id !== action.payload.intent.id ? intent : action.payload.intent
      );
    default:
      return state;
  }
};

export default reducer;
