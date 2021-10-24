import { Box, Center, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import EditDeletePostButtons from "../components/EditDeletePostButtons";
import Layout from "../components/Layout";
import { useGetPostFromUrl } from "../utils/useGetPostFromUrl";

interface ViewPostPageProps {}

const ViewPostPage: React.FC<ViewPostPageProps> = ({}) => {
  const { data, error, loading } = useGetPostFromUrl();

  return (
    <Layout>
      {loading ? (
        <Center>loading...</Center>
      ) : error ? (
        <Center>{error.message}</Center>
      ) : !data?.post ? (
        <Center>could not find post</Center>
      ) : (
        <div>
          <Heading mb={4}>{data.post.title}</Heading>
          <Box mb={4}>
            <Text>{data.post.text}</Text>
          </Box>
          <EditDeletePostButtons
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </div>
      )}
    </Layout>
  );
};

export default ViewPostPage;
