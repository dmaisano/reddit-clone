import { ObjectType, Field } from "type-graphql";
import { UserInput } from "../resolvers/UserInput";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

export const validateRegister = (options: UserInput) => {
  const errors: FieldError[] = [];

  if (!options.email.includes("@")) {
    errors.push({
      field: "email",
      message: "invalid email",
    });
  }

  if (options.username.includes("@")) {
    errors.push({
      field: "username",
      message: "cannot include",
    });
  }

  if (options.username.length <= 2) {
    errors.push({
      field: "username",
      message: "length must than 2",
    });
  }

  if (options.password.length <= 2) {
    errors.push({
      field: "password",
      message: "length must than 2",
    });
  }

  return errors;
};
