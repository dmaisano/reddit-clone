/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
