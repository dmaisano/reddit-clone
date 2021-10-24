import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../generated/graphql";
import { generatePost } from "../utils";
import { useGetPostFromUrl } from "../utils/useGetPostFromUrl";

interface EditPostPageProps {}

const EditPostPage: React.FC<EditPostPageProps> = ({}) => {
  const location = useLocation();
  const history = useHistory();
  const { data, loading } = useGetPostFromUrl();
  const [updatePost] = useUpdatePostMutation();
  const [isDisabled, setDisabled] = useState(true);
  const [deletePost] = useDeletePostMutation();

  return (
    <Layout>
      {loading ? (
        <Box>loading...</Box>
      ) : !data?.post ? (
        <Box>could not find post</Box>
      ) : (
        <Formik
          initialValues={{ title: data.post.title, text: data.post.text }}
          onSubmit={async (values) => {
            if (data && data.post?.id) {
              await updatePost({ variables: { id: data.post.id, ...values } });
              history.goBack();
            }
          }}
        >
          {({ isSubmitting, setValues }) => (
            <Form>
              <InputField
                name="title"
                placeholder="title"
                label="Title"
                disabled
              />
              <Box mt={4}>
                <InputField
                  textarea
                  // @ts-ignore
                  rows={12}
                  name="text"
                  placeholder="text..."
                  label="Body"
                  disabled
                />
              </Box>
              <Button
                onClick={() => {
                  if (isDisabled) {
                    setDisabled(false);
                  }
                  return generatePost(setValues);
                }}
                mt={4}
                w="full"
                isLoading={isSubmitting}
                colorScheme="telegram"
              >
                generate new post
              </Button>
              <Button
                mt={4}
                w="full"
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
                disabled={isDisabled}
              >
                update post
              </Button>
              <Button
                mt={4}
                w="full"
                isLoading={isSubmitting}
                colorScheme="red"
                disabled={!data.post?.id}
                onClick={() => {
                  if (data.post?.id) {
                    deletePost({
                      variables: { id: data.post.id },
                      update: (cache) => {
                        cache.evict({
                          id: `Post:${data.post?.id}`,
                        });
                      },
                    });

                    if (location.pathname.match(/^\/post\/edit\/[0-9]+$/g)) {
                      history.push(`/`);
                    }
                  }
                }}
              >
                delete post
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default EditPostPage;
