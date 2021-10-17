import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { v4 } from "uuid";
import { getRandomInt } from "../../library/utils";
import {
  BASE_URL,
  COOKIE_NAME,
  FORGET_PASSWORD_PREFIX,
  REGISTER_CONFIRMATION_PREFIX,
} from "../constants";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { sendEmail } from "../utils/sendEmail";
import { validateRegister } from "../utils/validateRegister";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import jwt from "jsonwebtoken";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => User, { nullable: true })
  user?: User | null;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // this is the current user and its ok to show them their own email
    if (req.session.userId === user.id) {
      return user.email;
    }

    // current user wants to see someone elses email
    return "";
  }

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
            field: `newPassword`,
            message: `length must be greater than 2`,
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    let userId = parseInt((await redis.get(key)) || ``);
    if (!userId) {
      return {
        errors: [
          {
            field: `token`,
            message: `token expired`,
          },
        ],
      };
    }
    const user = await User.findOne();
    if (!user) {
      return {
        errors: [
          {
            field: `token`,
            message: `user no longer exists`,
          },
        ],
      };
    }

    await User.update(
      { id: userId },
      { password: await argon2.hash(newPassword) },
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
    // const user = await User.findOne({ where: { email } });

    // console.log({ email, user });
    // return true;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      // the email is not in the db
      // we assume the email exists and display it as such to the user to prevent phishing
      return true;
    }

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      `ex`,
      1000 * 60 * 60 * 24 * 3, // valid for 3 days
    );

    const link = `${BASE_URL}/change-password/${token}`;
    const result = await sendEmail({
      to: email,
      subject: `dmaisano reddit clone app - forgot password`,
      templateOption: `password-reset`,
      data: {
        link,
      },
    });

    if (!result) {
      throw new Error(`Error resetting user's password: ${email}`);
    }

    return true;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Query(() => String)
  generateUsername() {
    const generateUsernameRecursive = async () => {
      const username = `test_user${getRandomInt(999999)}`;

      const user = await User.findOne({ where: { username } });

      if (!user) {
        return username;
      } else {
        return generateUsernameRecursive();
      }
    };

    return generateUsernameRecursive();
  }

  @Mutation(() => [FieldError])
  async register(
    @Arg("options") { email, username, password }: UsernamePasswordInput,
    @Ctx() { redis }: MyContext,
  ): Promise<FieldError[]> {
    const errors = validateRegister({ email, username, password });
    if (errors) {
      console.log({
        REGISTER_ERRORS: errors,
      });
      return errors;
    }

    const token = `${email}:${v4()}`;
    const link = `${BASE_URL}/confirm-registration/${token}`;

    const result = await sendEmail({
      to: email,
      subject: `dmaisano reddit clone app - registration`,
      templateOption: `register-confirmation`,
      data: {
        link,
      },
    });

    if (!result) {
      throw new Error(`Failed to register user with email: ${email}`);
    }

    const hashedPassword = await argon2.hash(password);

    // not checking for duplicate emails in cache
    // if a user registers more than once, we will only create an account associated with whichever token was provided from the email / frontend
    await redis.set(
      REGISTER_CONFIRMATION_PREFIX + token,
      JSON.stringify({ email, username, password: hashedPassword }),
      `ex`,
      1000 * 60 * 60 * 4, // 4hr expiration
    );

    return [];
  }

  @Mutation(() => User, { nullable: true })
  async confirmRegistration(
    @Arg("token") token: string,
    @Ctx() { req, redis }: MyContext,
  ): Promise<User | null> {
    let user: User | null = null;

    try {
      const cachedUser = await redis.get(REGISTER_CONFIRMATION_PREFIX + token);

      if (!cachedUser) {
        throw new Error(
          `Error. Please register and follow the instructions in the email.`,
        );
      }

      user = JSON.parse(cachedUser);

      if (user) {
        user.username = user.username.trim();
        user.email = user.email.trim();
      }

      user = await User.create({
        ...user, // redis contains the already hashed user password
      }).save();

      await redis.del(REGISTER_CONFIRMATION_PREFIX + token);

      // store user id session
      // this will set a cookie on the user
      // keep them logged in
      req.session.userId = user?.id;

      return user;
    } catch (err) {
      if (err?.code === "23505") {
        throw new Error(`username already taken`);
      }

      throw new Error((err as Error).message);
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where: usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    });
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "that username doesn't exist",
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

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: `30d` },
    );

    // req.session.userId = user.id;

    req.userId = user.id;

    return {
      accessToken,
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      }),
    );
  }
}
