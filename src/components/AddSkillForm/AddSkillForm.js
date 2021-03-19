import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSkill,
  updateSkill,
  switchToSkillAddMode,
} from "../../actions/skillsActions";
import { EDIT_MODE_SKILL } from "../../actions/types";

import { Formik, Form, FieldArray } from "formik";
import { Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import useStyles from "./styles";
import { FormSelect, FormTextField } from "../";

import { nameToId, validateSkill } from "../../utils";

const AddSkill = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [intent, setIntent] = useState("");
  const [actions, setActions] = useState([{ type: "response", action_id: "" }]);

  const { currentItem, mode, items: skills } = useSelector(
    state => state.skills
  );

  const skillDescriptions = skills.map(skill => skill.description);
  const intents = useSelector(state => state.intents.items);
  const responses = useSelector(state => state.responses.items);

  useEffect(() => {
    if (mode === EDIT_MODE_SKILL) {
      setDescription(currentItem.description);
      setIntent(currentItem.intent);
      setActions(currentItem.actions);
    }
  }, [mode, currentItem]);

  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const skill_id = nameToId(data.description);
    if (mode === EDIT_MODE_SKILL) {
      dispatch(
        updateSkill({
          ...data,
          description: data.description.trim(),
          skill_id: currentItem.skill_id,
          id: currentItem.id,
        })
      );
      dispatch(switchToSkillAddMode());
    } else {
      dispatch(
        addSkill({
          ...data,
          description: data.description.trim(),
          skill_id,
        })
      );
    }
    setSubmitting(false);
    setDescription("");
    setIntent("");
    setActions([{ type: "response", action_id: "" }]);
    resetForm();
  };

  return (
    <section className='card'>
      <h2>{mode === EDIT_MODE_SKILL ? "Edit Skill" : "Add Skill"}</h2>
      <Formik
        initialValues={{
          description,
          intent,
          actions,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validate={values => {
          const errors = validateSkill(
            values,
            skillDescriptions,
            mode,
            EDIT_MODE_SKILL
          );
          return errors;
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
            <label htmlFor='action'>Actions</label>

            <FieldArray name='actions'>
              {arrayHelpers => (
                <>
                  {values.actions.map((action, index) => (
                    <div key={index} className={classes.formGroup}>
                      <div className={classes.selectGroup}>
                        <FormSelect
                          name={`actions.${index}.type`}
                          id={`actions.${index}.type`}
                          menuItems={[{ id: "response" }, { id: "custom" }]}
                          menuValue='id'
                          menuText='id'
                        />
                        {values.actions[index].type === "response" ? (
                          <FormSelect
                            name={`actions.${index}.action_id`}
                            id={`actions.${index}.action_id`}
                            menuItems={responses}
                            menuValue='response_id'
                            menuText='name'
                          />
                        ) : (
                          <>
                            <div className={classes.formGroup}>
                              <FormTextField
                                name={`actions.${index}.action_id`}
                                id={`actions.${index}.action_id`}
                                placeholder='Add name of custom action'
                              />
                            </div>
                          </>
                        )}
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
                      arrayHelpers.push({ type: "response", action_id: "" });
                    }}
                    aria-label='add action'
                  >
                    Add Action
                  </Button>
                </>
              )}
            </FieldArray>
            <div>
              <Button
                disable={isSubmitting.toString()}
                type='submit'
                aria-label={
                  mode === EDIT_MODE_SKILL ? "Edit Skill" : "Add Skill"
                }
                className={
                  mode === EDIT_MODE_SKILL ? classes.editBtn : classes.addBtn
                }
              >
                {mode === EDIT_MODE_SKILL ? "Edit Skill" : "Add Skill"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};
export default AddSkill;
