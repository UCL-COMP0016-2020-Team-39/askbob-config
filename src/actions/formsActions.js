import {
  ADD_FORM,
  DELETE_FORM,
  LOAD_FORMS,
  STORE_FORMS,
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
export const loadForms = () => ({ type: LOAD_FORMS });

export const storeForms = () => ({ type: STORE_FORMS });
