import { v4 } from "uuid";
export const nameToId = name => {
  return `${name}${v4()}`
    .trim()
    .toLowerCase()
    .replaceAll(/(\s+)|(-+)/g, "_");
};

export const nameToIdNonUniqueId = name => {
  return name
    .trim()
    .toLowerCase()
    .replaceAll(/(\s+)|(-+)/g, "_");
};
