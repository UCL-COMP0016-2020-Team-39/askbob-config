import {
  ADD_INTENT,
  DELETE_INTENT,
  LOAD_INTENTS,
  STORE_INTENTS,
  UPDATE_INTENT,
} from "./types";

export const addIntent = intent => ({
  type: ADD_INTENT,
  payload: { intent },
});

export const deleteIntent = id => ({
  type: DELETE_INTENT,
  payload: { id },
});

export const updateIntent = intent => ({
  type: UPDATE_INTENT,
  payload: { intent },
});
export const loadIntents = () => ({ type: LOAD_INTENTS });

export const storeIntents = () => ({ type: STORE_INTENTS });
