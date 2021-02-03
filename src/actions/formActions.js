import * as actionTypes from "./types";

export const switchToIntentEditMode = intent => {
  return {
    type: actionTypes.INTENT_EDIT_MODE,
    payload: { intent },
  };
};

export const switchToIntentAddMode = () => {
  return {
    type: actionTypes.INTENT_ADD_MODE,
  };
};

export const switchToResponseEditMode = response => {
  return {
    type: actionTypes.RESPONSE_EDIT_MODE,
    payload: { response },
  };
};

export const switchToResponseAddMode = () => {
  return {
    type: actionTypes.RESPONSE_ADD_MODE,
  };
};

export const switchToSkillEditMode = skill => {
  return {
    type: actionTypes.SKILL_EDIT_MODE,
    payload: { skill },
  };
};

export const switchToSkillAddMode = () => {
  return {
    type: actionTypes.SKILL_ADD_MODE,
  };
};

export const switchToStoryEditMode = story => {
  return {
    type: actionTypes.STORY_EDIT_MODE,
    payload: { story },
  };
};

export const switchToStoryAddMode = () => {
  return {
    type: actionTypes.STORY_ADD_MODE,
  };
};
