import * as actionTypes from "./types";

export const switchToQuestionEditMode = question => {
  return {
    type: actionTypes.QUESTION_EDIT_MODE,
    payload: { question },
  };
};

export const switchToQuestionAddMode = () => {
  return {
    type: actionTypes.QUESTION_ADD_MODE,
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
