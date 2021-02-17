import {
  ADD_REGEX,
  DELETE_REGEX,
  LOAD_REGEX,
  STORE_REGEX,
  UPDATE_REGEX,
  EDIT_MODE_REGEX,
  ADD_MODE_REGEX,
} from "./types";

export const addRegex = regex => ({
  type: ADD_REGEX,
  payload: { regex },
});

export const deleteRegex = id => ({
  type: DELETE_REGEX,
  payload: { id },
});

export const updateRegex = regex => ({
  type: UPDATE_REGEX,
  payload: { regex },
});
export const loadRegexes = () => ({ type: LOAD_REGEX });

export const storeRegexes = () => ({ type: STORE_REGEX });

export const switchToRegexEditMode = currentItem => {
  return {
    type: EDIT_MODE_REGEX,
    payload: { currentItem },
  };
};

export const switchToRegexAddMode = () => {
  return {
    type: ADD_MODE_REGEX,
  };
};
