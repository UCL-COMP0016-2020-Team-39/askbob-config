import { v4 } from "uuid";
export const nameToId = name => {
  return name
    .trim()
    .toLowerCase()
    .replaceAll(/(\s+)|(-+)/g, "_");
};
