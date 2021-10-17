import { Request } from "express";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

export const tokenFromHeader = (header?: string) => {
  if (header && header.includes(`Bearer`)) {
    const split = header.split(`Bearer `);
    return split.length > 0 && split[1];
  }

  return null;
};

// export const getUserFromToken = (token: string): User | null => {
//   const user = JSON.parse(jwt.verify(token, process.env.ACCESS_TOKEN_SECRET))

//   return null;
// }

export const appendTokensToObj = (obj, req: Request) => {
  const { accessToken } = req;

  if (accessToken) {
    obj.accessToken = accessToken;
  }

  return obj;
};
