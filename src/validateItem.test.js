import { nameToId, validateItem } from "./utils";

it("nameToId return a lowercase string with only letters, numbers and underscores", () => {
  expect(nameToId(" A b  !C ")).toBe("a_b_c");
});

it("validateItem return no error messages", () => {
  const values = { name: "id4", examples: ["example1", "example2"] };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateItem(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({});
});

it("validateItem return empty name error message on empty name string", () => {
  const values1 = { name: "", examples: ["example1", "example2"] };
  const values2 = { name: "    ", examples: ["example1", "example2"] };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";
  const errors1 = validateItem(values1, itemNames, mode, EDIT_MODE);
  const errors2 = validateItem(values2, itemNames, mode, EDIT_MODE);

  expect(errors1).toEqual({ name: "name is required" });
  expect(errors2).toEqual({ name: "name is required" });
});

it("validateItem return name too long error message on long name string", () => {
  const name = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;

  const values = { name, examples: ["example1", "example2"] };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateItem(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ name: "name is too long" });
});

it("validateItem return 'name already used' error message on used name string", () => {
  const values = { name: "id2", examples: ["example1", "example2"] };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateItem(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ name: "name already used" });
});

it("validateItem not return 'name already used' error message in edit mode", () => {
  const values = { name: "id2", examples: ["example1", "example2"] };
  const itemNames = ["id", "id2", "id3"];
  const mode = "edit";
  const EDIT_MODE = "edit";

  const errors = validateItem(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({});
});

it("validateItem should return 'name can only contain numbers and letters' error message", () => {
  const values = { name: "1'\\!", examples: ["example1", "example2"] };
  const itemNames = ["id", "id2", "id3"];
  const mode = "edit";
  const EDIT_MODE = "edit";

  const errors = validateItem(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ name: "name can only contain numbers and letters" });
});

it("validateItem should return 'examples are required' error message when examples missing", () => {
  const values = { name: "id4" };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateItem(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ examples: "examples are required" });
});

it("validateItem should return 'example 2 is required", () => {
  const values1 = { name: "id4", examples: ["e1", "", "e3"] };
  const values2 = { name: "id4", examples: ["e1", "   ", "e3"] };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors1 = validateItem(values1, itemNames, mode, EDIT_MODE);
  const errors2 = validateItem(values2, itemNames, mode, EDIT_MODE);

  expect(errors1).toEqual({ examples: ["", "example 2 is required"] });
  expect(errors2).toEqual({ examples: ["", "example 2 is required"] });
});

it("validateItem returns 'example.trim().length > maxStringLength' error message", () => {
  const example2 = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;

  const values = { name: "id4", examples: ["example1", example2, "example3"] };
  const itemNames = ["id", "id2", "id3"];
  const mode = "add";
  const EDIT_MODE = "edit";

  const errors = validateItem(values, itemNames, mode, EDIT_MODE);

  expect(errors).toEqual({ examples: ["", "example 2 is too long"] });
});
