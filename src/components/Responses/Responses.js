import React from "react";
import Response from "./Response/Response";
import { useSelector } from "react-redux";

const Responses = () => {
  const responses = useSelector(state => state.responses);

  if (responses.length === 0) {
    return <div className='card'>No Responses</div>;
  }

  return (
    <ul>
      {responses.map(response => {
        return (
          <li key={response.id}>
            <Response {...response} />
          </li>
        );
      })}
    </ul>
  );
};

export default Responses;
