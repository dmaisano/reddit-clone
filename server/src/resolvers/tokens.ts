import { Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";

@Resolver()
export class TokensResolver {
  @Mutation(() => String)
  async invalidateTokens(@Ctx() { req }: MyContext) {
    if (!req.userId) {
      return false;
    }

    const user = await User.findOne(req.userId);

    if (!user) {
    }

    // await User.update()

    return true;
  }
}
