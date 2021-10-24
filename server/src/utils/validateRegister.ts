import { VALID_USERNAME_RE } from "../constants";
import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes(`@`)) {
    return [
      {
        field: `email`,
        message: `invalid`,
      },
    ];
  }
  if (!options.username.match(VALID_USERNAME_RE)) {
    return [
      {
        field: `username`,
        message: `invalid username. should be auto generated`,
      },
    ];
  }
  if (options.username.includes(`@`)) {
    return [
      {
        field: `username`,
        message: `cannot include an @"`,
      },
    ];
  }
  if (options.password.length <= 2) {
    return [
      {
        field: `password`,
        message: `length must be greater than 2`,
      },
    ];
  }

  return null;
};
