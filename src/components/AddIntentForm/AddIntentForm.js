import React from "react";
import { Formik, useField, Form, FieldArray } from "formik";
import {
  TextField,
  Button,
  Radio,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import useStyles from "./styles";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required().max(25),
  Intents: yup.array().of(yup.string().required().max(25)),
});

const AddIntent = () => {
  const classes = useStyles();
  const handleSubmit = (data, { setSubmitting }) => {
    setSubmitting(true);
    console.log(data);
    setSubmitting(false);
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
      <h2>Add Intent</h2>
      <Formik
        initialValues={{
          name: "",
          Intents: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting, errors }) => (
          <Form className={classes.root}>
            <label htmlFor='name'>name</label>
            <div className={classes.formGroup}>
              <MyTextField name='name' id='name' placeholder='name' />
            </div>
            <>
              <label htmlFor='Intents'>Intents</label>
              <FieldArray name='Intents'>
                {arrayHelpers => (
                  <>
                    {values.Intents.map((intent, index) => (
                      <div key={index} className={classes.formGroup}>
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
                  </>
                )}
              </FieldArray>
            </>

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
