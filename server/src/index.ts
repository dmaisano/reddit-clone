import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import jwt from "jsonwebtoken";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { Updoot } from "./entities/Updoot";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PostsResolver } from "./resolvers/posts";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import { createUpdootLoader } from "./utils/createUpdootLoader";
import { createUserLoader } from "./utils/createUserLoader";
import { generateTokens, tokenFromHeader } from "./utils/token";
import { Request } from "express";
import { jwtMiddleware } from "./middleware/isAuth";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    ssl: __prod__
      ? {
          rejectUnauthorized: false,
        }
      : false,
    url: process.env.DATABASE_URL,
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, Updoot],
  });
  await conn.runMigrations();

  // await User.delete({});

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set(`trust proxy`, 1);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  // app.use(
  //   session({
  //     name: COOKIE_NAME,
  //     store: new RedisStore({
  //       client: redis,
  //       disableTouch: true,
  //     }),
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  //       httpOnly: true,
  //       sameSite: "lax", // csrf
  //       secure: __prod__, // cookie only works in https
  //       domain: __prod__ ? process.env.DOMAIN : undefined,
  //     },
  //     saveUninitialized: false,
  //     secret: process.env.SESSION_SECRET || ``,
  //     resave: false,
  //   }),
  // );

  app.use(async (req: any, _, next) => {
    let accessToken = tokenFromHeader(req.headers.authorization);
    let refreshToken = req.headers["refresh-token"] as string;

    if (!refreshToken && !accessToken) {
      return next();
    }

    if (accessToken) {
      try {
        const data = jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET,
        ) as User;

        req.userId = data.id;
        return next();
      } catch {}
    }

    if (!refreshToken) {
      return next();
    }

    // user probably has an expired access token
    // refresh and return both tokens to the user
    let data: User | undefined;
    try {
      // verify the refresh token
      data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as User;
    } catch {
      return next();
    }

    if (!data) {
      return next();
    }

    const user = await User.findOne(data.id);

    // token has been invalidated
    if (!user || user.email !== data.email) {
      return next();
    }

    const tokens = generateTokens(user);

    req.accessToken = tokens.accessToken;
    req.refreshToken = tokens.refreshToken;
    req.userId = data.id;

    return next();
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostsResolver, UserResolver],
      globalMiddlewares: [jwtMiddleware],
      validate: false,
    }),
    introspection: true,
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      updootLoader: createUpdootLoader(),
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.get(`/`, (_, res) => {
    res.send(
      `<h1 style="text-align: center; padding-top: 2rem;">reddit clone graphql api</h1>`,
    );
  });

  const port = parseInt(process.env.PORT);
  app.listen(port, () => {
    console.log(`server started on http://localhost:${port}/graphql`);
  });
};

main().catch((err) => {
  console.log(err);
});
