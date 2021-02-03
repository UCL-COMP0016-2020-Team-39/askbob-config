import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStory, updateStory } from "../../actions/storiesActions";
import { switchToStoryAddMode } from "../../actions/formActions";
import { STORY_EDIT_MODE } from "../../actions/types";

import { Formik, Form, FieldArray } from "formik";
import { Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import useStyles from "./styles";
import { FormSelect, FormTextField } from "../";

const AddStory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [intent, setIntent] = useState("");
  const [, setResponse] = useState("");
  const [actions, setActions] = useState([""]);

  const { currentStory, storyFormMode: mode } = useSelector(
    state => state.form
  );

  const intents = useSelector(state => state.intents);
  const responses = useSelector(state => state.responses);
  const stories = useSelector(state => state.stories);

  const storiesDescriptions = stories.map(story => story.description);

  useEffect(() => {
    if (mode === STORY_EDIT_MODE) {
      setDescription(currentStory.description);
      setIntent(currentStory.intent);
      setActions(currentStory.actions);
    }
  }, [mode, currentStory]);

  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    if (mode === STORY_EDIT_MODE) {
      dispatch(updateStory({ ...data, id: currentStory.id }));
      dispatch(switchToStoryAddMode());
    } else {
      dispatch(addStory(data));
    }
    setSubmitting(false);
    setDescription("");
    setIntent("");
    setResponse("");
    setActions([""]);
    resetForm();
  };

  return (
    <section className='card'>
      <h2>{mode === STORY_EDIT_MODE ? "Edit Story" : "Add Story"}</h2>
      <Formik
        initialValues={{
          description,
          intent,
          actions,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validate={values => {
          let errors = {
            description: "",
            intent: "",
            actions: [""],
          };
          const startString = "";
          const maxStringLength = 80;
          const { description, intent, actions } = values;
          if (!description || !description.trim()) {
            errors.description = "description is required";
          } else if (!description.toLowerCase().startsWith(startString)) {
            errors.description = `description should start with ${startString}`;
          } else if (description.trim().length < startString.length + 1) {
            errors.description = "description is too short";
          } else if (description.length > maxStringLength) {
            errors.description = "description is too long";
          } else if (description !== description.toLowerCase()) {
            errors.description = "description should be all lower case";
          } else if (
            storiesDescriptions.includes(description) &&
            mode !== STORY_EDIT_MODE
          ) {
            errors.description = "description already used";
          }

          if (!intent) {
            errors.intent = "intent required";
          }

          if (!actions || actions.length === 0) {
            errors.actions = "actions are required";
          } else {
            actions.forEach((response, index) => {
              if (!response || !response.trim()) {
                errors.actions[index] = `response ${index + 1} is required`;
              } else if (response.trim().length < 1) {
                errors.actions[index] = `response ${index + 1} is too short`;
              } else if (response.trim().length > maxStringLength) {
                errors.actions[index] = `response ${index + 1} is too long`;
              }
            });
          }

          if (errors.description === "") {
            delete errors.description;
          }

          if (errors.intent === "") {
            delete errors.intent;
          }

          if (errors.actions[0] === "" && errors.actions.length === 1) {
            //if errors.actions as a string is truesy
            delete errors.actions;
          }

          return { ...errors };
        }}
      >
        {({ values, isSubmitting, errors }) => (
          <Form className={classes.root}>
            <label htmlFor='description'>Description</label>
            <div className={classes.formGroup}>
              <FormTextField
                name='description'
                id='description'
                placeholder='description'
              />
            </div>
            <label htmlFor='intent'>Intent</label>
            <div className={classes.formGroup}>
              <FormSelect name='intent' id='intent' menuItems={intents} />
            </div>
            <label htmlFor='response'>Responses</label>

            <FieldArray name='actions'>
              {arrayHelpers => (
                <>
                  {values.actions.map((response, index) => (
                    <div key={index} className={classes.formGroup}>
                      <div className={classes.formGroup}>
                        <FormSelect
                          name={`actions.${index}`}
                          id={`actions${index}`}
                          menuItems={responses}
                        />
                      </div>
                      <IconButton
                        onClick={() => {
                          if (values.actions.length > 1) {
                            arrayHelpers.remove(index);
                          }
                        }}
                        aria-label='delete'
                      >
                        <Clear />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    className={classes.addVarBtn}
                    onClick={() => {
                      arrayHelpers.push("");
                    }}
                    aria-label='add response'
                  >
                    Add Response
                  </Button>
                </>
              )}
            </FieldArray>
            <div>
              <Button
                disable={isSubmitting.toString()}
                type='submit'
                aria-label={
                  mode === STORY_EDIT_MODE ? "Edit Story" : "Add Story"
                }
                className={
                  mode === STORY_EDIT_MODE ? classes.editBtn : classes.addBtn
                }
              >
                {mode === STORY_EDIT_MODE ? "Edit Story" : "Add Story"}
              </Button>
            </div>
            <br />
            <br />
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </section>
  );
};
export default AddStory;
