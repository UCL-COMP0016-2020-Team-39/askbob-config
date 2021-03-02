import React from "react";
import Slot from "./Slot/Slot";
import { useSelector } from "react-redux";

const Slots = () => {
  const { items: slots } = useSelector(state => state.slots);
  if (slots.length === 0) {
    return <div className='card'>No Slots</div>;
  }

  return (
    <ul>
      {slots.map(slot => {
        return (
          <li key={slot.id}>
            <Slot {...slot} />
          </li>
        );
      })}
    </ul>
  );
};

export default Slots;
