import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIntent, updateIntent } from "../../actions/intentsActions";
import { switchToIntentAddMode } from "../../actions/formActions";
import { INTENT_EDIT_MODE } from "../../actions/types";

import { Formik, Form, FieldArray } from "formik";
import { Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { FormTextField } from "../";
import useStyles from "./styles";

import { v4 } from "uuid";
const AddIntent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [examples, setExamples] = useState([""]);

  const { currentIntent, intentFormMode: mode } = useSelector(
    state => state.form
  );

  const intents = useSelector(state => state.intents);

  const intentsNames = intents.map(intent => intent.name);

  useEffect(() => {
    if (mode === INTENT_EDIT_MODE) {
      setName(currentIntent.name);
      setExamples(currentIntent.examples);
    }
  }, [mode, currentIntent]);

  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const intent_id =
      data.name.trim().toLowerCase().replaceAll(/\s+/g, "_") + v4();
    if (mode === INTENT_EDIT_MODE) {
      dispatch(
        updateIntent({
          ...data,
          name: data.name.trim(),
          intent_id: currentIntent.intent_id,
          id: currentIntent.id,
        })
      );
      dispatch(switchToIntentAddMode());
    } else {
      dispatch(addIntent({ ...data, name: data.name.trim(), intent_id }));
    }
    setSubmitting(false);
    setName("");
    setExamples([""]);
    resetForm();
  };

  return (
    <section className='card'>
      <h2>{mode === INTENT_EDIT_MODE ? "Edit Intent" : "Add Intent"}</h2>
      <Formik
        initialValues={{
          name,
          examples,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validate={values => {
          let errors = { name: "", examples: [""] };
          const maxStringLength = 80;
          const { name, examples } = values;
          if (!name || !name.trim()) {
            errors.name = "name is required";
          } else if (name.trim().length < 1) {
            errors.name = "name is too short";
          } else if (name.length > maxStringLength) {
            errors.name = "name is too long";
          } else if (name !== name.toLowerCase()) {
            errors.name = "name should be all lower case";
          } else if (intentsNames.includes(name) && mode !== INTENT_EDIT_MODE) {
            errors.name = "name already used";
          }

          if (!examples || examples.length === 0) {
            errors.examples = "examples are required";
          } else {
            examples.forEach((example, index) => {
              if (!example || !example.trim()) {
                errors.examples[index] = `example ${index + 1} is required`;
              } else if (example.trim().length < 1) {
                errors.examples[index] = `example ${index + 1} is too short`;
              } else if (example.trim().length > maxStringLength) {
                errors.examples[index] = `example ${index + 1} is too long`;
              }
            });
          }

          if (errors.name === "") {
            delete errors.name;
          }
          if (errors.examples[0] === "" && errors.examples.length === 1) {
            //if errors.examples as a string is truesy
            delete errors.examples;
          }

          return { ...errors };
        }}
      >
        {({ values, isSubmitting, errors }) => (
          <Form className={classes.root}>
            <label htmlFor='name'>Name</label>
            <div className={classes.formGroup}>
              <FormTextField name='name' id='name' placeholder='name' />
            </div>
            <>
              <label htmlFor='examples'>Examples</label>
              <FieldArray name='examples'>
                {arrayHelpers => (
                  <>
                    {values.examples.map((example, index) => (
                      <div key={index} className={classes.formGroup}>
                        <FormTextField
                          placeholder="What's another way of saying your intent?"
                          name={`examples.${index}`}
                        />
                        <IconButton
                          aria-label='clear'
                          onClick={() => {
                            if (values.examples.length > 1) {
                              arrayHelpers.remove(index);
                            }
                          }}
                        >
                          <Clear />
                        </IconButton>
                      </div>
                    ))}
                    <Button
                      variant='contained'
                      aria-label='add example'
                      className={classes.addVarBtn}
                      onClick={() => {
                        arrayHelpers.push("");
                      }}
                    >
                      Add Example
                    </Button>
                  </>
                )}
              </FieldArray>
            </>

            <div>
              <Button
                disable={isSubmitting.toString()}
                aria-label={
                  mode === INTENT_EDIT_MODE ? "Edit Intent" : "Add Intent"
                }
                type='submit'
                variant='contained'
                className={
                  mode === INTENT_EDIT_MODE ? classes.editBtn : classes.addBtn
                }
              >
                {mode === INTENT_EDIT_MODE ? "Edit Intent" : "Add Intent"}
              </Button>
            </div>
            <br />
            <br />
            <pre>{/*JSON.stringify(values, null, 2)*/}</pre>
            <pre>{/*JSON.stringify(errors, null, 2)*/}</pre>
          </Form>
        )}
      </Formik>
    </section>
  );
};
export default AddIntent;
