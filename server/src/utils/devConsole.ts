import { __prod__ } from "../constants";

/**
 * Log to the console if running in debug / development
 * @param data
 */
export const devConsole = (...data: any[]): void => {
  if (__prod__) return;

  console.log(data);
};
