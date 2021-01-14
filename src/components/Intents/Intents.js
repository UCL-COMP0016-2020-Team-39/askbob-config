import React from "react";
import Intent from "./Intent/Intent";

const Intents = ({ intents }) => {
  return (
    <ul>
      {intents.map(item => {
        return <Intent key={item.id} {...item} />;
      })}
    </ul>
  );
};

export default Intents;
