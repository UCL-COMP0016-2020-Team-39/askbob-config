import {
  ADD_RESPONSE,
  DELETE_RESPONSE,
  LOAD_RESPONSE,
  STORE_RESPONSE,
  UPDATE_RESPONSE,
} from "./types";

export const addResponse = response => ({
  type: ADD_RESPONSE,
  payload: { response },
});

export const deleteResponse = id => ({
  type: DELETE_RESPONSE,
  payload: { id },
});

export const updateResponse = response => ({
  type: UPDATE_RESPONSE,
  payload: { response },
});
export const loadResponses = () => ({ type: LOAD_RESPONSE });

export const storeResponses = () => ({ type: STORE_RESPONSE });
