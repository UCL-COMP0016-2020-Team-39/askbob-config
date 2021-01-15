import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResponse, updateResponse } from "../../actions/responsesActions";
import { switchToResponseAddMode } from "../../actions/formActions";
import { RESPONSE_EDIT_MODE } from "../../actions/types";

import { Formik, useField, Form, FieldArray } from "formik";
import { TextField, Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import useStyles from "./styles";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required().max(25),
  variants: yup.array().of(yup.string().required().max(25)).min(1),
});

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
        validationSchema={validationSchema}
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
                      className={classes.addBtn}
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
