import * as actionTypes from "../actions/types";
import { v4 } from "uuid";

const initialState = [];

const localStorageKey = "stories";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_STORIES:
      return JSON.parse(localStorage.getItem(localStorageKey)) || [];
    case actionTypes.STORE_STORIES:
      localStorage.setItem(localStorageKey, JSON.stringify(state));
      return state;
    case actionTypes.ADD_STORY:
      return [
        ...state,
        {
          ...action.payload.story,
          id: v4(),
        },
      ];
    case actionTypes.DELETE_STORY:
      return state.filter(story => story.id !== action.payload.id);
    case actionTypes.UPDATE_STORY:
      return state.map(story =>
        story.id !== action.payload.story.id ? story : action.payload.story
      );
    default:
      return state;
  }
};

export default reducer;
