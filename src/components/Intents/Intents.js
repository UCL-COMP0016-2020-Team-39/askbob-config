import React from "react";
import Intent from "./Intent/Intent";
import { useSelector } from "react-redux";

const Intents = () => {
  const intents = useSelector(state => state.intents);

  if (intents.length === 0) {
    return <div className='card'>No Intents</div>;
  }

  return (
    <ul>
      {intents.map(intent => {
        return (
          <li key={intent.id}>
            <Intent {...intent} />
          </li>
        );
      })}
    </ul>
  );
};

export default Intents;
