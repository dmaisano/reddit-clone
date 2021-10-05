import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { generateTokens, tokenFromHeader } from "../utils/token";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error(`not authenticated`);
  }

  return next();
};

export const jwtMiddleware: MiddlewareFn<MyContext> = async (
  { context },
  next,
) => {
  const { req } = context;

  const refreshToken = tokenFromHeader(req.headers.authorization);
  const accessToken = req.headers["refresh-token"] as string | undefined;

  if (!refreshToken && !accessToken) {
    return next();
  }

  if (accessToken) {
    try {
      const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as User;
      req.userId = data.id;
      return next();
    } catch {}
  }

  // invalid access token, no refresh token provided
  if (!refreshToken) {
    return next();
  }

  // user probably has an expired access token
  // refresh and return both tokens to the user
  let data: User | undefined;
  try {
    data = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as User;
  } catch {
    return next();
  }

  const user = await User.findOne(data.id);

  // token has been invalidated
  if (!user || user.email !== data.email) {
    return next();
  }

  const tokens = generateTokens(user);

  // pass tokens to the request context (ideally we would use cookies but alas heroku)
  // https://devcenter.heroku.com/articles/cookies-and-herokuapp-com
  // https://stackoverflow.com/questions/15519671/are-cookies-safe-in-a-heroku-app-on-herokuapp-com
  req.accessToken = tokens.accessToken;
  req.refreshToken = tokens.refreshToken;
  req.userId = data.id;

  return next();
};
