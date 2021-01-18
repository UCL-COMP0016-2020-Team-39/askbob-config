import {
  ADD_SKILL,
  DELETE_SKILL,
  LOAD_SKILLS,
  STORE_SKILLS,
  UPDATE_SKILL,
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
export const loadSkills = () => ({ type: LOAD_SKILLS });

export const storeSkills = () => ({ type: STORE_SKILLS });
