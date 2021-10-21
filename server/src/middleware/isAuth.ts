import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";
import { userIdFromHeader } from "../utils/token";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const userId = await userIdFromHeader(context.req.headers.authorization);

  if (userId === null) {
    throw new Error(`not authenticated`);
  }

  return next();
};
