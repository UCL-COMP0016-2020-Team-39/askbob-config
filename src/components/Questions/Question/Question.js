import React from "react";
import { IconButton } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../../actions/questionsActions";
import { switchToQuestionEditMode } from "../../../actions/formActions";
import useStyles from "./styles";

const Question = ({ id, name, variants }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteQuestion(id));
  };

  const editThis = () => {
    dispatch(switchToQuestionEditMode({ id, name, variants }));
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
          <IconButton size='small' onClick={() => deleteThis(id)}>
            <Clear />
          </IconButton>
          <IconButton size='small' onClick={() => editThis(id)}>
            <Edit />
          </IconButton>
        </div>
      </header>
      {variants.map((variant, index) => (
        <div key={index}>{variant}</div>
      ))}
    </div>
  );
};

export default Question;
