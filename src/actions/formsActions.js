import {
  ADD_FORM,
  DELETE_FORM,
  LOAD_FORM,
  STORE_FORM,
  UPDATE_FORM,
  EDIT_MODE_FORM,
  ADD_MODE_FORM,
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

export const switchToFormEditMode = currentItem => {
  return {
    type: EDIT_MODE_FORM,
    payload: { currentItem },
  };
};

export const switchToFormAddMode = () => {
  return {
    type: ADD_MODE_FORM,
  };
};
