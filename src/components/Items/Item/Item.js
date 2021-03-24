import React from "react";
import PropTypes from "prop-types";
import { IconButton, Typography } from "@material-ui/core";
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
        <Typography className={classes.title} variant='h5'>
          {`${itemName}: ${name}`}
        </Typography>
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
      <Typography className={classes.title} variant='h6'>
        Examples
      </Typography>
      {examples.map((example, index) => (
        <Typography key={index} className={classes.title} variant='body2'>
          {example}
        </Typography>
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
