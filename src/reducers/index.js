import { combineReducers } from "redux";
import intentsReducer from "./intentsReducer";
import responsesReducer from "./responsesReducer";
import skillsReducer from "./skillsReducer";
import storiesReducer from "./storiesReducer";
import formReducer from "./formReducer";

const reducer = combineReducers({
  intents: intentsReducer,
  responses: responsesReducer,
  form: formReducer,
  skills: skillsReducer,
  stories: storiesReducer,
});

export default reducer;
