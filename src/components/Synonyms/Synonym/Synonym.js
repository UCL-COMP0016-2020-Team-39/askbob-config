import React from "react";
import { IconButton } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deleteSynonym } from "../../../actions/synonymsActions";
import { switchToSynonymEditMode } from "../../../actions/synonymsActions";
import useStyles from "./styles";

const Synonym = ({ id, name, examples, ...synonymProps }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteSynonym(id));
  };

  const editThis = () => {
    dispatch(switchToSynonymEditMode({ id, name, examples, ...synonymProps }));
    setTimeout(() => {
      const target = document.getElementById("synonym_target");
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

export default Synonym;
