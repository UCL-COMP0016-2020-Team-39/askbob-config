import * as actionTypes from "../actions/types";
import { v4 } from "uuid";

const createDatabaseWithNamedType = (databaseName = "") => {
  const localStorageKey = `askBobConfig${databaseName}`;
  const initialState = [];

  const reducer = (state = initialState, action) => {
    console.log("the state is", state, "the action is", action);
    const actionName = databaseName.toUpperCase();
    switch (action.type) {
      case actionTypes[`LOAD_${actionName}`]:
        return JSON.parse(localStorage.getItem(localStorageKey)) || [];
      case actionTypes[`STORE_${actionName}`]:
        localStorage.setItem(localStorageKey, JSON.stringify(state));
        return state;
      case actionTypes[`ADD_${actionName}`]:
        console.log("adding", action);
        return [
          ...state,
          {
            ...action.payload[databaseName],
            id: v4(),
          },
        ];
      case actionTypes[`DELETE_${actionName}`]:
        return state.filter(item => item.id !== action.payload.id);
      case actionTypes[`UPDATE_${actionName}`]:
        return state.map(item =>
          item.id !== action.payload[databaseName].id
            ? item
            : { ...item, ...action.payload[databaseName] }
        );
      default:
        return state;
    }
  };
  return reducer;
};

export default createDatabaseWithNamedType;
