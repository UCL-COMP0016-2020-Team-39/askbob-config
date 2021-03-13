import "@testing-library/jest-dom";

import * as actions from "../slotsActions";
import * as types from "../types";

it("should create an action that adds an slot", () => {
  const slot = {
    name: "slot name",
    influence_conversation: "true",
    type: "text",
    slot_id: "slot_name3f201282_3be9_4caa_ae4f_232942f33963",
  };

  const expectedAction = {
    type: types.ADD_SLOT,
    payload: { slot },
  };

  expect(actions.addSlot(slot)).toEqual(expectedAction);
});

it("should create an action that updates an slot", () => {
  const slot = {
    name: "slot name",
    influence_conversation: "true",
    type: "text",
    slot_id: "slot_name3f201282_3be9_4caa_ae4f_232942f33963",
  };

  const expectedAction = {
    type: types.UPDATE_SLOT,
    payload: { slot },
  };

  expect(actions.updateSlot(slot)).toEqual(expectedAction);
});

it("should create an action that delete an slot", () => {
  const id = "id";

  const expectedAction = {
    type: types.DELETE_SLOT,
    payload: { id },
  };

  expect(actions.deleteSlot(id)).toEqual(expectedAction);
});

it("should create an action that stores an slot", () => {
  const expectedAction = {
    type: types.STORE_SLOT,
  };

  expect(actions.storeSlots()).toEqual(expectedAction);
});

it("should create an action that loads an slot", () => {
  const expectedAction = {
    type: types.LOAD_SLOT,
  };

  expect(actions.loadSlots()).toEqual(expectedAction);
});

it("should create an action that switches the mode to edit slot mode", () => {
  const slot = {
    name: "slot name",
    influence_conversation: "true",
    type: "text",
    slot_id: "slot_name3f201282_3be9_4caa_ae4f_232942f33963",
  };

  const expectedAction = {
    type: types.EDIT_MODE_SLOT,
    payload: { currentItem: slot },
  };

  expect(actions.switchToSlotEditMode(slot)).toEqual(expectedAction);
});

it("should create an action that switches the mode to add slot mode", () => {
  const expectedAction = {
    type: types.ADD_MODE_SLOT,
  };

  expect(actions.switchToSlotAddMode()).toEqual(expectedAction);
});
