import React from "react";
import PropTypes from "prop-types";

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

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      examples: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    })
  ),
  itemName: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
  switchToItemEditMode: PropTypes.func.isRequired,
};

export default Items;
