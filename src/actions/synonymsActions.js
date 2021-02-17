import {
  ADD_SYNONYM,
  DELETE_SYNONYM,
  LOAD_SYNONYM,
  STORE_SYNONYM,
  UPDATE_SYNONYM,
  EDIT_MODE_SYNONYM,
  ADD_MODE_SYNONYM,
} from "./types";

export const addSynonym = synonym => ({
  type: ADD_SYNONYM,
  payload: { synonym },
});

export const deleteSynonym = id => ({
  type: DELETE_SYNONYM,
  payload: { id },
});

export const updateSynonym = synonym => ({
  type: UPDATE_SYNONYM,
  payload: { synonym },
});
export const loadSynonyms = () => ({ type: LOAD_SYNONYM });

export const storeSynonyms = () => ({ type: STORE_SYNONYM });

export const switchToSynonymEditMode = currentItem => {
  return {
    type: EDIT_MODE_SYNONYM,
    payload: { currentItem },
  };
};

export const switchToSynonymAddMode = () => {
  return {
    type: ADD_MODE_SYNONYM,
  };
};
