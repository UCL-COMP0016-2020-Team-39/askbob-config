import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResponse, updateResponse } from "../../actions/responsesActions";
import { switchToResponseAddMode } from "../../actions/formActions";
import { RESPONSE_EDIT_MODE } from "../../actions/types";

import { Formik, useField, Form, FieldArray } from "formik";
import { TextField, Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import useStyles from "./styles";

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const AddResponse = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [variants, setVariants] = useState([""]);

  const { currentResponse, responseFormMode: mode } = useSelector(
    state => state.form
  );

  const responses = useSelector(state => state.responses);

  const responsesNames = responses.map(response => response.name);

  useEffect(() => {
    if (mode === RESPONSE_EDIT_MODE) {
      setName(currentResponse.name);
      setVariants(currentResponse.variants);
    }
  }, [mode, currentResponse]);

  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    if (mode === RESPONSE_EDIT_MODE) {
      dispatch(updateResponse({ ...data, id: currentResponse.id }));
      dispatch(switchToResponseAddMode());
    } else {
      dispatch(addResponse(data));
    }
    setSubmitting(false);
    setName("");
    setVariants([""]);
  };

  return (
    <section className='card'>
      <h2>{mode === RESPONSE_EDIT_MODE ? "Edit Response" : "Add Response"}</h2>
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
          } else if (
            responsesNames.includes(name) &&
            mode !== RESPONSE_EDIT_MODE
          ) {
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
              <MyTextField name='name' id='name' placeholder='name' />
            </div>
            <>
              <label htmlFor='variants'>Variants</label>
              <FieldArray name='variants'>
                {arrayHelpers => (
                  <>
                    {values.variants.map((variant, index) => (
                      <div key={index} className={classes.formGroup}>
                        <MyTextField
                          placeholder="What's another way of saying your response?"
                          name={`variants.${index}`}
                        />
                        <IconButton
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
                type='submit'
                variant='contained'
                className={
                  mode === RESPONSE_EDIT_MODE ? classes.editBtn : classes.addBtn
                }
              >
                {mode === RESPONSE_EDIT_MODE ? "Edit Response" : "Add Response"}
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
export default AddResponse;
