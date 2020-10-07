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
import { getConnection } from "typeorm";

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
    @Ctx() { redis, req }: MyContext,
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

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);
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

    await User.update(
      { id: userIdNum },
      {
        password: await argon2.hash(newPassword),
      },
    );
    await redis.del(key);

    // log in user after change password
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext,
  ) {
    const user = await User.findOne({ where: { email } });
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
  me(@Ctx() { req }: MyContext): Promise<User | undefined> | null {
    // not logged in
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    // check if user submission is valid
    const errors = validateRegister(options);
    if (errors.length) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user: User;
    try {
      user = await User.create({
        username: options.username,
        email: options.email,
        password: hashedPassword,
      }).save();
    } catch (err) {
      devConsole({
        "register error": err,
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
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } },
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
