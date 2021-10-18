import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import EditDeletePostButtons from "../components/EditDeletePostButtons";
import Layout from "../components/Layout";
import { RouterChakraLink } from "../components/RouterChakraLink";
import UpdootSection from "../components/UpdootSection";
import { usePostsQuery } from "../generated/graphql";
interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Layout>
      <br />
      {!data ? (
        loading ? (
          <div>loading...</div>
        ) : (
          <div>
            <div>no posts found</div>
            <div>{error?.message}</div>
          </div>
        )
      ) : (
        <Stack pt={8}>
          {data.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box flex={1}>
                  <RouterChakraLink to={`/post/${p.id}`}>
                    <Heading fontSize="xl">{p.title}</Heading>
                  </RouterChakraLink>{" "}
                  <Text>
                    posted by{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {p.creator.username}
                    </span>
                  </Text>
                  <Flex>
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    <EditDeletePostButtons id={p.id} creatorId={p.creator.id} />
                  </Flex>
                </Box>
              </Flex>
            ),
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
                // updateQuery: (
                //   previousValues,
                //   { fetchMoreResult },
                // ): PostsQuery => {
                //   if (fetchMoreResult) {
                //     return previousValues as PostsQuery;
                //   }

                //   return {
                //     __typename: `Query`,
                //     posts: {
                //       __typename: `PaginatedPosts`,
                //       hasMore: (fetchMoreResult as PostsQuery).posts.hasMore,
                //       posts: [
                //         ...(previousValues as PostsQuery).posts.posts,
                //         ...(fetchMoreResult as PostsQuery).posts.posts,
                //       ],
                //     },
                //   };
                // },
              });
            }}
            isLoading={loading}
            mx="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : (
        <br />
      )}
    </Layout>
  );
};

export default HomePage;
