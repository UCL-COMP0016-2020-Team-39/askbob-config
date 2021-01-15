import React from "react";
import Question from "./Question/Question";
import { useSelector } from "react-redux";

const Questions = () => {
  const questions = useSelector(state => state.questions);

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
