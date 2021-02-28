import React from "react";
import Item from "./Item/Item";

const Items = ({ items, itemName, deleteItem, switchToItemEditMode }) => {
  if (items.length === 0) {
    return <div className='card'>No Items</div>;
  }

  return (
    <ul>
      {items.map(item => {
        return (
          <li key={item.id}>
            <Item
              {...{ itemName, deleteItem, switchToItemEditMode }}
              {...item}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Items;
