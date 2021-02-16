import {
  ADD_SYNONYM,
  DELETE_SYNONYM,
  LOAD_SYNONYMS,
  STORE_SYNONYMS,
  UPDATE_SYNONYM,
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
export const loadSynonyms = () => ({ type: LOAD_SYNONYMS });

export const storeSynonyms = () => ({ type: STORE_SYNONYMS });
