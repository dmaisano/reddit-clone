import { Box, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";
import Layout from "../../components/Layout";
import { SITE_TITLE } from "../../constants";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import withApollo from "../../utils/withApollo";

interface PostProps {}

const Post: NextPage<PostProps> = ({}) => {
  const { data, error, loading } = useGetPostFromUrl();

  if (loading) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box>{error.message}</Box>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{`Edit Post | ${SITE_TITLE}`}</title>
        <meta
          property="og:title"
          content={`Edit Post | ${SITE_TITLE}`}
          key="title"
        />
      </Head>
      <Layout>
        <Heading mb={4}>{data.post.title}</Heading>
        <Box mb={4}>
          <Text>{data.post.text}</Text>
        </Box>
        <EditDeletePostButtons
          id={data.post.id}
          creatorId={data.post.creator.id}
        />
      </Layout>
    </>
  );
};

// export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
export default withApollo({ ssr: true })(Post);
