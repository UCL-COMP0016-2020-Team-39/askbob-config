import React from "react";
import { IconButton } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteForm } from "../../../actions/formsActions";
import { switchToFormEditMode } from "../../../actions/formModeActions";
import useStyles from "./styles";

const Form = ({ id, description, intent, actions, ...formProps }) => {
  const dispatch = useDispatch();

  const intents = useSelector(state => state.intents);
  const responses = useSelector(state => state.responses);

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteForm(id));
  };

  const editThis = () => {
    dispatch(
      switchToFormEditMode({ id, description, intent, actions, ...formProps })
    );
    setTimeout(() => {
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
      });
    }, 30);
  };

  const intentData = intents.find(i => i.intent_id === intent);
  const intentName = intentData && intentData.name;

  return (
    <div className='card'>
      <header className={classes.header}>
        <h2> {description}</h2>
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
      <h2>intent</h2>
      <h4>{intentName}</h4>
      <h2>responses</h2>
      {actions.map((response, index) => {
        const responseData = responses.find(r => r.response_id === response);
        const responseName = responseData && responseData.name;
        return <h4 key={index}>{responseName}</h4>;
      })}
    </div>
  );
};

export default Form;
