import "@testing-library/jest-dom";

import * as actions from "../storiesActions";
import * as types from "../types";

it("should create an action that adds an story", () => {
  const story = {
    description: "story description",
    story_id: "story_id",
    steps: [
      {
        type: "intent",
        step_id: "an_id",
      },
      {
        type: "response",
        step_id: "utter_id",
      },
    ],
  };

  const expectedAction = {
    type: types.ADD_STORY,
    payload: { story },
  };

  expect(actions.addStory(story)).toEqual(expectedAction);
});

it("should create an action that updates an story", () => {
  const story = {
    description: "story description",
    story_id: "story_id",
    steps: [
      {
        type: "intent",
        step_id: "an_id",
      },
      {
        type: "response",
        step_id: "utter_id",
      },
    ],
  };

  const expectedAction = {
    type: types.UPDATE_STORY,
    payload: { story },
  };

  expect(actions.updateStory(story)).toEqual(expectedAction);
});

it("should create an action that delete an story", () => {
  const id = "id";

  const expectedAction = {
    type: types.DELETE_STORY,
    payload: { id },
  };

  expect(actions.deleteStory(id)).toEqual(expectedAction);
});

it("should create an action that stores an story", () => {
  const expectedAction = {
    type: types.STORE_STORY,
  };

  expect(actions.storeStories()).toEqual(expectedAction);
});

it("should create an action that loads an story", () => {
  const expectedAction = {
    type: types.LOAD_STORY,
  };

  expect(actions.loadStories()).toEqual(expectedAction);
});

it("should create an action that switches the mode to edit story mode", () => {
  const story = {
    description: "story description",
    story_id: "story_id",
    steps: [
      {
        type: "intent",
        step_id: "an_id",
      },
      {
        type: "response",
        step_id: "utter_id",
      },
    ],
  };

  const expectedAction = {
    type: types.EDIT_MODE_STORY,
    payload: { currentItem: story },
  };

  expect(actions.switchToStoryEditMode(story)).toEqual(expectedAction);
});

it("should create an action that switches the mode to add story mode", () => {
  const expectedAction = {
    type: types.ADD_MODE_STORY,
  };

  expect(actions.switchToStoryAddMode()).toEqual(expectedAction);
});
