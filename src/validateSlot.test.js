import { validateSlot } from "./utils";

it("validateSlot return no error messages", () => {
  const values = {
    name: "name",
    influence_conversation: "true",
    type: "text",
  };

  const itemNames = ["id1", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({});
});

it("validateSlot return empty name error message", () => {
  const values1 = {
    name: "",
    influence_conversation: "true",
    type: "text",
  };

  const values2 = {
    name: "       ",
    influence_conversation: "true",
    type: "text",
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";
  const errors1 = validateSlot(values1, itemNames, mode, EDIT_MODE);
  const errors2 = validateSlot(values2, itemNames, mode, EDIT_MODE);

  expect(errors1).toEqual({ name: "name is required" });
  expect(errors2).toEqual({ name: "name is required" });
});

it("validateSlot return name too long error message on long name string", () => {
  const name =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, molestias iure saepe facilis qui, necessitatibus consequatur ducimus deserunt doloribus veniam natus quos repellendus. Dolores consectetur vitae laborum porro ab unde minima enim a natus! Hic quod, natus maxime ea consectetur, voluptatum quasi ipsam laudantium in velit impedit dolorem blanditiis, animi neque minima modi incidunt similique odit. Facilis quod alias molestias, doloremque voluptates rerum ea sunt hic unde nostrum sapiente quam saepe obcaecati a. Iure mollitia veritatis omnis quidem dolorum molestiae.";
  const values = {
    name,
    influence_conversation: "true",
    type: "text",
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ name: "name is too long" });
});

it("validateSlot return 'name already used' error message", () => {
  const values = {
    name: "id1",
    influence_conversation: "true",
    type: "text",
  };
  const itemNames = ["id1", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ name: "name already used" });
});

it("validateSlot does not return 'name already used' error message in edit mode", () => {
  const values = {
    name: "id1",
    influence_conversation: "true",
    type: "text",
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "edit";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({});
});

it("validateSlot should return 'name can only contain numbers and letters' error message", () => {
  const values = {
    name: "id1!//.'",
    influence_conversation: "true",
    type: "text",
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "edit";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    name: "name can only contain numbers and letters",
  });
});

it("validateSlot should return no error with type float", () => {
  const values = {
    name: "id4",
    influence_conversation: "true",
    type: "float",
    min_value: "0.2",
    max_value: "0.8",
  };

  const itemNames = ["id1", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({});
});

it("validateSlot should return 'min value should be a number'", () => {
  const values = {
    name: "id1",
    influence_conversation: "true",
    type: "float",
    min_value: "abc",
    max_value: "0.4",
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    min_value: "min value should be a number",
  });
});

it("validateSlot should return 'max value should be a number'", () => {
  const values = {
    name: "id1",
    influence_conversation: "true",
    type: "float",
    min_value: "0",
    max_value: "abc",
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    max_value: "max value should be a number",
  });
});

it("validateSlot should return 'min value should be between than 1 and 0'", () => {
  const values = {
    name: "id1",
    influence_conversation: "true",
    type: "float",
    min_value: "-1",
    max_value: "0.5",
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    min_value: "min value should be between than 1 and 0",
  });
});

it("validateSlot should return 'max value should be between than 1 and 0'", () => {
  const values = {
    name: "id1",
    influence_conversation: "true",
    type: "float",
    min_value: "0",
    max_value: "2",
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    max_value: "max value should be between than 1 and 0",
  });
});

it("validateSlot should return no errors on when type is categorical", () => {
  const values = {
    name: "id4",
    influence_conversation: "true",
    type: "catergorical",
    values: ["a", "b"],
  };

  const itemNames = ["id1", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({});
});

it("validateSlot should return 'value 2 is required'", () => {
  const values1 = {
    name: "id4",
    influence_conversation: "true",
    type: "catergorical",
    values: ["a", "", "b"],
  };
  const values2 = {
    name: "id4",
    influence_conversation: "true",
    type: "catergorical",
    values: ["a", "     ", "b"],
  };

  const itemNames = ["id1", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors1 = validateSlot(values1, itemNames, mode, EDIT_MODE);
  const errors2 = validateSlot(values2, itemNames, mode, EDIT_MODE);

  expect(errors1).toEqual({
    values: ["", "value 2 is required"],
  });

  expect(errors2).toEqual({
    values: ["", "value 2 is required"],
  });
});

it("validateSlot should return 'value 2 is too long'", () => {
  const value2 =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit Accusantium molestias iure saepe facilis qui necessitatibus consequatur ducimus deserunt doloribus veniam natus quos repellendus Dolores consectetur vitae laborum porro ab unde minima enim a natus Hic quod natus maxime ea consectetur voluptatum quasi ipsam laudantium in velit impedit dolorem blanditiis animi neque minima modi incidunt similique odit Facilis quod alias molestias doloremque voluptates rerum ea sunt hic unde nostrum sapiente quam saepe obcaecati a Iure mollitia veritatis omnis quidem dolorum molestiae";

  const values = {
    name: "id4",
    influence_conversation: "true",
    type: "catergorical",
    values: ["a", value2, "b"],
  };

  const itemNames = ["id1", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    values: ["", "value 2 is too long"],
  });
});
/*
it("validateSlot should return 'id can only contain numbers and letters'", () => {
  const values = {
    name: "name",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "custom",
        step_id: "''!//",
      },
    ],
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors1 = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors1).toEqual({
    steps: [
      {},
      { step_id: "id can only contain numbers, letters and underscores" },
    ],
  });
});
/*
it("validateSlot returns 'id is too long' error message", () => {
  const step_id =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit Accusantium molestias iure saepe facilis qui necessitatibus consequatur ducimus deserunt doloribus veniam natus quos repellendus Dolores consectetur vitae laborum porro ab unde minima enim a natus Hic quod natus maxime ea consectetur voluptatum quasi ipsam laudantium in velit impedit dolorem blanditiis animi neque minima modi incidunt similique odit Facilis quod alias molestias doloremque voluptates rerum ea sunt hic unde nostrum sapiente quam saepe obcaecati a Iure mollitia veritatis omnis quidem dolorum molestiae";
  const values = {
    name: "name",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "custom",
        step_id,
      },
    ],
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    steps: [{}, { step_id: "id is too long" }],
  });
});

it("validateSlot returns 'an intent shouldn't follow another intent'", () => {
  const values = {
    name: "name",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "custom",
        step_id: "fetch_weather",
      },
    ],
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    steps: [{ step_id: "an intent shouldn't follow another intent" }],
  });
});

it("validateSlot returns 'story must start with an intent", () => {
  const values = {
    name: "name",
    steps: [
      {
        type: "custom",
        step_id: "fetch_weather",
      },
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "custom",
        step_id: "fetch_weather",
      },
    ],
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    steps: [{ step_id: "story must start with an intent" }],
  });
});

it("validateSlot returns 'story must not end with an intent'", () => {
  const values = {
    name: "name",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "custom",
        step_id: "fetch_weather",
      },
      {
        type: "intent",
        step_id: "greet",
      },
    ],
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateSlot(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    steps: [{}, undefined, { step_id: "story must not end with an intent" }],
  });
});
*/
