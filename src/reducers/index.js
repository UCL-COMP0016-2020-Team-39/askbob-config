import { combineReducers } from "redux";
import intentsReducer from "./intentsReducer";

const reducer = combineReducers({ intents: intentsReducer });

export default reducer;
