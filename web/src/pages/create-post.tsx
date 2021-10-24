import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { generatePost, handlePostError } from "../utils";
import { useIsAuth } from "../utils/useIsAuth";

interface CreatePostPageProps {}

const CreatePostPage: React.FC<CreatePostPageProps> = ({}) => {
  const history = useHistory();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  const [post, setPost] = useState<{ text: string; title: string }>(
    generatePost(),
  );

  return (
    <Layout>
      <Formik
        initialValues={{ title: post.title, text: post.text }}
        onSubmit={async ({ title, text }, actions) => {
          try {
            setPost(generatePost(actions.setValues));

            const { errors } = await createPost({
              variables: { input: { text, title } },
              update: (cache) => {
                cache.evict({ fieldName: `posts:{}` });
              },
            });

            if (errors?.length) {
              handlePostError(errors[0]);
            }

            history.push(`/`);
          } catch (error) {
            console.log({ error });
            handlePostError(error as any);
          }
        }}
      >
        {({ isSubmitting, setValues }) => (
          <Form>
            <InputField
              style={{ opacity: `1` }}
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
                style={{ opacity: `1` }}
                name="text"
                placeholder="text..."
                label="Body"
                disabled
              />
            </Box>
            <Button
              onClick={() => {
                return generatePost(setValues);
              }}
              mt={4}
              w="full"
              isLoading={isSubmitting}
              colorScheme="telegram"
            >
              re-generate post
            </Button>
            <Button
              mt={4}
              w="full"
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreatePostPage;
