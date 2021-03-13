import "@testing-library/jest-dom";

import * as actions from "../lookupsActions";
import * as types from "../types";

it("should create an action that adds an lookup", () => {
  const lookup = {
    name: "lookupName",
    examples: ["example1", "example2"],
    lookup_id: "id",
  };

  const expectedAction = {
    type: types.ADD_LOOKUP,
    payload: { lookup },
  };

  expect(actions.addLookup(lookup)).toEqual(expectedAction);
});

it("should create an action that updates an lookup", () => {
  const lookup = {
    name: "lookupName",
    examples: ["example1", "example2"],
    lookup_id: "id",
  };

  const expectedAction = {
    type: types.UPDATE_LOOKUP,
    payload: { lookup },
  };

  expect(actions.updateLookup(lookup)).toEqual(expectedAction);
});

it("should create an action that delete an lookup", () => {
  const id = "id";

  const expectedAction = {
    type: types.DELETE_LOOKUP,
    payload: { id },
  };

  expect(actions.deleteLookup(id)).toEqual(expectedAction);
});

it("should create an action that stores an lookup", () => {
  const expectedAction = {
    type: types.STORE_LOOKUP,
  };

  expect(actions.storeLookups()).toEqual(expectedAction);
});

it("should create an action that loads an lookup", () => {
  const expectedAction = {
    type: types.LOAD_LOOKUP,
  };

  expect(actions.loadLookups()).toEqual(expectedAction);
});

it("should create an action that switches the mode to edit lookup mode", () => {
  const lookup = {
    name: "lookupName",
    examples: ["example1", "example2"],
    lookup_id: "id",
  };

  const expectedAction = {
    type: types.EDIT_MODE_LOOKUP,
    payload: { currentItem: lookup },
  };

  expect(actions.switchToLookupEditMode(lookup)).toEqual(expectedAction);
});

it("should create an action that switches the mode to add lookup mode", () => {
  const expectedAction = {
    type: types.ADD_MODE_LOOKUP,
  };

  expect(actions.switchToLookupAddMode()).toEqual(expectedAction);
});
