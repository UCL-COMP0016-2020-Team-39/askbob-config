import { combineReducers } from "redux";
import questionsReducer from "./questionsReducer";
import responsesReducer from "./responsesReducer";
import skillsReducer from "./skillsReducer";
import formReducer from "./formReducer";

const reducer = combineReducers({
  questions: questionsReducer,
  responses: responsesReducer,
  form: formReducer,
  skills: skillsReducer,
});

export default reducer;
