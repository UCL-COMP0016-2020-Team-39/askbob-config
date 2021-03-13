import "@testing-library/jest-dom";

import * as actions from "../responsesActions";
import * as types from "../types";

it("should create an action that adds an response with id starting with utter_", () => {
  const response1 = {
    name: "responseName1",
    examples: ["example1-1", "example1-2"],
    response_id: "id1",
  };

  const response2 = {
    name: "responseName2",
    examples: ["example2-1", "example2-2"],
    response_id: "utter_id2",
  };
  const expectedAction1 = {
    type: types.ADD_RESPONSE,
    payload: {
      response: {
        name: "responseName1",
        examples: ["example1-1", "example1-2"],
        response_id: "utter_id1",
      },
    },
  };

  const expectedAction2 = {
    type: types.ADD_RESPONSE,
    payload: {
      response: {
        name: "responseName2",
        examples: ["example2-1", "example2-2"],
        response_id: "utter_id2",
      },
    },
  };

  const actualAction1 = actions.addResponse(response1);
  const actualAction2 = actions.addResponse(response2);

  expect(expectedAction1).toEqual(actualAction1);
  expect(expectedAction2).toEqual(actualAction2);
});

it("should create an action that updates an response", () => {
  const response = {
    name: "responseName",
    examples: ["example1", "example2"],
    response_id: "id",
  };

  const expectedAction = {
    type: types.UPDATE_RESPONSE,
    payload: { response },
  };

  expect(actions.updateResponse(response)).toEqual(expectedAction);
});

it("should create an action that delete an response", () => {
  const id = "id";

  const expectedAction = {
    type: types.DELETE_RESPONSE,
    payload: { id },
  };

  expect(actions.deleteResponse(id)).toEqual(expectedAction);
});

it("should create an action that stores an response", () => {
  const expectedAction = {
    type: types.STORE_RESPONSE,
  };

  expect(actions.storeResponses()).toEqual(expectedAction);
});

it("should create an action that loads an response", () => {
  const expectedAction = {
    type: types.LOAD_RESPONSE,
  };

  expect(actions.loadResponses()).toEqual(expectedAction);
});

it("should create an action that switches the mode to edit response mode", () => {
  const response = {
    name: "responseName",
    examples: ["example1", "example2"],
    response_id: "id",
  };

  const expectedAction = {
    type: types.EDIT_MODE_RESPONSE,
    payload: { currentItem: response },
  };

  expect(actions.switchToResponseEditMode(response)).toEqual(expectedAction);
});

it("should create an action that switches the mode to add response mode", () => {
  const expectedAction = {
    type: types.ADD_MODE_RESPONSE,
  };

  expect(actions.switchToResponseAddMode()).toEqual(expectedAction);
});
