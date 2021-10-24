import fs from "fs";
import { promisify } from "util";

export const readFile = promisify(fs.readFile);

export const truncate = (input: string, maxLen: number = 25) => {
  return `${input.substring(0, maxLen)}${input.length > maxLen ? `...` : ``}`;
};

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
