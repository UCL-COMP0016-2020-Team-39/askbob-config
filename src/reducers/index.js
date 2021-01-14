import { combineReducers } from "redux";
import questionsReducer from "./questionsReducer";
import formReducer from "./formReducer";

const reducer = combineReducers({
  questions: questionsReducer,
  form: formReducer,
});

export default reducer;
