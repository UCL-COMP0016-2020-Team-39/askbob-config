import React from "react";
import { IconButton } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deleteIntent } from "../../../actions/intentsActions";
import { switchToIntentEditMode } from "../../../actions/formModeActions";
import useStyles from "./styles";

const Intent = ({ id, name, examples, ...intentProps }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteIntent(id));
  };

  const editThis = () => {
    dispatch(switchToIntentEditMode({ id, name, examples, ...intentProps }));
    setTimeout(() => {
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
      });
    }, 30);
  };

  return (
    <div className='card'>
      <header className={classes.header}>
        <h2> {name}</h2>
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
      {examples.map((example, index) => (
        <div key={index}>{example}</div>
      ))}
    </div>
  );
};

export default Intent;