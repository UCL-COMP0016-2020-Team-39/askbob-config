import "@testing-library/jest-dom";

import * as actions from "../regexesActions";
import * as types from "../types";

it("should create an action that adds an regex", () => {
  const regex = {
    name: "regexName",
    examples: ["example1", "example2"],
    regex_id: "id",
  };

  const expectedAction = {
    type: types.ADD_REGEX,
    payload: { regex },
  };

  expect(actions.addRegex(regex)).toEqual(expectedAction);
});

it("should create an action that updates an regex", () => {
  const regex = {
    name: "regexName",
    examples: ["example1", "example2"],
    regex_id: "id",
  };

  const expectedAction = {
    type: types.UPDATE_REGEX,
    payload: { regex },
  };

  expect(actions.updateRegex(regex)).toEqual(expectedAction);
});

it("should create an action that delete an regex", () => {
  const id = "id";

  const expectedAction = {
    type: types.DELETE_REGEX,
    payload: { id },
  };

  expect(actions.deleteRegex(id)).toEqual(expectedAction);
});

it("should create an action that stores an regex", () => {
  const expectedAction = {
    type: types.STORE_REGEX,
  };

  expect(actions.storeRegexes()).toEqual(expectedAction);
});

it("should create an action that loads an regex", () => {
  const expectedAction = {
    type: types.LOAD_REGEX,
  };

  expect(actions.loadRegexes()).toEqual(expectedAction);
});

it("should create an action that switches the mode to edit regex mode", () => {
  const regex = {
    name: "regexName",
    examples: ["example1", "example2"],
    regex_id: "id",
  };

  const expectedAction = {
    type: types.EDIT_MODE_REGEX,
    payload: { currentItem: regex },
  };

  expect(actions.switchToRegexEditMode(regex)).toEqual(expectedAction);
});

it("should create an action that switches the mode to add regex mode", () => {
  const expectedAction = {
    type: types.ADD_MODE_REGEX,
  };

  expect(actions.switchToRegexAddMode()).toEqual(expectedAction);
});
