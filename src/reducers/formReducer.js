import * as actionTypes from "../actions/types";

const initialState = {
  currentIntent: null,
  currentResponse: null,
  currentSkill: null,
  responseFormMode: actionTypes.RESPONSE_ADD_MODE,
  intentFormMode: actionTypes.INTENT_ADD_MODE,
  skillFormMode: actionTypes.SKILL_ADD_MODE,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INTENT_ADD_MODE:
      return {
        ...state,
        currentIntent: null,
        intentFormMode: actionTypes.INTENT_ADD_MODE,
      };
    case actionTypes.INTENT_EDIT_MODE:
      return {
        ...state,
        currentIntent: { ...action.payload.intent },
        intentFormMode: actionTypes.INTENT_EDIT_MODE,
      };
    case actionTypes.RESPONSE_ADD_MODE:
      return {
        ...state,
        currentResponse: null,
        responseFormMode: actionTypes.RESPONSE_ADD_MODE,
      };
    case actionTypes.RESPONSE_EDIT_MODE:
      return {
        ...state,
        currentResponse: { ...action.payload.response },
        responseFormMode: actionTypes.RESPONSE_EDIT_MODE,
      };
    case actionTypes.SKILL_ADD_MODE:
      return {
        ...state,
        currentSkill: null,
        skillFormMode: actionTypes.SKILL_ADD_MODE,
      };
    case actionTypes.SKILL_EDIT_MODE:
      return {
        ...state,
        currentSkill: { ...action.payload.skill },
        skillFormMode: actionTypes.SKILL_EDIT_MODE,
      };
    default:
      return state;
  }
};

export default reducer;
