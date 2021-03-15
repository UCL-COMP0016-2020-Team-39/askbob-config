import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import useStyles from "./styles";

const Item = ({
  id,
  itemName,
  name,
  examples,
  deleteItem,
  switchToItemEditMode,
  ...itemProps
}) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteItem(id));
  };

  const editThis = () => {
    dispatch(switchToItemEditMode({ id, name, examples, ...itemProps }));
    setTimeout(() => {
      const target = document.getElementById(`${itemName}_target`);
      if (target) {
        target.scrollIntoView();
      }
    }, 30);
  };

  return (
    <div className='card'>
      <header className={classes.header}>
        <h2 className={classes.title}>{`${itemName}: ${name}`}</h2>
        <div className={classes.buttons}>
          <IconButton
            size='small'
            aria-label='delete'
            onClick={() => deleteThis(id)}
          >
            <Clear />
          </IconButton>
          <IconButton
            size='small'
            aria-label='edit'
            onClick={() => editThis(id)}
          >
            <Edit />
          </IconButton>
        </div>
      </header>
      <h4>Examples</h4>
      {examples.map((example, index) => (
        <p key={index}>{example}</p>
      ))}
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  examples: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  deleteItem: PropTypes.func.isRequired,
  switchToItemEditMode: PropTypes.func.isRequired,
};
export default Item;
