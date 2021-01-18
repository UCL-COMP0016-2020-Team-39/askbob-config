import * as actionTypes from "../actions/types";
import { v4 } from "uuid";

const initialState = [];

const localStorageKey = "skills";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SKILLS:
      return JSON.parse(localStorage.getItem(localStorageKey)) || [];
    case actionTypes.STORE_SKILLS:
      localStorage.setItem(localStorageKey, JSON.stringify(state));
      return state;
    case actionTypes.ADD_SKILL:
      return [
        ...state,
        {
          id: v4(),
          name: action.payload.skill.name,
          variants: action.payload.skill.variants,
        },
      ];
    case actionTypes.DELETE_SKILL:
      return state.filter(skill => skill.id !== action.payload.id);
    case actionTypes.UPDATE_SKILL:
      return state.map(skill =>
        skill.id !== action.payload.skill.id ? skill : action.payload.skill
      );
    default:
      return state;
  }
};

export default reducer;
