import { v4 } from "uuid";
import {
  EDIT_MODE_SKILL,
  EDIT_MODE_SLOT,
  EDIT_MODE_STORY,
} from "./actions/types";
export const nameToId = name => {
  return name
    .trim()
    .toLowerCase()
    .replaceAll(/(\s+)|(-+)/g, "_");
};

export const validateItem = (values, itemNames, mode, EDIT_MODE) => {
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
  } else if (itemNames.includes(nameToId(name)) && mode !== EDIT_MODE) {
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
};

export const validateSkill = values => {
  let errors = {
    description: "",
    intent: "",
    actions: "",
  };

  const { description, intent, actions } = values;

  const maxStringLength = 80;
  if (!description || !description.trim()) {
    errors.description = "description is required";
  } else if (description.length > maxStringLength) {
    errors.description = "description is too long";
  } else if (!description.match(/^[0-9a-zA-Z ]+$/)) {
    errors.description = "description can only contain numbers and letters";
  }

  if (!intent) {
    errors.intent = "intent required";
  }

  if (!actions || actions.length === 0) {
    errors.actionsList = "actions are required";
  } else {
    actions.forEach((action, index) => {
      if (!action && !action?.index?.action_id) {
        errors.actions = `action ${index + 1} is required`;
      } else if (action?.action_id.trim().length < 1) {
        errors.actions = `action ${index + 1} is required`;
      } else if (!action.action_id.match(/^[0-9a-zA-Z_ ]+$/)) {
        errors.actions = `action ${
          index + 1
        } can only contain numbers and letters`;
      } else if (action?.action_id.length > maxStringLength) {
        errors.actions[index].action_id = `action ${index + 1} is too long`;
      }
    });
  }

  if (errors.description === "") {
    delete errors.description;
  }

  if (errors.intent === "") {
    delete errors.intent;
  }

  if (errors.actions === "") {
    delete errors.actions;
  }

  //setError(Object.values(errors)[0]);
  return { ...errors };
};

export const validateSlot = (values, mode, slotNames) => {
  let errors = { values: [""] };

  const maxStringLength = 80;
  const { name, type, min_value, max_value, values: catergories } = values;
  if (!name || !name.trim()) {
    errors.name = "name is required";
  } else if (name.length > maxStringLength) {
    errors.name = "name is too long";
  } else if (slotNames.includes(nameToId(name)) && mode !== EDIT_MODE_SLOT) {
    errors.name = "name already used";
  } else if (!name.match(/^[0-9a-zA-Z ]+$/)) {
    errors.name = "name can only contain numbers and letters";
  }

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

export const validateStories = values => {
  const errors = { description: "", steps: [""] };
  const maxStringLength = 80;

  const { description, steps } = values;
  if (!description || !description.trim()) {
    errors.description = "description is required";
  } else if (description.length > maxStringLength) {
    errors.description = "description is too long";
  } else if (!description.match(/^[0-9a-zA-Z ]+$/)) {
    errors.description = "description can only contain numbers and letters";
  }

  steps.forEach((step, index) => {
    if (!step.step_id) {
      errors[index] = `step ${index} requires an id`;
    }
    if (!step.type) {
      errors[index] = `step ${index} requires a type`;
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

  // if (errors) {
  //   setErrorText(Object.values(errors)[0]);
  // }

  return errors;
};
