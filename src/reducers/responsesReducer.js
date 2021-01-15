import * as actionTypes from "../actions/types";
import { v4 } from "uuid";

const initialState = [];

const localStorageKey = "responses";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_RESPONSES:
      return JSON.parse(localStorage.getItem(localStorageKey)) || [];
    case actionTypes.STORE_RESPONSES:
      localStorage.setItem(localStorageKey, JSON.stringify(state));
      return state;
    case actionTypes.ADD_RESPONSE:
      return [
        ...state,
        {
          id: v4(),
          name: action.payload.response.name,
          variants: action.payload.response.variants,
        },
      ];
    case actionTypes.DELETE_RESPONSE:
      return state.filter(response => response.id !== action.payload.id);
    case actionTypes.UPDATE_RESPONSE:
      console.log("in reducer");
      return state.map(response =>
        response.id !== action.payload.response.id
          ? response
          : action.payload.response
      );
    default:
      return state;
  }
};

export default reducer;
