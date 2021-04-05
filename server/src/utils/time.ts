export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getTimeDifference = (end: Date, start: Date) => {
  return end.getTime() - start.getTime();
};
