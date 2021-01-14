import React from "react";
import { Intents } from "../../components";

import { v4 } from "uuid";

const staticIntents = [
  {
    id: v4(),
    name: "Eggs",
  },
  {
    id: v4(),
    name: "Bread",
  },
  {
    id: v4(),
    name: "Milk",
  },
  {
    id: v4(),
    name: "Butter",
  },
];

const Home = () => {
  return (
    <div>
      <Intents intents={staticIntents} />
    </div>
  );
};

export default Home;
