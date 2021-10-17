import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import EditDeletePostButtons from "../components/EditDeletePostButtons";
import Layout from "../components/Layout";
import { NextChakraLink } from "../components/NextChakraLink";
import UpdootSection from "../components/UpdootSection";
import { SITE_TITLE } from "../constants";
import { usePostsQuery } from "../generated/graphql";
import withApollo from "../utils/withApollo";

interface IndexProps {}

const Index: NextPage<IndexProps> = () => {
  // const [variables, setVariables] = useState({
  //   limit: 15,
  //   cursor: null as null | string,
  // });

  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta property="og:title" content={SITE_TITLE} key="title" />
      </Head>
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
                    <NextChakraLink href="/post[id]" as={`/post/${p.id}`}>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </NextChakraLink>{" "}
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
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
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
    </>
  );
};

// export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
export default withApollo({ ssr: true })(Index);
