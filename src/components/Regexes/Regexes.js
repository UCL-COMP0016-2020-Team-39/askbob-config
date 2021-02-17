import React from "react";
import Regex from "./Regex/Regex";
import { useSelector } from "react-redux";

const Regexes = () => {
  const regexes = useSelector(state => state.regexes.items);

  if (regexes.length === 0) {
    return <div className='card'>No Regexes</div>;
  }

  return (
    <ul>
      {regexes.map(regex => {
        return (
          <li key={regex.id}>
            <Regex {...regex} />
          </li>
        );
      })}
    </ul>
  );
};

export default Regexes;
