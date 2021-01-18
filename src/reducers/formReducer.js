import * as actionTypes from "../actions/types";

const initialState = {
  currentQuestion: null,
  currentResponse: null,
  currentSkill: null,
  responseFormMode: actionTypes.RESPONSE_ADD_MODE,
  questionFormMode: actionTypes.QUESTION_ADD_MODE,
  skillFormMode: actionTypes.SKILL_ADD_MODE,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUESTION_ADD_MODE:
      return {
        ...state,
        currentQuestion: null,
        questionFormMode: actionTypes.QUESTION_ADD_MODE,
      };
    case actionTypes.QUESTION_EDIT_MODE:
      return {
        ...state,
        currentQuestion: { ...action.payload.question },
        questionFormMode: actionTypes.QUESTION_EDIT_MODE,
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
