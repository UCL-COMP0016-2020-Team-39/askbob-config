import React from "react";
import PropTypes from "prop-types";

import { IconButton } from "@material-ui/core";
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
        <h2 className={classes.title}>{`Slot: ${name}`}</h2>
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
      <h4>Influence Conversation: {influence_conversation} </h4>
      <h4>Type: {type}</h4>
      {min_value !== undefined && (
        <>
          <h4>Min Value</h4>
          <p>{min_value}</p>
        </>
      )}
      {max_value !== undefined && (
        <>
          <h4>Max Value</h4>
          <p>{max_value}</p>
        </>
      )}
      {values !== undefined && (
        <>
          <h4>Values</h4>
          {values.map((value, index) => (
            <p key={index}>{value}</p>
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
