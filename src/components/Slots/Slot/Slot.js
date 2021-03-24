import React from "react";
import PropTypes from "prop-types";

import { IconButton, Typography } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch } from "react-redux";

import {
  deleteSlot,
  switchToSlotEditMode,
} from "../../../actions/slotsActions";

import useStyles from "./styles";

const Slot = ({
  id,
  name,
  influence_conversation,
  type,
  min_value,
  max_value,
  values,
  ...slotProps
}) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteSlot(id));
  };

  const editThis = () => {
    dispatch(
      switchToSlotEditMode({
        id,
        name,
        influence_conversation,
        type,
        min_value,
        max_value,
        values,
        ...slotProps,
      })
    );
    setTimeout(() => {
      const target = document.getElementById("slot_target");
      if (target) {
        target.scrollIntoView();
      }
    }, 30);
  };

  return (
    <div className='card'>
      <header className={classes.header}>
        <Typography
          className={classes.title}
          variant='h5'
        >{`Slot: ${name}`}</Typography>
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
        Influence Conversation
      </Typography>
      <Typography className={classes.title} variant='body2'>
        {influence_conversation}
      </Typography>

      <Typography className={classes.title} variant='h6'>
        Type
      </Typography>

      <Typography className={classes.title} variant='body2'>
        {type}
      </Typography>

      {min_value !== undefined && (
        <>
          <Typography className={classes.title} variant='h6'>
            Min Value
          </Typography>
          <Typography className={classes.title} variant='h6'>
            {min_value}
          </Typography>
        </>
      )}
      {max_value !== undefined && (
        <>
          <Typography className={classes.title} variant='h6'>
            Max Value
          </Typography>
          <Typography className={classes.title} variant='h6'>
            {max_value}
          </Typography>
        </>
      )}
      {values !== undefined && (
        <>
          <Typography className={classes.title} variant='h6'>
            Values
          </Typography>

          {values.map((value, index) => (
            <Typography key={index} className={classes.title} variant='body2'>
              {value}
            </Typography>
          ))}
        </>
      )}
    </div>
  );
};

Slot.propTypes = {
  name: PropTypes.string.isRequired,
  influence_conversation: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  min_value: PropTypes.string,
  max_value: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
};
export default Slot;
