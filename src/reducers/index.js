import { combineReducers } from "redux";
import intentsReducer from "./intentsReducer";
import responsesReducer from "./responsesReducer";
import skillsReducer from "./skillsReducer";
import formReducer from "./formReducer";

const reducer = combineReducers({
  intents: intentsReducer,
  responses: responsesReducer,
  form: formReducer,
  skills: skillsReducer,
});

export default reducer;
