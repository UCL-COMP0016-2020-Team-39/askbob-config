import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSynonym,
  updateSynonym,
  switchToSynonymAddMode,
} from "../../actions/synonymsActions";
import { EDIT_MODE_SYNONYM } from "../../actions/types";

import { Formik, Form, FieldArray } from "formik";
import { Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { FormTextField } from "..";
import useStyles from "./styles";

import { nameToIdNonUniqueId } from "../../utils";

const AddSynonym = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [examples, setExamples] = useState(["", ""]);

  const { currentItem, mode } = useSelector(state => state.synonyms);

  const synonyms = useSelector(state => state.synonyms.items);
  console.log("synonyms are", synonyms);
  const synonymsNames = synonyms.map(synonym => synonym.name);

  useEffect(() => {
    if (mode === EDIT_MODE_SYNONYM) {
      setName(currentItem.name);
      setExamples(currentItem.examples);
    }
  }, [mode, currentItem]);

  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const synonym_id = nameToIdNonUniqueId(data.name);
    if (mode === EDIT_MODE_SYNONYM) {
      dispatch(
        updateSynonym({
          ...data,
          name: data.name.trim(),
          synonym_id: currentItem.synonym_id,
          id: currentItem.id,
        })
      );
      dispatch(switchToSynonymAddMode());
    } else {
      dispatch(addSynonym({ ...data, name: data.name.trim(), synonym_id }));
    }
    setSubmitting(false);
    setName("");
    setExamples(["", ""]);
    resetForm();
  };

  return (
    <section className='card'>
      <div id='synonym_target'></div>

      <h2>{mode === EDIT_MODE_SYNONYM ? "Edit Synonym" : "Add Synonym"}</h2>
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
          } else if (
            synonymsNames.includes(name) &&
            mode !== EDIT_MODE_SYNONYM
          ) {
            errors.name = "name already used";
          } else if (!name.match(/^[0-9a-zA-Z ]+$/)) {
            errors.name = "name can only contain numbers and letters";
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
                          placeholder='Synonym'
                          name={`examples.${index}`}
                        />
                        <IconButton
                          aria-label='clear'
                          onClick={() => {
                            if (values.examples.length > 2) {
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
                  mode === EDIT_MODE_SYNONYM ? "Edit Synonym" : "Add Synonym"
                }
                type='submit'
                variant='contained'
                className={
                  mode === EDIT_MODE_SYNONYM ? classes.editBtn : classes.addBtn
                }
              >
                {mode === EDIT_MODE_SYNONYM ? "Edit Synonym" : "Add Synonym"}
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
export default AddSynonym;
