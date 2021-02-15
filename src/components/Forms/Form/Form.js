import React from "react";
import { IconButton } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteForm } from "../../../actions/formsActions";
import { switchToFormEditMode } from "../../../actions/formModeActions";
import useStyles from "./styles";

const Form = ({
  id,
  description,
  activateIntent,
  deactivateIntent,
  questions,

  ...formProps
}) => {
  const dispatch = useDispatch();

  const intents = useSelector(state => state.intents);
  const responses = useSelector(state => state.responses);

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteForm(id));
  };

  const editThis = () => {
    dispatch(
      switchToFormEditMode({
        id,
        description,
        activateIntent,
        deactivateIntent,
        questions,
        ...formProps,
      })
    );
    setTimeout(() => {
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
      });
    }, 30);
  };

  const activateIntentData = intents.find(i => i.intent_id === activateIntent);
  const activateIntentName = activateIntentData && activateIntentData.name;

  const deactivateIntentData = intents.find(
    i => i.intent_id === deactivateIntent
  );
  const deactivateIntentName =
    deactivateIntentData && deactivateIntentData.name;

  return (
    <div className={`card ${classes.form}`}>
      <header className={classes.header}>
        <h3> {description}</h3>
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
      <h3>activate intent</h3>
      <h4>{activateIntentName}</h4>

      <h3>deactivate intent</h3>
      <h4>{deactivateIntentName}</h4>
      {/*
  question: "",
  type: "",
  slot: "",
  entity: "",
  role: "",
  group: "",
  intent: "",
  not_intent: "",
  
  */}
      <h3>Questions</h3>
      {questions.map((q, index) => {
        const {
          question,
          type,
          slot,
          entity,
          role,
          group,
          intent,
          not_intent,
        } = q;
        const intentData = intents.find(i => i.intent_id === intent);
        const intentName = intentData && intentData.name;
        const notIntentData = intents.find(i => i.intent_id === not_intent);
        const notIntentName = notIntentData && notIntentData.name;
        return (
          <div key={index}>
            <h3>Question</h3>
            <h4>{question}</h4>
            <h3>Type</h3>
            <h4>{type}</h4>
            <h3>Slot</h3>
            <h4>{slot}</h4>
            <h3>Entity</h3>
            <h4>{entity}</h4>
            <h3>Role</h3>
            <h4>{role}</h4>
            <h3>Group</h3>
            <h4>{group}</h4>
            <h3>Intent</h3>
            <h4>{intent === "None" ? "None" : intentName}</h4>
            <h3>Not Intent</h3>
            <h4>{not_intent === "None" ? "None" : notIntentName}</h4>
            <br />
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Form;
