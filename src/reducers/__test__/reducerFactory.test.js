import "@testing-library/jest-dom";
import createReducer from "../reducerFactory";
import * as actionTypes from "../../actions/types";

import localStorageMock from "./localStorageMock";

const reducerName = "intent";
const actionName = reducerName.toUpperCase();

let reducer;

beforeAll(() => {
  global.localStorage = jest.fn(localStorageMock());
});

beforeEach(() => {
  reducer = createReducer(reducerName);
});

afterEach(() => {
  reducer = null;
});

it("should return initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    items: [],
    currentItem: null,
    mode: actionTypes[`ADD_MODE_${actionName}`],
  });
});

it("should handle ADD_INTENT", () => {
  const actualState = reducer(
    {
      items: [],
      currentItem: null,
      mode: actionTypes[`ADD_MODE_${actionName}`],
    },
    {
      type: actionTypes.ADD_INTENT,
      payload: {
        [reducerName]: {
          name: "intentName",
          examples: ["example1", "example2"],
          intent_id: "id",
        },
      },
    }
  );

  const expectedState = {
    items: [
      {
        name: "intentName",
        examples: ["example1", "example2"],
        intent_id: "id",
      },
    ],
    currentItem: null,
    mode: actionTypes[`ADD_MODE_${actionName}`],
  };
  expect(actualState.currentItem).toBeNull();
  expect(actualState.mode).toBe(expectedState.mode);
  expect(actualState.items).toEqual(
    expect.arrayContaining([expect.objectContaining(expectedState.items[0])])
  );
});

it("should handle UPDATE_INTENT", () => {
  const actualState = reducer(
    {
      items: [
        {
          name: "intentName",
          examples: ["example1", "example2"],
          intent_id: "id",
        },
      ],
      currentItem: null,
      mode: actionTypes[`ADD_MODE_${actionName}`],
    },
    {
      type: actionTypes.UPDATE_INTENT,
      payload: {
        [reducerName]: {
          name: "updatedName",
          examples: ["updatedExample1", "updatedExample2"],
        },
      },
    }
  );

  const expectedState = {
    items: [
      {
        name: "updatedName",
        examples: ["updatedExample1", "updatedExample2"],
        intent_id: "id",
      },
    ],
    currentItem: null,
    mode: actionTypes[`ADD_MODE_${actionName}`],
  };
  expect(actualState.currentItem).toBeNull();
  expect(actualState.mode).toBe(expectedState.mode);
  expect(actualState.items).toEqual(
    expect.arrayContaining([expect.objectContaining(expectedState.items[0])])
  );
});

it("should handle partial UPDATE_INTENT", () => {
  const actualState = reducer(
    {
      items: [
        {
          name: "intentName",
          examples: ["example1", "example2"],
          intent_id: "id",
        },
      ],
      currentItem: null,
      mode: actionTypes[`ADD_MODE_${actionName}`],
    },
    {
      type: actionTypes.UPDATE_INTENT,
      payload: {
        [reducerName]: {
          name: "updatedName",
        },
      },
    }
  );

  const expectedState = {
    items: [
      {
        name: "updatedName",
        examples: ["example1", "example2"],
        intent_id: "id",
      },
    ],
    currentItem: null,
    mode: actionTypes[`ADD_MODE_${actionName}`],
  };
  expect(actualState.currentItem).toBeNull();
  expect(actualState.mode).toBe(expectedState.mode);
  expect(actualState.items).toEqual(
    expect.arrayContaining([expect.objectContaining(expectedState.items[0])])
  );
});

it("should handle DELETE_INTENT", () => {
  const actualState = reducer(
    {
      items: [
        {
          name: "intentName1",
          examples: ["example1-1", "example1-2"],
          intent_id: "id1",
        },
        {
          name: "intentName2",
          examples: ["example2-1", "example2-2"],
          intent_id: "id2",
        },
      ],
      currentItem: null,
      mode: actionTypes[`ADD_MODE_${actionName}`],
    },
    {
      type: actionTypes.DELETE_INTENT,
      payload: {
        id: "id2",
      },
    }
  );

  const expectedState = {
    items: [
      {
        name: "intentName1",
        examples: ["example1-1", "example1-2"],
        intent_id: "id1",
      },
    ],
    currentItem: null,
    mode: actionTypes[`ADD_MODE_${actionName}`],
  };
  expect(actualState.currentItem).toBeNull();
  expect(actualState.mode).toBe(expectedState.mode);
  expect(actualState.items).toEqual(
    expect.arrayContaining([expect.objectContaining(expectedState.items[0])])
  );
});

it("should handle LOAD_INTENT", () => {
  reducer(
    {
      items: [
        {
          name: "intentName",
          examples: ["example1", "example2"],
          intent_id: "id",
        },
      ],
      currentItem: null,
      mode: actionTypes[`ADD_MODE_${actionName}`],
    },
    {
      type: actionTypes.STORE_INTENT,
    }
  );

  const expectedState = JSON.stringify({
    items: [
      {
        name: "intentName",
        examples: ["example1", "example2"],
        intent_id: "id",
      },
    ],
    currentItem: null,
    mode: actionTypes[`ADD_MODE_${actionName}`],
  });
  expect(expectedState).toEqual(
    localStorage.getItem(`askBobConfig${reducerName}`)
  );
});

it("should handle STORE_INTENT", () => {
  const expectedState = JSON.stringify({
    items: [
      {
        name: "intentName",
        examples: ["example1", "example2"],
        intent_id: "id",
      },
    ],
    currentItem: null,
    mode: actionTypes[`ADD_MODE_${actionName}`],
  });

  localStorage.setItem(`askBobConfig${reducerName}`, expectedState);

  const actualState = JSON.stringify(
    reducer(
      {},
      {
        type: actionTypes.LOAD_INTENT,
      }
    )
  );

  expect(actualState).toEqual(
    localStorage.getItem(`askBobConfig${reducerName}`)
  );
});
