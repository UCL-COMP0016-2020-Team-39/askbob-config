import React from "react";
import PropTypes from "prop-types";

import { IconButton, Typography } from "@material-ui/core";
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
        <Typography variant='h6' className={classes.title}>
          Skill: {description}
        </Typography>
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

      <Typography variant='h6' className={classes.title}>
        Intent
      </Typography>
      <Typography variant='body2' className={classes.title}>
        {intentName}
      </Typography>
      <Typography variant='h6' className={classes.title}>
        Actions
      </Typography>
      {actions.map((action, index) => {
        if (action.type === "response") {
          const responseData = responses.find(
            r => r.response_id === action.action_id
          );
          const responseName = responseData && responseData.name;
          return (
            <Typography variant='body2' className={classes.title} key={index}>
              {responseName}
            </Typography>
          );
        }
        return (
          <Typography variant='body2' className={classes.title} key={index}>
            {action.action_id}
          </Typography>
        );
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
