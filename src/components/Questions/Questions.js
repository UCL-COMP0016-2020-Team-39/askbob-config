import React from "react";
import Question from "./Question/Question";
import { useSelector, useDispatch } from "react-redux";

const Questions = () => {
  const questions = useSelector(state => state.questions);

  if (questions.length === 0) {
    return <div className='card'>No Questions</div>;
  }

  return (
    <ul>
      {questions.map(question => {
        return <Question key={question.id} {...question} />;
      })}
    </ul>
  );
};

export default Questions;
