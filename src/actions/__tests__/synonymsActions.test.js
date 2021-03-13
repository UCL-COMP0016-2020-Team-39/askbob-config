import "@testing-library/jest-dom";

import * as actions from "../synonymsActions";
import * as types from "../types";

it("should create an action that adds an synonym", () => {
  const synonym = {
    name: "synonymName",
    examples: ["example1", "example2"],
    synonym_id: "id",
  };

  const expectedAction = {
    type: types.ADD_SYNONYM,
    payload: { synonym },
  };

  expect(actions.addSynonym(synonym)).toEqual(expectedAction);
});

it("should create an action that updates an synonym", () => {
  const synonym = {
    name: "synonymName",
    examples: ["example1", "example2"],
    synonym_id: "id",
  };

  const expectedAction = {
    type: types.UPDATE_SYNONYM,
    payload: { synonym },
  };

  expect(actions.updateSynonym(synonym)).toEqual(expectedAction);
});

it("should create an action that delete an synonym", () => {
  const id = "id";

  const expectedAction = {
    type: types.DELETE_SYNONYM,
    payload: { id },
  };

  expect(actions.deleteSynonym(id)).toEqual(expectedAction);
});

it("should create an action that stores an synonym", () => {
  const expectedAction = {
    type: types.STORE_SYNONYM,
  };

  expect(actions.storeSynonyms()).toEqual(expectedAction);
});

it("should create an action that loads an synonym", () => {
  const expectedAction = {
    type: types.LOAD_SYNONYM,
  };

  expect(actions.loadSynonyms()).toEqual(expectedAction);
});

it("should create an action that switches the mode to edit synonym mode", () => {
  const synonym = {
    name: "synonymName",
    examples: ["example1", "example2"],
    synonym_id: "id",
  };

  const expectedAction = {
    type: types.EDIT_MODE_SYNONYM,
    payload: { currentItem: synonym },
  };

  expect(actions.switchToSynonymEditMode(synonym)).toEqual(expectedAction);
});

it("should create an action that switches the mode to add synonym mode", () => {
  const expectedAction = {
    type: types.ADD_MODE_SYNONYM,
  };

  expect(actions.switchToSynonymAddMode()).toEqual(expectedAction);
});
