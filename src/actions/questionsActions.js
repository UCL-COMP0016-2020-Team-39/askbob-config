import { ADD_QUESTION } from "./types";
export const addQuestion = question => {
  return { type: ADD_QUESTION, payload: { question } };
};
