import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSkill, updateSkill } from "../../actions/skillsActions";
import { switchToSkillAddMode } from "../../actions/formActions";
import { SKILL_EDIT_MODE } from "../../actions/types";

import { Formik, Field, useField, Form } from "formik";
import { TextField, Select, MenuItem, Button } from "@material-ui/core";
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

const MySelect = ({ menuItems, ...props }) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <>
      <div className={classes.errorText}>{errorText}</div>
      <Select {...field} helperText={errorText} error={!!errorText}>
        {menuItems.map(item => {
          return (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};

const AddSkill = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [intent, setIntent] = useState("");
  const [response, setResponse] = useState("");

  const { currentSkill, skillFormMode: mode } = useSelector(
    state => state.form
  );

  const intents = useSelector(state => state.intents);
  const responses = useSelector(state => state.responses);
  const skills = useSelector(state => state.skills);

  const skillsNames = skills.map(skill => skill.name);

  useEffect(() => {
    if (mode === SKILL_EDIT_MODE) {
      setName(currentSkill.name);
      setIntent(currentSkill.intent);
      setResponse(currentSkill.response);
    }
  }, [mode, currentSkill]);

  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    if (mode === SKILL_EDIT_MODE) {
      dispatch(updateSkill({ ...data, id: currentSkill.id }));
      dispatch(switchToSkillAddMode());
    } else {
      dispatch(addSkill(data));
    }
    setSubmitting(false);
    setName("");
    setIntent("");
    setResponse("");
  };

  return (
    <section className='card'>
      <h2>{mode === SKILL_EDIT_MODE ? "Edit Skill" : "Add Skill"}</h2>
      <Formik
        initialValues={{
          name,
          intent,
          response,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validate={values => {
          let errors = {};
          const startString = "";
          const maxStringLength = 80;
          const { name, intent, response } = values;
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
          } else if (skillsNames.includes(name) && mode !== SKILL_EDIT_MODE) {
            errors.name = "name already used";
          }

          if (!response) {
            errors.response = "response required";
          }

          if (!intent) {
            errors.intent = "intent required";
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
            <label htmlFor='intent'>Intent</label>
            <div className={classes.formGroup}>
              <MySelect name='intent' id='intent' menuItems={intents} />
            </div>
            <label htmlFor='response'>Response</label>
            <div className={classes.formGroup}>
              <MySelect name='response' id='response' menuItems={responses} />
            </div>
            <div>
              <Button
                disable={isSubmitting.toString()}
                type='submit'
                variant='contained'
                className={
                  mode === SKILL_EDIT_MODE ? classes.editBtn : classes.addBtn
                }
              >
                {mode === SKILL_EDIT_MODE ? "Edit Skill" : "Add Skill"}
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
export default AddSkill;
