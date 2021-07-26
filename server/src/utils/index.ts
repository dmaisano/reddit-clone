import fs from "fs";
import { promisify } from "util";

export const readFile = promisify(fs.readFile);

export const truncate = (input: string, maxLen: number = 25) => {
  return `${input.substring(0, maxLen)}${input.length > maxLen ? `...` : ``}`;
};
