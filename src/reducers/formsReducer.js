import * as actionTypes from "../actions/types";
import { v4 } from "uuid";

const initialState = [];

const localStorageKey = "askBobConfigForms";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_FORMS:
      return JSON.parse(localStorage.getItem(localStorageKey)) || [];
    case actionTypes.STORE_FORMS:
      localStorage.setItem(localStorageKey, JSON.stringify(state));
      return state;
    case actionTypes.ADD_FORM:
      return [
        ...state,
        {
          ...action.payload.form,
          id: v4(),
        },
      ];
    case actionTypes.DELETE_FORM:
      return state.filter(form => form.id !== action.payload.id);
    case actionTypes.UPDATE_FORM:
      return state.map(form =>
        form.id !== action.payload.form.id
          ? form
          : { ...form, ...action.payload.form }
      );
    default:
      return state;
  }
};

export default reducer;
