import React from "react";
import PropTypes from "prop-types";

import { IconButton } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteSkill } from "../../../actions/skillsActions";
import { switchToSkillEditMode } from "../../../actions/skillsActions";
import useStyles from "./styles";

const Skill = ({ id, description, intent, actions, ...skillProps }) => {
  const dispatch = useDispatch();

  const intents = useSelector(state => state.intents.items);
  const responses = useSelector(state => state.responses.items);

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteSkill(id));
  };

  const editThis = () => {
    dispatch(
      switchToSkillEditMode({ id, description, intent, actions, ...skillProps })
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
      <h2>Actions</h2>
      {actions.map((action, index) => {
        if (action.type === "response") {
          const responseData = responses.find(
            r => r.response_id === action.action_id
          );
          const responseName = responseData && responseData.name;
          return <h4 key={index}>{responseName}</h4>;
        }
        return <h4 key={index}>{action.action_id}</h4>;
      })}
    </div>
  );
};

Skill.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  intent: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object.isRequired),
};
export default Skill;
