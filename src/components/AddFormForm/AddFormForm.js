import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addForm,
  updateForm,
  switchToFormAddMode,
} from "../../actions/formsActions";
import { EDIT_MODE_FORM } from "../../actions/types";

import { Formik, Form, FieldArray } from "formik";
import { Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import useStyles from "./styles";
import { FormSelect, FormTextField } from "..";

import { nameToId } from "../../utils";

const AddForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [activateIntent, setActivateIntent] = useState("");
  const [deactivateIntent, setDeactivateIntent] = useState("");

  const [, setResponse] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      type: "",
      slot: "",
      entity: "",
      role: "",
      group: "",
      intent: "",
      not_intent: "",
    },
  ]);
  const { currentItem, mode } = useSelector(state => state.forms);

  const intents = useSelector(state => state.intents.items);

  useEffect(() => {
    if (mode === EDIT_MODE_FORM) {
      setDescription(currentItem.description);
      setActivateIntent(currentItem.activateIntent);
      setDeactivateIntent(currentItem.deactivateIntent);
      setQuestions(currentItem.questions);
    }
  }, [mode, currentItem]);

  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const form_id = nameToId(data.description);
    if (mode === EDIT_MODE_FORM) {
      dispatch(
        updateForm({
          ...data,
          description: data.description.trim(),
          form_id: currentItem.form_id,
          id: currentItem.id,
        })
      );
      dispatch(switchToFormAddMode());
    } else {
      dispatch(
        addForm({
          ...data,
          description: data.description.trim(),
          form_id,
        })
      );
    }
    setSubmitting(false);
    setDescription("");
    setResponse("");
    setActivateIntent("");
    setDeactivateIntent("");
    setQuestions([
      {
        question: "",
        type: "",
        slot: "",
        entity: "",
        role: "",
        group: "",
        intent: "",
        not_intent: "",
      },
    ]);
    resetForm();
  };

  return (
    <section className='card'>
      <h2>{mode === EDIT_MODE_FORM ? "Edit Form" : "Add Form"}</h2>
      <Formik
        initialValues={{
          description,
          activateIntent,
          deactivateIntent,
          questions,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validate={values => {
          let errors = {
            description: "",
          };

          const maxStringLength = 80;
          const { description } = values;
          if (!description || !description.trim()) {
            errors.description = "description is required";
          } else if (description.length > maxStringLength) {
            errors.description = "description is too long";
          } else if (!description.match(/^[0-9a-zA-Z ]+$/)) {
            errors.description =
              "description can only contain numbers and letters";
          }

          if (errors.description === "") {
            delete errors.description;
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
            <label htmlFor='intent'>Activate Intent</label>
            <div className={classes.formGroup}>
              <FormSelect
                name='activateIntent'
                id='activateIntent'
                menuItems={intents}
                menuValue='intent_id'
                menuText='name'
              />
            </div>
            <label htmlFor='intent'>Deactivate Intent</label>
            <div className={classes.formGroup}>
              <FormSelect
                name='deactivateIntent'
                id='deactivateIntent'
                menuItems={intents}
                menuValue='intent_id'
                menuText='name'
              />
            </div>
            <label htmlFor='response'>Questions</label>
            <FieldArray name='questions'>
              {arrayHelpers => (
                <>
                  {values.questions.map((question, index) => (
                    <div key={index} className={classes.formGroup}>
                      <div className={classes.formGroup}>
                        <label htmlFor={`questions.${index}.question`}>
                          Question
                        </label>
                        <FormTextField
                          name={`questions.${index}.question`}
                          id={`questions.${index}.question`}
                        />
                      </div>
                      <div className={classes.formGroup}>
                        <label htmlFor={`questions.${index}.type`}>Type</label>
                        <FormSelect
                          name={`questions.${index}.type`}
                          id={`questions.${index}.type`}
                          menuItems={[
                            { type: "from entity" },
                            { type: "from text" },
                          ]}
                          menuValue='type'
                          menuText='type'
                        />
                      </div>
                      <div className={classes.formGroup}>
                        <label htmlFor={`questions.${index}.slot`}>Slot</label>
                        <FormTextField
                          name={`questions.${index}.slot`}
                          id={`questions.${index}.slot`}
                        />
                      </div>
                      <div className={classes.formGroup}>
                        <label htmlFor={`questions.${index}.entity`}>
                          Entity
                        </label>
                        <FormTextField
                          name={`questions.${index}.entity`}
                          id={`questions.${index}.entity`}
                        />
                      </div>
                      <div className={classes.formGroup}>
                        <label htmlFor={`questions.${index}.role`}>Role</label>
                        <FormTextField
                          name={`questions.${index}.role`}
                          id={`questions.${index}.role`}
                        />
                      </div>
                      <div className={classes.formGroup}>
                        <label htmlFor={`questions.${index}.group`}>
                          Group
                        </label>
                        <FormTextField
                          name={`questions.${index}.group`}
                          id={`questions.${index}.group`}
                        />
                      </div>
                      <div className={classes.formGroup}>
                        <label htmlFor={`questions.${index}.group`}>
                          Intent
                        </label>
                        <FormSelect
                          name={`questions.${index}.intent`}
                          id={`questions.${index}.intent`}
                          menuItems={[
                            ...intents,
                            { intent_id: "None", name: "None" },
                          ]}
                          menuValue='intent_id'
                          menuText='name'
                        />
                      </div>
                      <div className={classes.formGroup}>
                        <label htmlFor={`questions.${index}.not_intent`}>
                          Not Intent
                        </label>
                        <FormSelect
                          name={`questions.${index}.not_intent`}
                          id={`questions.${index}.not_intent`}
                          menuItems={[
                            ...intents,
                            { intent_id: "None", name: "None" },
                          ]}
                          menuValue='intent_id'
                          menuText='name'
                        />
                      </div>
                      <IconButton
                        onClick={() => {
                          if (values.questions.length > 1) {
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
                      arrayHelpers.push({
                        question: "",
                        type: "",
                        slot: "",
                        entity: "",
                        role: "",
                        group: "",
                        intent: "",
                        not_intent: "",
                      });
                    }}
                    aria-label='add question'
                  >
                    Add Question
                  </Button>
                </>
              )}
            </FieldArray>

            <div>
              <Button
                disable={isSubmitting.toString()}
                type='submit'
                aria-label={mode === EDIT_MODE_FORM ? "Edit Form" : "Add Form"}
                className={
                  mode === EDIT_MODE_FORM ? classes.editBtn : classes.addBtn
                }
              >
                {mode === EDIT_MODE_FORM ? "Edit Form" : "Add Form"}
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
export default AddForm;
