import { combineReducers } from "redux";
import formModeReducer from "./formModeReducer";
import createReducer from "./reducerFactory";

const reducer = combineReducers({
  intents: createReducer("intent"),
  responses: createReducer("response"),
  skills: createReducer("skill"),
  stories: createReducer("story"),
  forms: createReducer("form"),
  formMode: formModeReducer,
});

export default reducer;
