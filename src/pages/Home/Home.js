import React from "react";
import { Items } from "../../components";

import { v4 } from "uuid";

const staticItems = [
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
      <Items items={staticItems} />
    </div>
  );
};

export default Home;
