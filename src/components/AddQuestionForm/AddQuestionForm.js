import React from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../actions/questionsActions";
import { Formik, useField, Form, FieldArray } from "formik";
import { TextField, Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import useStyles from "./styles";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required().max(25),
  variants: yup.array().of(yup.string().required().max(25)).min(1),
});

const AddQuestion = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log(data);
    dispatch(addQuestion(data));
    setSubmitting(false);
    resetForm();
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
      <h2>Add Question</h2>
      <Formik
        initialValues={{
          name: "",
          variants: [""],
        }}
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
                          placeholder="What's another way of saying your question?"
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
              <Button
                disable={isSubmitting.toString()}
                type='submit'
                color='primary'
              >
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
export default AddQuestion;
