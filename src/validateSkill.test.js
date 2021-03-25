import { validateSkill } from "./utils";

it("validateSkill return no error messages", () => {
  const values = {
    description: "greet user",
    intent: "greet",
    actions: [
      {
        type: "response",
        action_id: "utter_greet_back",
      },
    ],
  };
  const itemNames = ["fetch_weather", "tell_pun", "tell_time"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSkill(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({});
});

it("validateSkill return empty description error message", () => {
  const values1 = {
    description: "",
    intent: "greet",
    actions: [
      {
        type: "response",
        action_id: "utter_greet_back",
      },
    ],
  };
  const values2 = {
    description: "      ",
    intent: "greet",
    actions: [
      {
        type: "response",
        action_id: "utter_greet_back",
      },
    ],
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";
  const errors1 = validateSkill(values1, itemNames, mode, EDIT_MODE);
  const errors2 = validateSkill(values2, itemNames, mode, EDIT_MODE);

  expect(errors1).toEqual({ description: "description is required" });
  expect(errors2).toEqual({ description: "description is required" });
});

it("validateSkill return name too long error message on long name string", () => {
  const description = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;

  const values = {
    description,
    intent: "greet",
    actions: [
      {
        type: "response",
        action_id: "utter_greet_back",
      },
    ],
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSkill(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ description: "description is too long" });
});

it("validateSkill return 'description already used' error message", () => {
  const values = {
    description: "id",
    intent: "greet",
    actions: [
      {
        type: "response",
        action_id: "utter_greet_back",
      },
    ],
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSkill(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ description: "description already used" });
});

it("validateSkill does not return 'description already used' error message in edit mode", () => {
  const values = {
    description: "id",
    intent: "greet",
    actions: [
      {
        type: "response",
        action_id: "utter_greet_back",
      },
    ],
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "edit";
  const EDIT_MODE = "edit";

  const errors = validateSkill(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({});
});

it("validateSkill should return 'description can only contain numbers and letters' error message", () => {
  const values = {
    description: "ah!sds\\'?",
    intent: "greet",
    actions: [
      {
        type: "response",
        action_id: "utter_greet_back",
      },
    ],
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "edit";
  const EDIT_MODE = "edit";

  const errors = validateSkill(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    description: "description can only contain numbers and letters",
  });
});

it("validateSkill should return 'actions are required' error message when examples missing", () => {
  const values = {
    description: "greet user",
    intent: "greet",
    actions: [],
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSkill(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ actionsList: "actions are required" });
});

it("validateSkill should return 'action 2 is required", () => {
  const values1 = {
    description: "greet user",
    intent: "greet",
    actions: [
      { type: "response", action_id: "utter_this" },
      { type: "response", action_id: "" },
    ],
  };

  const values2 = {
    description: "greet user",
    intent: "greet",
    actions: [
      { type: "response", action_id: "utter_this" },
      { type: "response", action_id: "    " },
    ],
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors1 = validateSkill(values1, itemNames, mode, EDIT_MODE);
  const errors2 = validateSkill(values2, itemNames, mode, EDIT_MODE);

  expect(errors1).toEqual({
    actions: [{}, { action_id: "action 2 is required" }],
  });
  expect(errors2).toEqual({
    actions: [{}, { action_id: "action 2 is required" }],
  });
});

it("validateSkill returns 'action 2 is too long' error message", () => {
  const action2 = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;

  const values = {
    description: "greet user",
    intent: "greet",
    actions: [
      {
        type: "response",
        action_id: "utter_greet_back",
      },
      {
        type: "custom",
        action_id: action2,
      },
    ],
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSkill(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    actions: [{}, { action_id: "action 2 is too long" }],
  });
});
