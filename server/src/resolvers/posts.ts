import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import mockPosts from "../../library/constants/mock_posts";
import { Post } from "../entities/Post";
import { Updoot } from "../entities/Updoot";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { userIdFromHeader } from "../utils/token";

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];

  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostsResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.length >= 50 ? `${root.text.slice(0, 50)}...` : root.text;
  }

  @FieldResolver(() => User)
  creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(post.creatorId);
  }

  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(
    @Root() { id: postId }: Post,
    @Ctx() { updootLoader, req }: MyContext,
  ) {
    const userId = await userIdFromHeader(req.headers.authorization);

    if (userId === null) {
      return null;
    }

    const updoot = await updootLoader.load({ postId, userId });

    return updoot ? updoot.value : null;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext,
  ) {
    const userId = await userIdFromHeader(req.headers.authorization);

    if (userId === null) {
      return false;
    }

    const isUpdoot = value !== -1;
    const realValue = isUpdoot ? 1 : -1;

    const updoot = await Updoot.findOne({ where: { postId, userId } });

    // the user has voted on the post before
    // and they are changing their vote
    if (updoot && updoot.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update updoot
          set value = $1
          where "postId" = $2 and "userId" = $3
        `,
          [realValue, postId, userId],
        );

        await tm.query(
          `
          update post
          set points = points + $1
          where id = $2
        `,
          [2 * realValue, postId],
        );
      });
    } else if (!updoot) {
      // has never voted before
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          insert into updoot ("userId", "postId", value)
          values ($1, $2, $3)
        `,
          [userId, postId, realValue],
        );

        await tm.query(
          `
          update post
          set points = points + $1
          where id = $2
        `,
          [realValue, postId],
        );
      });
    }
    return true;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(200, limit);
    const realLimitPlusOne = realLimit + 1;

    const queryParams: any[] = [realLimitPlusOne];

    if (cursor) {
      queryParams.push(new Date(parseInt(cursor)));
    }

    const posts = await getConnection().query(
      `
      select p.*
      from post p
      ${cursor ? `where p."createdAt" < $2` : ""}
      order by p."createdAt" DESC
      limit $1
      `,
      queryParams,
    );

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext,
  ): Promise<Post | Error> {
    const userId = await userIdFromHeader(req.headers.authorization);

    if (userId === null) {
      throw new Error(`Invalid user id.`);
    }

    const { text, title } = input;

    let isValid = false;
    for (const post of mockPosts) {
      if (title === post.title && text === post.text) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      throw new Error(
        `Invalid post input. Click "generate input" then submit post.`,
      );
    }

    return Post.create({ ...input, creatorId: userId }).save();
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { req }: MyContext,
  ): Promise<Post | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ title, text })
      .where(`id = :id and "creatorId" = :creatorId`, {
        id,
        creatorId: req.session.userId,
      })
      .returning(`*`)
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext,
  ): Promise<boolean> {
    // not cascading delete
    // const { userId } = req.session;

    // try {
    //   const post = await Post.findOne(id);
    //   if (!post) return false;

    //   if (post.creatorId !== userId) {
    //     throw new Error(`not authorized`);
    //   }

    //   await Updoot.delete({ postId: id });
    //   await Post.delete({ id, creatorId: userId });
    // } catch {
    //   return false;
    // }
    // return true;

    // cascading delete
    //  onDelete: `CASCADE`

    const userId = await userIdFromHeader(req.headers.authorization);
    if (userId === null) {
      throw new Error(`Invalid user id.`);
    }
    try {
      await Post.delete({ id, creatorId: userId });
    } catch {
      return false;
    }

    return true;
  }
}
