import React from "react";
import { IconButton } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deleteRegex } from "../../../actions/regexesActions";
import { switchToRegexEditMode } from "../../../actions/regexesActions";
import useStyles from "./styles";

const Regex = ({ id, name, examples, ...regexProps }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteRegex(id));
  };

  const editThis = () => {
    dispatch(switchToRegexEditMode({ id, name, examples, ...regexProps }));
    setTimeout(() => {
      const target = document.getElementById("regex_target");
      if (target) {
        target.scrollIntoView();
      }
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

export default Regex;
