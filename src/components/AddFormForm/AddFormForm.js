import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addForm, updateForm } from "../../actions/formsActions";
import { switchToFormAddMode } from "../../actions/formModeActions";
import { FORM_EDIT_MODE } from "../../actions/types";

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
  const [intent, setIntent] = useState("");
  const [, setResponse] = useState("");
  const [actions, setActions] = useState([""]);

  const { currentForm, formFormMode: mode } = useSelector(
    state => state.formMode
  );

  const intents = useSelector(state => state.intents);
  const responses = useSelector(state => state.responses);

  useEffect(() => {
    if (mode === FORM_EDIT_MODE) {
      setDescription(currentForm.description);
      setIntent(currentForm.intent);
      setActions(currentForm.actions);
    }
  }, [mode, currentForm]);

  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const form_id = nameToId(data.description);
    console.log(form_id);
    if (mode === FORM_EDIT_MODE) {
      dispatch(
        updateForm({
          ...data,
          description: data.description.trim(),
          form_id: currentForm.form_id,
          id: currentForm.id,
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
    setIntent("");
    setResponse("");
    setActions([""]);
    resetForm();
  };

  return (
    <section className='card'>
      <h2>{mode === FORM_EDIT_MODE ? "Edit Form" : "Add Form"}</h2>
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

          const maxStringLength = 80;
          const { description, intent, actions } = values;
          if (!description || !description.trim()) {
            errors.description = "description is required";
          } else if (description.length > maxStringLength) {
            errors.description = "description is too long";
          } else if (!description.match(/^[0-9a-zA-Z ]+$/)) {
            errors.description =
              "description can only contain numbers and letters";
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
              <FormSelect
                name='intent'
                id='intent'
                menuItems={intents}
                menuValue='intent_id'
                menuText='name'
              />
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
                          menuValue='response_id'
                          menuText='name'
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
                aria-label={mode === FORM_EDIT_MODE ? "Edit Form" : "Add Form"}
                className={
                  mode === FORM_EDIT_MODE ? classes.editBtn : classes.addBtn
                }
              >
                {mode === FORM_EDIT_MODE ? "Edit Form" : "Add Form"}
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
export default AddForm;
