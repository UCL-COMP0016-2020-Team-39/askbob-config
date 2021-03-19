import { validateStory } from "./utils";

it("validateStory return no error messages", () => {
  const values = {
    description: "story desc",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "response",
        step_id: "utter_greet_back",
      },
    ],
  };
  const itemNames = ["fetch_weather", "tell_pun", "tell_time"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateStory(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({});
});

it("validateStory return empty description error message", () => {
  const values1 = {
    description: "",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "response",
        step_id: "utter_greet_back",
      },
    ],
  };
  const values2 = {
    description: "        ",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "response",
        step_id: "utter_greet_back",
      },
    ],
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";
  const errors1 = validateStory(values1, itemNames, mode, EDIT_MODE);
  const errors2 = validateStory(values2, itemNames, mode, EDIT_MODE);

  expect(errors1).toEqual({ description: "description is required" });
  expect(errors2).toEqual({ description: "description is required" });
});

it("validateStory return name too long error message on long name string", () => {
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, molestias iure saepe facilis qui, necessitatibus consequatur ducimus deserunt doloribus veniam natus quos repellendus. Dolores consectetur vitae laborum porro ab unde minima enim a natus! Hic quod, natus maxime ea consectetur, voluptatum quasi ipsam laudantium in velit impedit dolorem blanditiis, animi neque minima modi incidunt similique odit. Facilis quod alias molestias, doloremque voluptates rerum ea sunt hic unde nostrum sapiente quam saepe obcaecati a. Iure mollitia veritatis omnis quidem dolorum molestiae.";
  const values = {
    description,
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "response",
        step_id: "utter_greet_back",
      },
    ],
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateStory(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ description: "description is too long" });
});

it("validateStory return 'description already used' error message", () => {
  const values = {
    description: "id",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "response",
        step_id: "utter_greet_back",
      },
    ],
  };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateStory(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ description: "description already used" });
});

it("validateStory does not return 'description already used' error message in edit mode", () => {
  const values = {
    description: "id",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "response",
        step_id: "utter_greet_back",
      },
    ],
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "edit";
  const EDIT_MODE = "edit";

  const errors = validateStory(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({});
});

it("validateStory should return 'description can only contain numbers and letters' error message", () => {
  const values = {
    description: "ab!//zz\\'",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "response",
        step_id: "utter_greet_back",
      },
    ],
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "edit";
  const EDIT_MODE = "edit";

  const errors = validateStory(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    description: "description can only contain numbers and letters",
  });
});

it("validateStory should return 'id is required'", () => {
  const values1 = {
    description: "description",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "response",
        step_id: "",
      },
    ],
  };

  const values2 = {
    description: "description",
    steps: [
      {
        type: "intent",
        step_id: "greet",
      },
      {
        type: "response",
        step_id: "    ",
      },
    ],
  };

  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors1 = validateStory(values1, itemNames, mode, EDIT_MODE);
  const errors2 = validateStory(values2, itemNames, mode, EDIT_MODE);

  expect(errors1).toEqual({
    steps: [{}, { step_id: "id is required" }],
  });
  expect(errors2).toEqual({
    steps: [{}, { step_id: "id is required" }],
  });
});

it("validateStory should return 'id can only contain numbers and letters'", () => {
  const values = {
    description: "description",
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

  const errors1 = validateStory(values, itemNames, mode, EDIT_MODE);

  expect(errors1).toEqual({
    steps: [
      {},
      { step_id: "id can only contain numbers, letters and underscores" },
    ],
  });
});

it("validateStory returns 'id is too long' error message", () => {
  const step_id =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit Accusantium molestias iure saepe facilis qui necessitatibus consequatur ducimus deserunt doloribus veniam natus quos repellendus Dolores consectetur vitae laborum porro ab unde minima enim a natus Hic quod natus maxime ea consectetur voluptatum quasi ipsam laudantium in velit impedit dolorem blanditiis animi neque minima modi incidunt similique odit Facilis quod alias molestias doloremque voluptates rerum ea sunt hic unde nostrum sapiente quam saepe obcaecati a Iure mollitia veritatis omnis quidem dolorum molestiae";
  const values = {
    description: "description",
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

  const errors = validateStory(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    steps: [{}, { step_id: "id is too long" }],
  });
});

it("validateStory returns 'an intent shouldn't follow another intent'", () => {
  const values = {
    description: "description",
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

  const errors = validateStory(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    steps: [{ step_id: "an intent shouldn't follow another intent" }],
  });
});

it("validateStory returns 'story must start with an intent", () => {
  const values = {
    description: "description",
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

  const errors = validateStory(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    steps: [{ step_id: "story must start with an intent" }],
  });
});

it("validateStory returns 'story must not end with an intent'", () => {
  const values = {
    description: "description",
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

  const errors = validateStory(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({
    steps: [{}, undefined, { step_id: "story must not end with an intent" }],
  });
});
