import React from "react";
import Intent from "./Item/Intent";
import { useSelector } from "react-redux";

const Items = () => {
  const items = useSelector(state => state.items);

  if (items.length === 0) {
    return <div className='card'>No Items</div>;
  }

  return (
    <ul>
      {items.map(intent => {
        return (
          <li key={intent.id}>
            <Intent {...intent} />
          </li>
        );
      })}
    </ul>
  );
};

export default Items;
