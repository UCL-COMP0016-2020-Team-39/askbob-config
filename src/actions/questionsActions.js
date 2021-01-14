import { ADD_QUESTION, DELETE_QUESTION } from "./types";
export const addQuestion = question => ({
  type: ADD_QUESTION,
  payload: { question },
});

export const deleteQuestion = id => ({
  type: DELETE_QUESTION,
  payload: { id },
});
