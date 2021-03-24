import React from "react";
import PropTypes from "prop-types";

import { IconButton, Typography } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteStory } from "../../../actions/storiesActions";
import { switchToStoryEditMode } from "../../../actions/storiesActions";
import useStyles from "./styles";

const Story = ({ id, description, steps, ...storyProps }) => {
  const dispatch = useDispatch();
  const intents = useSelector(state => state.intents.items);
  const responses = useSelector(state => state.responses.items);

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteStory(id));
  };

  const editThis = () => {
    dispatch(switchToStoryEditMode({ id, description, steps, ...storyProps }));
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
        <Typography variant='h5'> {description}</Typography>
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
      <Typography variant='h6'>Steps</Typography>
      {steps.map(step => {
        let data = intents.find(i => i.intent_id === step.step_id);
        data = data ?? responses.find(r => r.response_id === step.step_id);
        let name = data?.name ?? step.step_id;
        return (
          <div key={step.id}>
            <Typography variant='body2'>
              type: {step.type}, name: {name}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

Story.propTypes = {
  description: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      step_id: PropTypes.string.isRequired,
    })
  ),
};
export default Story;
