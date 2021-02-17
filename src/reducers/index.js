import { combineReducers } from "redux";
import createReducer from "./reducerFactory";

const reducer = combineReducers({
  intents: createReducer("intent"),
  responses: createReducer("response"),
  skills: createReducer("skill"),
  stories: createReducer("story"),
  forms: createReducer("form"),
});

export default reducer;
