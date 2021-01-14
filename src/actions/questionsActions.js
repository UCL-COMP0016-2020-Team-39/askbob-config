import {
  ADD_QUESTION,
  DELETE_QUESTION,
  LOAD_QUESTIONS,
  STORE_QUESTIONS,
  UPDATE_QUESTION,
} from "./types";

export const addQuestion = question => ({
  type: ADD_QUESTION,
  payload: { question },
});

export const deleteQuestion = id => ({
  type: DELETE_QUESTION,
  payload: { id },
});

export const updateQuestion = question => ({
  type: UPDATE_QUESTION,
  payload: { question },
});
export const loadQuestions = () => ({ type: LOAD_QUESTIONS });

export const storeQuestions = () => ({ type: STORE_QUESTIONS });
