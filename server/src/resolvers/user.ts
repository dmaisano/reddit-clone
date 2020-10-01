import { EntityManager } from "@mikro-orm/postgresql";
import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX, __prod__ } from "../constants";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { devConsole } from "../utils/devConsole";
import { sendEmail } from "../utils/sendEmail";
import { FieldError, validateRegister } from "../utils/validateRegister";
import { UserInput } from "./UserInput";
import { v4 } from "uuid";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, em, req }: MyContext,
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "length must than 2",
          },
        ],
      };
    }

    const key = FORGOT_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "invalid token",
          },
        ],
      };
    }

    const user = await em.findOne(User, { id: parseInt(userId) });
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user does not exist",
          },
        ],
      };
    }

    user.password = await argon2.hash(newPassword);
    await em.persistAndFlush(user);
    await redis.del(key);

    // log in user after change password
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { em, redis }: MyContext,
  ) {
    const user = await em.findOne(User, { email });
    if (!user) {
      // the email is not in the db
      return true;
    }

    const token = v4();

    redis.set(FORGOT_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 60); // 1 hr

    sendEmail({
      to: email,
      subject: "",
      html: `<a href="http://localhost:3000/change-password/${token}">reset password</a>`,
    });

    return true;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
    // not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { em, req }: MyContext,
  ): Promise<UserResponse> {
    // check if user submission is valid
    const errors = validateRegister(options);
    if (errors.length) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user: User;
    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          email: options.email,
          username: options.username,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning("*");

      user = result[0];

      // await em.persistAndFlush(user);
    } catch (err) {
      devConsole({
        message: err.message,
        code: err.code,
      });

      const errors: FieldError[] = [];

      // duplicate username error
      if (err.detail.includes("already exists")) {
        errors.push({
          field: "username",
          message: "username already taken",
        });
      }

      return { errors };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext,
  ): Promise<UserResponse> {
    const user = await em.findOne(
      User,
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    );

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "that username / email does not exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    // store user id session
    // this will set a cookie on the user
    // this will keep them logged in
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          devConsole(`failed to logout and destroy session, err: ${err}`);
          resolve(false);
          return;
        }

        res.clearCookie(COOKIE_NAME);
        resolve(true);
      }),
    );
  }
}
