import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { Request } from "express";

export const generateTokens = (user: User) => {
  const { id, username, email } = user;

  const refreshToken = jwt.sign(
    { id, username, email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: `7d`,
    },
  );

  const accessToken = jwt.sign(
    { id, username, email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: `30min`,
    },
  );

  return {
    refreshToken,
    accessToken,
  };
};

export const tokenFromHeader = (header?: string) => {
  if (header && header.includes(`Bearer`)) {
    const split = header.split(`Bearer `);
    return split.length > 0 && split[1];
  }

  return null;
};

export const appendTokensToObj = (obj, req: Request) => {
  const { accessToken, refreshToken } = req;

  if (accessToken) {
    obj.accessToken = accessToken;
  }

  if (refreshToken) {
    obj.refreshToken = refreshToken;
  }

  return obj;
};
