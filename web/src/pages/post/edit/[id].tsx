import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import { useUpdatePostMutation } from "../../../generated/graphql";
import { generatePost } from "../../../utils";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import { useGetPostIntId } from "../../../utils/useGetPostIntId";
import withApollo from "../../../utils/withApollo";

interface EditPostProps {}

const EditPost: NextPage<EditPostProps> = ({}) => {
  const router = useRouter();
  const intId = useGetPostIntId();
  const { data, loading } = useGetPostFromUrl(intId);
  const [updatePost] = useUpdatePostMutation();
  const [isDisabled, setDisabled] = useState(true);

  if (loading) {
    return (
      <Layout>
        <Box>loading...</Box>
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
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({ variables: { id: intId, ...values } });
          router.back();
        }}
      >
        {({ isSubmitting, setValues }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
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
              generate post
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
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditPost);
