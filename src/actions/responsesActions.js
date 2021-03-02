import {
  ADD_RESPONSE,
  DELETE_RESPONSE,
  LOAD_RESPONSE,
  STORE_RESPONSE,
  UPDATE_RESPONSE,
  EDIT_MODE_RESPONSE,
  ADD_MODE_RESPONSE,
} from "./types";

export const addResponse = response => {
  if (!response.response_id.startsWith("utter_")) {
    response.response_id = `utter_${response.response_id}`;
  }

  return {
    type: ADD_RESPONSE,
    payload: { response },
  };
};

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
export const switchToResponseEditMode = currentItem => {
  return {
    type: EDIT_MODE_RESPONSE,
    payload: { currentItem },
  };
};

export const switchToResponseAddMode = () => {
  return {
    type: ADD_MODE_RESPONSE,
  };
};
