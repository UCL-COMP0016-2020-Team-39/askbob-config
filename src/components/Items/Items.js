import React from "react";
import Item from "./Item/Item";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Items = ({ items }) => {
  return (
    <ul>
      {items.map(item => {
        return <Item key={item.id} {...item} />;
      })}
    </ul>
  );
};

export default Items;
