import {
  ADD_LOOKUP,
  DELETE_LOOKUP,
  LOAD_LOOKUP,
  STORE_LOOKUP,
  UPDATE_LOOKUP,
  EDIT_MODE_LOOKUP,
  ADD_MODE_LOOKUP,
} from "./types";

export const addLookup = lookup => ({
  type: ADD_LOOKUP,
  payload: { lookup },
});

export const deleteLookup = id => ({
  type: DELETE_LOOKUP,
  payload: { id },
});

export const updateLookup = lookup => ({
  type: UPDATE_LOOKUP,
  payload: { lookup },
});
export const loadLookups = () => ({ type: LOAD_LOOKUP });

export const storeLookups = () => ({ type: STORE_LOOKUP });

export const switchToLookupEditMode = currentItem => {
  return {
    type: EDIT_MODE_LOOKUP,
    payload: { currentItem },
  };
};

export const switchToLookupAddMode = () => {
  return {
    type: ADD_MODE_LOOKUP,
  };
};
