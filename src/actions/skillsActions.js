import {
  ADD_SKILL,
  DELETE_SKILL,
  LOAD_SKILL,
  STORE_SKILL,
  UPDATE_SKILL,
  EDIT_MODE_SKILL,
  ADD_MODE_SKILL,
} from "./types";

export const addSkill = skill => ({
  type: ADD_SKILL,
  payload: { skill },
});

export const deleteSkill = id => ({
  type: DELETE_SKILL,
  payload: { id },
});

export const updateSkill = skill => ({
  type: UPDATE_SKILL,
  payload: { skill },
});
export const loadSkills = () => ({ type: LOAD_SKILL });

export const storeSkills = () => ({ type: STORE_SKILL });

export const switchToSkillEditMode = currentItem => {
  return {
    type: EDIT_MODE_SKILL,
    payload: { currentItem },
  };
};

export const switchToSkillAddMode = () => {
  return {
    type: ADD_MODE_SKILL,
  };
};
