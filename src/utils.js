export const nameToId = name => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^(A-Z)|(a-z)|(0-9)]+/g, "_");
};

const validateString = (str, name, items, mode, EDIT_MODE) => {
  const maxStringLength = 80;
  if (!str || !str.trim()) {
    return `${name} is required`;
  } else if (str.length > maxStringLength) {
    return `${name} is too long`;
  } else if (items.includes(nameToId(str)) && mode !== EDIT_MODE) {
    return `${name} already used`;
  } else if (!str.match(/^[0-9a-zA-Z ]+$/)) {
    return `${name} can only contain numbers and letters`;
  } else {
    return "";
  }
};

export const validateItem = (values, itemNames, mode, EDIT_MODE) => {
  let errors = { name: "", examples: [""] };
  const maxStringLength = 80;
  const { name, examples } = values;

  const nameErrors = validateString(name, "name", itemNames, mode, EDIT_MODE);

  errors.name = nameErrors;

  if (!examples || examples.length === 0) {
    errors.examples = "examples are required";
  } else {
    examples.forEach((example, index) => {
      if (!example || !example.trim()) {
        errors.examples[index] = `example ${index + 1} is required`;
      } else if (example.trim().length > maxStringLength) {
        errors.examples[index] = `example ${index + 1} is too long`;
      }
    });
  }

  if (errors.name === "") {
    delete errors.name;
  }
  if (errors.examples[0] === "" && errors.examples.length === 1) {
    delete errors.examples;
  }

  return { ...errors };
};

export const validateSkill = (values, skillNames, mode, EDIT_MODE) => {
  let errors = {
    description: "",
    intent: "",
    actions: [{}],
  };

  const maxStringLength = 80;

  const { description, intent, actions } = values;

  const descriptionErrors = validateString(
    description,
    "description",
    skillNames,
    mode,
    EDIT_MODE
  );

  errors.description = descriptionErrors;

  if (!intent) {
    errors.intent = "intent required";
  }

  if (!actions || actions.length === 0) {
    errors.actionsList = "actions are required";
  } else {
    actions.forEach((action, index) => {
      if (!action?.action_id || !action?.action_id.trim()) {
        errors.actions[index] = {
          action_id: `action ${index + 1} is required`,
        };
      } else if (!action.action_id.match(/^[0-9a-zA-Z_ ]+$/)) {
        errors.actions[index] = {
          action_id: `action ${
            index + 1
          } can only contain numbers, letters or underscores`,
        };
      } else if (action?.action_id.length > maxStringLength) {
        errors.actions[index] = {
          action_id: `action ${index + 1} is too long`,
        };
      }
    });
  }

  if (errors.description === "") {
    delete errors.description;
  }

  if (errors.intent === "") {
    delete errors.intent;
  }

  if (
    errors.actions.length === 1 &&
    Object.keys(errors.actions[0]).length === 0
  ) {
    delete errors.actions;
  }

  //setError(Object.values(errors)[0]);
  return { ...errors };
};

export const validateSlot = (values, slotNames, mode, EDIT_MODE) => {
  let errors = { values: [""] };

  const maxStringLength = 80;
  const { name, type, min_value, max_value, values: catergories } = values;

  const nameErrors = validateString(name, "name", slotNames, mode, EDIT_MODE);

  errors.name = nameErrors;
  if (type === "float") {
    if (!min_value || !min_value.trim() || isNaN(min_value)) {
      errors.min_value = "min value should be a number";
    } else if (min_value < 0 || min_value > 1) {
      errors.min_value = "min value should be between than 1 and 0";
    }

    if (!max_value || !max_value.trim() || isNaN(max_value.trim())) {
      errors.max_value = "max value should be a number";
    } else if (max_value < 0 || max_value > 1) {
      errors.max_value = "max value should be between than 1 and 0";
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
};

export const validateStory = (values, descriptionNames, mode, EDIT_MODE) => {
  const errors = { description: "", steps: [""] };

  const { description, steps } = values;

  const descriptionErrors = validateString(
    description,
    "description",
    descriptionNames,
    mode,
    EDIT_MODE
  );

  errors.description = descriptionErrors;

  steps.forEach((step, index) => {
    if (!step.step_id) {
      errors[index] = `step ${index} requires an id`;
    }
    if (!step.type) {
      errors[index] = `step ${index} requires a type`;
    }
    if (index < steps.length - 1) {
      if (step.type === "intent" && steps[index + 1].type === "intent") {
        errors[
          index
        ] = `an intent shouldn't follow another intent at step ${index}`;
      }
    }
  });

  if (steps[0].type !== "intent") {
    errors.steps[0] = "story must start with an intent";
  }

  if (steps.length > 0 && steps[steps.length - 1].type === "intent") {
    errors.steps[0] = "story must not end with an intent";
  }

  if (errors.description === "") {
    delete errors.description;
  }

  if (errors.steps[0] === "" && errors.steps.length === 1) {
    delete errors.steps;
  }

  return errors;
};
