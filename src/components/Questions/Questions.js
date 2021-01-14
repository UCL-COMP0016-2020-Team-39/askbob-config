import React, { useEffect } from "react";
import Question from "./Question/Question";
import { useSelector, useDispatch } from "react-redux";
import { loadQuestions, storeQuestions } from "../../actions/questionsActions";
const Questions = () => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questions);

  useEffect(() => {
    dispatch(loadQuestions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(storeQuestions());
  }, [dispatch, questions]);

  if (questions.length === 0) {
    return <div className='card'>No Questions</div>;
  }

  return (
    <ul>
      {questions.map(question => {
        return (
          <li key={question.id}>
            <Question {...question} />
          </li>
        );
      })}
    </ul>
  );
};

export default Questions;
