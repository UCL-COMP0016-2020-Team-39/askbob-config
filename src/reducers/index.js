import { combineReducers } from "redux";
import createReducer from "./reducerFactory";

const reducer = combineReducers({
  intents: createReducer("intent"),
  synonyms: createReducer("synonym"),
  regexes: createReducer("regex"),
  lookups: createReducer("lookup"),
  responses: createReducer("response"),
  skills: createReducer("skill"),
  stories: createReducer("story"),
  forms: createReducer("form"),
});

export default reducer;
