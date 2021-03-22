import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Formik, Form, FieldArray } from "formik";
import { Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { FormTextField } from "../";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { nameToId, validateItem } from "../../utils";

const WithForm = ({
  itemName,
  currentItem,
  mode,
  items,
  itemNames,
  updateItem,
  EDIT_MODE,
  switchToItemAddMode,
  addItem,
}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [examples, setExamples] = useState(["", ""]);
  itemNames = itemNames.map(name => nameToId(name));
  const dispatch = useDispatch();

  const isEditing = mode === EDIT_MODE;
  useEffect(() => {
    if (isEditing) {
      setName(currentItem.name);
      setExamples(currentItem.examples);
    }
  }, [mode, currentItem, EDIT_MODE, isEditing]);

  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const item_id = nameToId(data.name);
    if (isEditing) {
      dispatch(
        updateItem({
          ...data,
          name: data.name.trim(),
          [`${itemName}_id`]: currentItem[`${itemName}_id`],
          id: currentItem.id,
        })
      );
      dispatch(switchToItemAddMode());
    } else {
      dispatch(
        addItem({
          ...data,
          name: data.name.trim(),
          [`${itemName}_id`]: item_id,
        })
      );
    }
    setSubmitting(false);
    setName("");
    setExamples(["", ""]);
    resetForm();
  };

  return (
    <section className='card'>
      <div id={`${itemName}_target`}></div>

      <h2 className={classes.title}>
        {isEditing ? `Edit ${itemName}` : `Add ${itemName}`}
      </h2>
      <Formik
        initialValues={{
          name,
          examples,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validate={values => validateItem(values, itemNames, mode, EDIT_MODE)}
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
                          placeholder={`What's another way of saying your ${itemName}?`}
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
                aria-label={isEditing ? `Edit ${itemName}` : `Add ${itemName}`}
                type='submit'
                variant='contained'
                className={isEditing ? classes.editBtn : classes.addBtn}
              >
                {isEditing ? `Edit ${itemName}` : `Add ${itemName}`}
              </Button>
            </div>
            <br />
            <br />
          </Form>
        )}
      </Formik>
    </section>
  );
};

WithForm.propTypes = {
  itemName: PropTypes.string.isRequired,
  currentItem: PropTypes.object,
  mode: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  itemNames: PropTypes.array.isRequired,
  updateItem: PropTypes.func.isRequired,
  EDIT_MODE: PropTypes.string.isRequired,
  switchToItemAddMode: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};
export default WithForm;
