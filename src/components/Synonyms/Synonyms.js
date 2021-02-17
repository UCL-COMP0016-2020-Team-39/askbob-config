import React from "react";
import Synonym from "./Synonym/Synonym";
import { useSelector } from "react-redux";

const Synonyms = () => {
  const synonyms = useSelector(state => state.synonyms.items);

  if (synonyms.length === 0) {
    return <div className='card'>No Synonyms</div>;
  }

  return (
    <ul>
      {synonyms.map(synonym => {
        return (
          <li key={synonym.id}>
            <Synonym {...synonym} />
          </li>
        );
      })}
    </ul>
  );
};

export default Synonyms;
