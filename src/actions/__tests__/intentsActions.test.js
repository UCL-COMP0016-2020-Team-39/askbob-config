import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as actions from "../intentsActions";
import * as types from "../types";

it("should create an action that adds an intent", () => {
  const intent = {
    name: "intentName",
    examples: ["example1", "example2"],
    intent_id: "id",
  };

  const expectedAction = {
    type: types.ADD_INTENT,
    payload: { intent },
  };

  expect(actions.addIntent(intent)).toEqual(expectedAction);
});

it("should create an action that updates an intent", () => {
  const intent = {
    name: "intentName",
    examples: ["example1", "example2"],
    intent_id: "id",
  };

  const expectedAction = {
    type: types.UPDATE_INTENT,
    payload: { intent },
  };

  expect(actions.updateIntent(intent)).toEqual(expectedAction);
});

it("should create an action that delete an intent", () => {
  const id = "id";

  const expectedAction = {
    type: types.DELETE_INTENT,
    payload: { id },
  };

  expect(actions.deleteIntent(id)).toEqual(expectedAction);
});

it("should create an action that stores an intent", () => {
  const expectedAction = {
    type: types.STORE_INTENT,
  };

  expect(actions.storeIntents()).toEqual(expectedAction);
});

it("should create an action that loads an intent", () => {
  const expectedAction = {
    type: types.LOAD_INTENT,
  };

  expect(actions.loadIntents()).toEqual(expectedAction);
});

it("should create an action that switches the mode to edit intent mode", () => {
  const intent = {
    name: "intentName",
    examples: ["example1", "example2"],
    intent_id: "id",
  };

  const expectedAction = {
    type: types.EDIT_MODE_INTENT,
    payload: { currentItem: intent },
  };

  expect(actions.switchToIntentEditMode(intent)).toEqual(expectedAction);
});

it("should create an action that switches the mode to add intent mode", () => {
  const expectedAction = {
    type: types.ADD_MODE_INTENT,
  };

  expect(actions.switchToIntentAddMode()).toEqual(expectedAction);
});
