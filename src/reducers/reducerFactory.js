import { v4 } from "uuid";

const createDatabaseWithNamedType = (databaseName = "") => {
  const localStorageKey = `askBobConfig${databaseName}`;
  const actionName = databaseName.toUpperCase();
  const initialState = {
    items: [],
    currentItem: null,
    mode: `ADD_MODE_${actionName}`,
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case `LOAD_${actionName}`:
        return JSON.parse(localStorage.getItem(localStorageKey)) || state;
      case `STORE_${actionName}`:
        localStorage.setItem(localStorageKey, JSON.stringify(state));
        return state;
      case `ADD_${actionName}`:
        return {
          ...state,

          items: [
            ...state.items,
            {
              ...action.payload[databaseName],
              id: v4(),
            },
          ],
        };
      case `DELETE_${actionName}`:
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      case `UPDATE_${actionName}`:
        return {
          ...state,
          items: state.items.map(item =>
            item.id !== action.payload[databaseName].id
              ? item
              : { ...item, ...action.payload[databaseName] }
          ),
        };
      case `EDIT_MODE_${actionName}`:
        return {
          ...state,
          mode: `EDIT_MODE_${actionName}`,
          currentItem: action.payload.currentItem,
        };
      case `ADD_MODE_${actionName}`:
        return {
          ...state,
          mode: `ADD_MODE_${actionName}`,
          currentItem: null,
        };
      default:
        return state;
    }
  };
  return reducer;
};

export default createDatabaseWithNamedType;
