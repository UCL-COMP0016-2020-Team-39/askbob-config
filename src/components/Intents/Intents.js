import React from "react";
import Intent from "./Intent/Intent";
import { useSelector, useDispatch } from "react-redux";

const Intents = () => {
  const intents = useSelector(state => state.intents);
  return (
    <ul>
      {intents.map(item => {
        return <Intent key={item.id} {...item} />;
      })}
    </ul>
  );
};

export default Intents;
