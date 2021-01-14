import React from "react";

const Question = ({ name, variants }) => {
  return (
    <div className='card'>
      <h2> {name}</h2>
      <p>{variants.join("\n")}</p>
    </div>
  );
};

export default Question;
