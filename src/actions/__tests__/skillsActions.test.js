import "@testing-library/jest-dom";

import * as actions from "../skillsActions";
import * as types from "../types";

it("should create an action that adds an skill", () => {
  const skill = {
    description: "skill description",
    intent: "skill intent ",
    actions: [
      {
        type: "response",
        action_id: "utter_new_response",
      },
      {
        type: "custom",
        action_id: "custom action",
      },
    ],
    skill_id: "id",
  };

  const expectedAction = {
    type: types.ADD_SKILL,
    payload: { skill },
  };

  expect(actions.addSkill(skill)).toEqual(expectedAction);
});

it("should create an action that updates an skill", () => {
  const skill = {
    description: "skill description",
    intent: "skill intent ",
    actions: [
      {
        type: "response",
        action_id: "utter_new_response",
      },
      {
        type: "custom",
        action_id: "custom action",
      },
    ],
    skill_id: "id",
  };

  const expectedAction = {
    type: types.UPDATE_SKILL,
    payload: { skill },
  };

  expect(actions.updateSkill(skill)).toEqual(expectedAction);
});

it("should create an action that delete an skill", () => {
  const id = "id";

  const expectedAction = {
    type: types.DELETE_SKILL,
    payload: { id },
  };

  expect(actions.deleteSkill(id)).toEqual(expectedAction);
});

it("should create an action that stores an skill", () => {
  const expectedAction = {
    type: types.STORE_SKILL,
  };

  expect(actions.storeSkills()).toEqual(expectedAction);
});

it("should create an action that loads an skill", () => {
  const expectedAction = {
    type: types.LOAD_SKILL,
  };

  expect(actions.loadSkills()).toEqual(expectedAction);
});

it("should create an action that switches the mode to edit skill mode", () => {
  const skill = {
    description: "skill description",
    intent: "skill intent ",
    actions: [
      {
        type: "response",
        action_id: "utter_new_response",
      },
      {
        type: "custom",
        action_id: "custom action",
      },
    ],
    skill_id: "id",
  };

  const expectedAction = {
    type: types.EDIT_MODE_SKILL,
    payload: { currentItem: skill },
  };

  expect(actions.switchToSkillEditMode(skill)).toEqual(expectedAction);
});

it("should create an action that switches the mode to add skill mode", () => {
  const expectedAction = {
    type: types.ADD_MODE_SKILL,
  };

  expect(actions.switchToSkillAddMode()).toEqual(expectedAction);
});
