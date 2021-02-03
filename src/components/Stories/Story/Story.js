import React from "react";
import { IconButton } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deleteStory } from "../../../actions/storiesActions";
import { switchToStoryEditMode } from "../../../actions/formActions";
import useStyles from "./styles";

const Story = ({ id, description, steps }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const deleteThis = id => {
    dispatch(deleteStory(id));
  };

  const editThis = () => {
    console.log(JSON.stringify({ id, description, steps }));
    dispatch(switchToStoryEditMode({ id, description, steps }));
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
      <h2>Steps</h2>
      {steps.map(step => {
        return (
          <div key={step.id}>
            <p>
              type: {step.type}, name: {step.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Story;
