import React from "react";
import { IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../../actions/questionsActions";
import useStyles from "./styles";

const Question = ({ id, name, variants }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const deleteThis = id => {
    dispatch(deleteQuestion(id));
  };

  return (
    <div className='card'>
      <header className={classes.header}>
        <h2> {name}</h2>
        <IconButton size='small' onClick={() => deleteThis(id)}>
          <Clear />
        </IconButton>
      </header>
      {variants.map(variant => (
        <div>{variant}</div>
      ))}
    </div>
  );
};

export default Question;
