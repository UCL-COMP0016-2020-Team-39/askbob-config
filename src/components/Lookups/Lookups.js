import React from "react";
import Lookup from "./Lookup/Lookup";
import { useSelector } from "react-redux";

const Lookups = () => {
  const lookups = useSelector(state => state.lookups.items);

  if (lookups.length === 0) {
    return <div className='card'>No Lookups</div>;
  }

  return (
    <ul>
      {lookups.map(lookup => {
        return (
          <li key={lookup.id}>
            <Lookup {...lookup} />
          </li>
        );
      })}
    </ul>
  );
};

export default Lookups;
