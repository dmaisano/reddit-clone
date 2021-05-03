import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { NextChakraLink } from "../components/NextChakraLink";
import Updootsection from "../components/UpdootSection";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { DeleteIcon } from "@chakra-ui/icons";
interface IndexProps {}

const Index: NextPage<IndexProps> = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching, ...other }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();

  return (
    <Layout>
      <br />
      {!data ? (
        fetching ? (
          <div>loading...</div>
        ) : (
          <div>no posts found</div>
        )
      ) : (
        <Stack pt={8}>
          {data.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <Updootsection post={p} />
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
                    <IconButton
                      aria-label="Delete Post"
                      color="red.400"
                      ml="auto"
                      onClick={() => {
                        deletePost({ id: p.id });
                      }}
                      icon={<DeleteIcon />}
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
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
