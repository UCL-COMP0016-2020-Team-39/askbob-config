import {
  ADD_STORY,
  DELETE_STORY,
  LOAD_STORY,
  STORE_STORY,
  UPDATE_STORY,
} from "./types";

export const addStory = story => ({
  type: ADD_STORY,
  payload: { story },
});

export const deleteStory = id => ({
  type: DELETE_STORY,
  payload: { id },
});

export const updateStory = story => ({
  type: UPDATE_STORY,
  payload: { story },
});
export const loadStories = () => ({ type: LOAD_STORY });

export const storeStories = () => ({ type: STORE_STORY });
