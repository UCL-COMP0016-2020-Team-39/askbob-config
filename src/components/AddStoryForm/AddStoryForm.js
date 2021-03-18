import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStory,
  updateStory,
  switchToStoryAddMode,
} from "../../actions/storiesActions";
import { EDIT_MODE_STORY } from "../../actions/types";

import {
  Button,
  IconButton,
  Select,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { Clear, OpenWith } from "@material-ui/icons";
import useStyles from "./styles";

import { ReactSortable } from "react-sortablejs";
import { v4 } from "uuid";

import { nameToId, validateStory } from "../../utils";

const AddStory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([
    { id: v4(), type: "intent", step_id: "" },
  ]);
  const [errorText, setErrorText] = useState("error");

  const { currentItem, mode, items: stories } = useSelector(
    state => state.stories
  );

  const intents = useSelector(state => state.intents.items);
  const responses = useSelector(state => state.responses.items);

  useEffect(() => {
    if (mode === EDIT_MODE_STORY) {
      setDescription(currentItem.description);
      setSteps(currentItem.steps);
    }
  }, [mode, currentItem]);

  useEffect(() => {
    const storyDescriptions = stories.map(story => story.description);
    const errors = validateStory(
      { description, steps },
      storyDescriptions,
      mode,
      EDIT_MODE_STORY
    );
    if (Object.values(errors).length > 0) {
      setErrorText(Object.values(errors)[0]);
    } else {
      setErrorText("");
    }
  }, [description, steps, mode, stories]);

  const handleSubmit = e => {
    e.preventDefault();
    const storyDescriptions = stories.map(story => story.description);

    const errors = validateStory(
      { description, steps },
      storyDescriptions,
      mode,
      EDIT_MODE_STORY
    );

    if (Object.values(errors).length > 0) {
      setErrorText(Object.values(errors)[0]);
      return;
    }

    setErrorText("");

    const story_id = nameToId(description);

    const storySteps = steps.map(step => ({
      id: step.id,
      type: step.type,
      step_id: step.step_id,
    }));

    if (mode === EDIT_MODE_STORY) {
      dispatch(
        updateStory({
          description,
          story_id: currentItem.story_id,
          steps: storySteps,
          id: currentItem.id,
        })
      );
      dispatch(switchToStoryAddMode());
    } else {
      dispatch(addStory({ description, story_id, steps: storySteps }));
    }
    setSteps([{ id: v4(), type: "intent", step_id: "" }]);
    setDescription("");
  };

  return (
    <section className='card'>
      <h2>{mode === EDIT_MODE_STORY ? "Edit Story" : "Add Story"}</h2>
      <form className={classes.root} onSubmit={e => handleSubmit(e)}>
        <p className={classes.errorText}>{errorText}</p>
        <label htmlFor='description'>Description</label>
        <TextField
          name='description'
          id='description'
          placeholder='description'
          value={description}
          className={classes.description}
          onChange={e => {
            setDescription(e.target.value);
          }}
        />

        <label htmlFor='response'>Steps</label>

        <ReactSortable list={steps} setList={setSteps} animation={150}>
          {steps.map((step, index) => {
            let options = step.type === "intent" ? intents : responses;
            return (
              <div className={classes.formGroup} key={step.id}>
                <span className={classes.handle}>
                  <OpenWith />
                </span>
                <div className={classes.selectGroup}>
                  <Select
                    className={classes.storyType}
                    value={step.type}
                    onChange={e => {
                      setSteps(prev =>
                        prev.map(p => {
                          if (p.id === step.id) {
                            return {
                              ...p,
                              type: e.target.value,
                              step_id: "",
                            };
                          }
                          return p;
                        })
                      );
                    }}
                  >
                    <MenuItem value='intent'>intent</MenuItem>
                    <MenuItem value='response'>response</MenuItem>
                    <MenuItem value='custom'>custom</MenuItem>
                  </Select>
                  {step.type === "custom" ? (
                    <TextField
                      placeholder='Add name of custom action'
                      value={step.step_id}
                      onChange={e => {
                        setSteps(prev =>
                          prev.map(p => {
                            if (p.id === step.id) {
                              return {
                                ...p,
                                step_id: e.target.value,
                              };
                            } else {
                              return p;
                            }
                          })
                        );
                      }}
                    />
                  ) : (
                    <Select
                      value={step.step_id}
                      className={classes.storyName}
                      onChange={e => {
                        setSteps(prev =>
                          prev.map(p => {
                            if (p.id === step.id) {
                              return {
                                ...p,
                                step_id: e.target.value,
                              };
                            }
                            return p;
                          })
                        );
                      }}
                    >
                      {options.map(option => {
                        const id =
                          step.type === "intent"
                            ? option.intent_id
                            : option.response_id;
                        return (
                          <MenuItem key={id} value={id}>
                            {option.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                </div>
                <IconButton
                  onClick={() => {
                    if (steps.length > 1) {
                      setSteps(prev => prev.filter(s => s.id !== step.id));
                    }
                  }}
                  aria-label='delete'
                >
                  <Clear />
                </IconButton>
              </div>
            );
          })}
        </ReactSortable>
        <Button
          className={classes.addVarBtn}
          onClick={() => {
            setSteps(prev => [
              ...prev,
              { id: v4(), type: "intent", step_id: "" },
            ]);
          }}
          aria-label='add steps'
        >
          Add step
        </Button>
        <div>
          <Button
            type='submit'
            aria-label={mode === EDIT_MODE_STORY ? "Edit Story" : "Add Story"}
            className={
              mode === EDIT_MODE_STORY ? classes.editBtn : classes.addBtn
            }
          >
            {mode === EDIT_MODE_STORY ? "Edit Story" : "Add Story"}
          </Button>
        </div>
        <br />
        <br />
        <pre>{JSON.stringify(steps, null, 2)}</pre>
      </form>
    </section>
  );
};

export default AddStory;
