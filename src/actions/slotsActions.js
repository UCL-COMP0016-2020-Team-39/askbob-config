import {
  ADD_SLOT,
  DELETE_SLOT,
  LOAD_SLOT,
  STORE_SLOT,
  UPDATE_SLOT,
  EDIT_MODE_SLOT,
  ADD_MODE_SLOT,
} from "./types";

export const addSlot = slot => ({
  type: ADD_SLOT,
  payload: { slot },
});

export const deleteSlot = id => ({
  type: DELETE_SLOT,
  payload: { id },
});

export const updateSlot = slot => ({
  type: UPDATE_SLOT,
  payload: { slot },
});
export const loadSlots = () => ({ type: LOAD_SLOT });

export const storeSlots = () => ({ type: STORE_SLOT });

export const switchToSlotEditMode = currentItem => {
  return {
    type: EDIT_MODE_SLOT,
    payload: { currentItem },
  };
};

export const switchToSlotAddMode = () => {
  return {
    type: ADD_MODE_SLOT,
  };
};
