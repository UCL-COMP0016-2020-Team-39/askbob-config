import { combineReducers } from "redux";
import questionsReducer from "./questionsReducer";

const reducer = combineReducers({ questions: questionsReducer });

export default reducer;
