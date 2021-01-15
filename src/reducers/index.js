import { combineReducers } from "redux";
import questionsReducer from "./questionsReducer";
import responsesReducer from "./responsesReducer";
import formReducer from "./formReducer";

const reducer = combineReducers({
  questions: questionsReducer,
  responses: responsesReducer,
  form: formReducer,
});

export default reducer;
