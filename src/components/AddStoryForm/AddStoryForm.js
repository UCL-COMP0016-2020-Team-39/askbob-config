import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStory, updateStory } from "../../actions/storiesActions";
import { switchToStoryAddMode } from "../../actions/formActions";
import { STORY_EDIT_MODE } from "../../actions/types";

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

import { nameToId } from "../../utils";

const AddStory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([
    { id: v4(), type: "intent", step_id: "" },
  ]);
  const [errorText, setErrorText] = useState("error");

  const { currentStory, storyFormMode: mode } = useSelector(
    state => state.form
  );

  const intents = useSelector(state => state.intents);
  const responses = useSelector(state => state.responses);

  useEffect(() => {
    if (mode === STORY_EDIT_MODE) {
      setDescription(currentStory.description);
      setSteps(currentStory.steps);
    }
  }, [mode, currentStory]);

  const validate = useCallback(() => {
    const errors = { description: "", steps: [""] };
    const maxStringLength = 80;

    if (!description || !description.trim()) {
      errors.description = "description is required";
    } else if (description.length > maxStringLength) {
      errors.description = "description is too long";
    } else if (!description.match(/^[0-9a-zA-Z ]+$/)) {
      errors.description = "description can only contain numbers and letters";
    }

    steps.forEach((step, index) => {
      if (!step.step_id) {
        errors[index] = `step ${index} requires an id`;
      }
      if (!step.type) {
        errors[index] = `step ${index} requires a type`;
      }
    });

    if (steps[0].type !== "intent") {
      errors.steps[0] = "story must start with an intent";
    }

    if (steps.length > 0 && steps[steps.length - 1].type === "intent") {
      errors.steps[0] = "story must not end with an intent";
    }

    if (errors.description === "") {
      delete errors.description;
    }

    if (errors.steps[0] === "" && errors.steps.length === 1) {
      delete errors.steps;
    }

    if (errors) {
      setErrorText(Object.values(errors)[0]);
    }

    return errors;
  }, [description, steps]);

  useEffect(() => {
    const errors = validate();
    if (Object.values(errors).length > 0) {
      setErrorText(Object.values(errors)[0]);
    }
  }, [description, steps, validate]);

  const handleSubmit = e => {
    e.preventDefault();

    const errors = validate();
    if (Object.values(errors).length > 0) {
      setErrorText(Object.values(errors)[0]);
      return;
    }

    setErrorText("");

    const story_id = nameToId(description);
    console.log(story_id);

    const storySteps = steps.map(step => ({
      id: step.id,
      type: step.type,
      data: step.data,
      step_id: step.step_id,
    }));

    if (mode === STORY_EDIT_MODE) {
      dispatch(
        updateStory({
          description,
          story_id: currentStory.story_id,
          steps: storySteps,
          id: currentStory.id,
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
      <h2>{mode === STORY_EDIT_MODE ? "Edit Story" : "Add Story"}</h2>
      <form className={classes.root} onSubmit={e => handleSubmit(e)}>
        <p className={classes.errorText}>{errorText}</p>
        <label htmlFor='description'>Description</label>
        <div className={classes.formGroup}>
          <TextField
            name='description'
            id='description'
            placeholder='description'
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </div>

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
                  </Select>
                  <Select
                    value={step.data}
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
            setSteps(prev => [...prev, { id: v4(), type: "intent", name: "" }]);
          }}
          aria-label='add steps'
        >
          Add step
        </Button>
        <div>
          <Button
            type='submit'
            aria-label={mode === STORY_EDIT_MODE ? "Edit Story" : "Add Story"}
            className={
              mode === STORY_EDIT_MODE ? classes.editBtn : classes.addBtn
            }
          >
            {mode === STORY_EDIT_MODE ? "Edit Story" : "Add Story"}
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
