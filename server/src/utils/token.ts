import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const generateAccessToken = (user: User) => {
  const { id, username, email } = user;

  return jwt.sign({ id, username, email }, process.env.SECRET, {
    expiresIn: `3d`,
  });
};

export const splitAccessToken = (header?: string) => {
  if (header?.includes(`Bearer`)) {
    const split = header.split(`Bearer `);
    return split.length >= 0 && split[0];
  }

  return null;
};
