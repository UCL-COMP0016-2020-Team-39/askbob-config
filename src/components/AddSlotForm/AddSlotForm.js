import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSlot,
  updateSlot,
  switchToSlotAddMode,
} from "../../actions/slotsActions";
import { EDIT_MODE_SLOT } from "../../actions/types";

import { Formik, Form, FieldArray } from "formik";
import { Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import useStyles from "./styles";
import { FormSelect, FormTextField } from "..";

import { nameToId } from "../../utils";

const AddSlot = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [influence_conversation, setInfluence_conversation] = useState("true");
  const [type, setType] = useState("text");
  const [min_value, setMin_value] = useState("0");
  const [max_value, setMax_value] = useState("0");
  const [values, setValues] = useState([""]);

  const { currentItem, mode } = useSelector(state => state.slots);

  useEffect(() => {
    if (mode === EDIT_MODE_SLOT) {
      setName(currentItem.name);
    }
  }, [mode, currentItem]);

  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const slot_id = nameToId(data.name);
    if (data.type !== "catergorical") {
      delete data.values;
    }
    if (data.type !== "float") {
      delete data.min_value;
      delete data.max_value;
    }
    if (mode === EDIT_MODE_SLOT) {
      dispatch(
        updateSlot({
          ...data,
          name: data.name.trim(),
          slot_id: currentItem.slot_id,
          id: currentItem.id,
        })
      );
      dispatch(switchToSlotAddMode());
    } else {
      dispatch(
        addSlot({
          ...data,
          name: data.name.trim(),
          slot_id,
        })
      );
    }
    setSubmitting(false);
    setName("");
    setInfluence_conversation("true");
    setType("text");
    setMin_value("0");
    setMax_value("0");
    setValues([""]);
    resetForm();
  };

  return (
    <section className='card'>
      <h2>{mode === EDIT_MODE_SLOT ? "Edit Slot" : "Add Slot"}</h2>
      <Formik
        initialValues={{
          name,
          influence_conversation,
          type,
          min_value,
          max_value,
          values,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validate={values => {
          let errors = { values: [""] };

          const maxStringLength = 80;
          const {
            name,
            type,
            min_value,
            max_value,
            values: catergories,
          } = values;
          if (!name || !name.trim()) {
            errors.name = "name is required";
          } else if (name.length > maxStringLength) {
            errors.name = "name is too long";
          } else if (!name.match(/^[0-9a-zA-Z ]+$/)) {
            errors.name = "name can only contain numbers and letters";
          }

          if (type === "float") {
            if (!min_value || !min_value.trim() || isNaN(min_value)) {
              errors.min_value = "min value should be a number";
            }
            if (!max_value || !max_value.trim() || isNaN(max_value.trim())) {
              errors.max_value = "max value should be a number";
            }
          }

          if (type === "catergorical") {
            catergories.forEach((catergory, index) => {
              if (!catergory || !catergory.trim()) {
                errors.values[index] = `catergory ${index + 1} is required`;
              } else if (catergory.length > maxStringLength) {
                errors.values[index] = `catergory ${index + 1} is too long`;
              } else if (!catergory.match(/^[0-9a-zA-Z ]+$/)) {
                errors.values[
                  index
                ] = `catergory ${index} can only contain numbers and letters`;
              }
            });
          }

          if (errors.values[0] === "" && errors.values.length === 1) {
            delete errors.values;
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

            <label htmlFor='influence_conversation'>
              Influence Conversation
            </label>
            <div className={classes.formGroup}>
              <FormSelect
                name='influence_conversation'
                id='influence_conversation'
                menuItems={[{ id: "true" }, { id: "false" }]}
                menuValue='id'
                menuText='id'
              />
            </div>
            <label htmlFor={`type`}>Type</label>
            <FormSelect
              name={`type`}
              id={`type`}
              menuItems={[
                { id: "text" },
                { id: "bool" },
                { id: "float" },
                { id: "list" },
                { id: "catergorical" },
                { id: "any" },
              ]}
              menuValue='id'
              menuText='id'
            />
            <label htmlFor='response'>Values</label>
            {values.type === "catergorical" && (
              <FieldArray name='values'>
                {arrayHelpers => (
                  <>
                    {values.values.map((value, index) => (
                      <div key={index} className={classes.formGroup}>
                        <div className={classes.formGroup}>
                          <FormTextField
                            name={`values.${index}`}
                            id={`values.${index}`}
                          />
                        </div>

                        <IconButton
                          onClick={() => {
                            if (values.values.length > 1) {
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
                      aria-label='add value'
                    >
                      Add Value
                    </Button>
                  </>
                )}
              </FieldArray>
            )}
            <div>
              {values.type === "float" && (
                <>
                  <label htmlFor='min_value'>Min Value</label>
                  <div className={classes.formGroup}>
                    <FormTextField
                      name='min_value'
                      id='min_value'
                      type='number'
                    />
                  </div>
                  <label htmlFor='max_value'>Max Value</label>

                  <div className={classes.formGroup}>
                    <FormTextField
                      name='max_value'
                      id='max_value'
                      type='number'
                    />
                  </div>
                </>
              )}
              <Button
                disable={isSubmitting.toString()}
                type='submit'
                aria-label={mode === EDIT_MODE_SLOT ? "Edit Slot" : "Add Slot"}
                className={
                  mode === EDIT_MODE_SLOT ? classes.editBtn : classes.addBtn
                }
              >
                {mode === EDIT_MODE_SLOT ? "Edit Slot" : "Add Slot"}
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
export default AddSlot;
