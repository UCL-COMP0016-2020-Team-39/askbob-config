import {
  ADD_FORM,
  DELETE_FORM,
  LOAD_FORM,
  STORE_FORM,
  UPDATE_FORM,
} from "./types";

export const addForm = form => ({
  type: ADD_FORM,
  payload: { form },
});

export const deleteForm = id => ({
  type: DELETE_FORM,
  payload: { id },
});

export const updateForm = form => ({
  type: UPDATE_FORM,
  payload: { form },
});
export const loadForms = () => ({ type: LOAD_FORM });

export const storeForms = () => ({ type: STORE_FORM });
