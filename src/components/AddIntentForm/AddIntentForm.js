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

const AddIntent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [variants, setVariants] = useState([""]);

  const { currentIntent, intentFormMode: mode } = useSelector(
    state => state.form
  );

  const intents = useSelector(state => state.intents);

  const intentsNames = intents.map(intent => intent.name);

  useEffect(() => {
    if (mode === INTENT_EDIT_MODE) {
      setName(currentIntent.name);
      setVariants(currentIntent.variants);
    }
  }, [mode, currentIntent]);

  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    if (mode === INTENT_EDIT_MODE) {
      dispatch(updateIntent({ ...data, id: currentIntent.id }));
      dispatch(switchToIntentAddMode());
    } else {
      dispatch(addIntent(data));
    }
    setSubmitting(false);
    setName("");
    setVariants([""]);
  };

  return (
    <section className='card'>
      <h2>{mode === INTENT_EDIT_MODE ? "Edit Intent" : "Add Intent"}</h2>
      <Formik
        initialValues={{
          name,
          variants,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validate={values => {
          let errors = { name: "", variants: [""] };
          const startString = "";
          const maxStringLength = 80;
          const { name, variants } = values;
          if (!name || !name.trim()) {
            errors.name = "name is required";
          } else if (!name.toLowerCase().startsWith(startString)) {
            errors.name = `name should start with ${startString}`;
          } else if (name.includes(" ")) {
            errors.name = "name should not have spaces";
          } else if (name.trim().length < startString.length + 1) {
            errors.name = "name is too short";
          } else if (name.length > maxStringLength) {
            errors.name = "name is too long";
          } else if (name !== name.toLowerCase()) {
            errors.name = "name should be all lower case";
          } else if (intentsNames.includes(name) && mode !== INTENT_EDIT_MODE) {
            errors.name = "name already used";
          }

          if (!variants || variants.length === 0) {
            errors.variants = "variants are required";
          } else {
            variants.forEach((variant, index) => {
              if (!variant || !variant.trim()) {
                errors.variants[index] = `variant ${index + 1} is required`;
              } else if (variant.trim().length < 1) {
                errors.variants[index] = `variant ${index + 1} is too short`;
              } else if (variant.trim().length > maxStringLength) {
                errors.variants[index] = `variant ${index + 1} is too long`;
              }
            });
          }

          if (errors.name === "") {
            delete errors.name;
          }
          if (errors.variants[0] === "" && errors.variants.length === 1) {
            //if errors.variants as a string is truesy
            delete errors.variants;
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
              <label htmlFor='variants'>Variants</label>
              <FieldArray name='variants'>
                {arrayHelpers => (
                  <>
                    {values.variants.map((variant, index) => (
                      <div key={index} className={classes.formGroup}>
                        <FormTextField
                          placeholder="What's another way of saying your intent?"
                          name={`variants.${index}`}
                        />
                        <IconButton
                          aria-label='clear'
                          onClick={() => {
                            if (values.variants.length > 1) {
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
                      aria-label='add variant'
                      className={classes.addVarBtn}
                      onClick={() => {
                        arrayHelpers.push("");
                      }}
                    >
                      Add Variant
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
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </section>
  );
};
export default AddIntent;
