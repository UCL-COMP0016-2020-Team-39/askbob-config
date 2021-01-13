import React, { useState } from "react";
import { Formik, Field, useField, Form, FieldArray } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required().max(10).min(1),
  Intents: yup.array().of(yup.string().required().max(10).min(1)),
});

const AddIntent = () => {
  const [show, setShow] = useState(false);

  const handleSubmit = (data, { setSubmitting }) => {
    setSubmitting(true);
    console.log(data);
    setTimeout(() => {
      setShow(true);
      setSubmitting(false);
    }, 3000);
  };

  const MyRadio = ({ label, ...props }) => {
    const [field] = useField(props);
    return <FormControlLabel {...field} control={<Radio />} label={label} />;
  };

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
  return (
    <section className='card'>
      {show && <p>I'm showing</p>}
      <h2>Add Question</h2>
      <Formik
        initialValues={{
          name: "",
          Intents: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        // validate={values => {
        //   const errors = {};
        //   if (values.name.includes("bob")) {
        //     errors.name = "non bob please";
        //   }
        //   return errors;
        // }}
      >
        {({ values, isSubmitting, errors }) => (
          <Form>
            <label htmlFor='name'>name</label>
            <div className='formGroup'>
              <MyTextField name='name' id='name' placeholder='name' />
            </div>
            <label htmlFor='Intents'>Intents</label>

            <FieldArray name='Intents'>
              {arrayHelpers => (
                <div>
                  {values.Intents.map((intent, index) => (
                    <div key={index}>
                      <MyTextField
                        placeholder="What's your intent?"
                        name={`Intents.${index}`}
                      />

                      <IconButton
                        onClick={() => {
                          arrayHelpers.remove(index);
                        }}
                      >
                        <Clear />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    onClick={() => {
                      arrayHelpers.push("");
                    }}
                  >
                    Add
                  </Button>
                </div>
              )}
            </FieldArray>

            <div>
              <Button disable={isSubmitting} type='submit' color='primary'>
                submit
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
