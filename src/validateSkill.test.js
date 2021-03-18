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
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, molestias iure saepe facilis qui, necessitatibus consequatur ducimus deserunt doloribus veniam natus quos repellendus. Dolores consectetur vitae laborum porro ab unde minima enim a natus! Hic quod, natus maxime ea consectetur, voluptatum quasi ipsam laudantium in velit impedit dolorem blanditiis, animi neque minima modi incidunt similique odit. Facilis quod alias molestias, doloremque voluptates rerum ea sunt hic unde nostrum sapiente quam saepe obcaecati a. Iure mollitia veritatis omnis quidem dolorum molestiae.";
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
  const action2 =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit Accusantium molestias iure saepe facilis qui necessitatibus consequatur ducimus deserunt doloribus veniam natus quos repellendus Dolores consectetur vitae laborum porro ab unde minima enim a natus Hic quod natus maxime ea consectetur voluptatum quasi ipsam laudantium in velit impedit dolorem blanditiis animi neque minima modi incidunt similique odit Facilis quod alias molestias doloremque voluptates rerum ea sunt hic unde nostrum sapiente quam saepe obcaecati a Iure mollitia veritatis omnis quidem dolorum molestiae";
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
