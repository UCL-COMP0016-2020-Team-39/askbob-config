import { combineReducers } from "redux";
import intentsReducer from "./intentsReducer";
import responsesReducer from "./responsesReducer";
import skillsReducer from "./skillsReducer";
import storiesReducer from "./storiesReducer";
import formModeReducer from "./formModeReducer";

const reducer = combineReducers({
  intents: intentsReducer,
  responses: responsesReducer,
  formMode: formModeReducer,
  skills: skillsReducer,
  stories: storiesReducer,
});

export default reducer;
