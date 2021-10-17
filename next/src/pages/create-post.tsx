import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { sleep } from "../../library/utils";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { SITE_TITLE } from "../constants";
import { useCreatePostMutation } from "../generated/graphql";
import { generatePost, handlePostError } from "../utils";
import { useIsAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

interface CreatePostProps {}

const CreatePost: NextPage<CreatePostProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  const [isDisabled, setDisabled] = useState(true);

  return (
    <>
      <Head>
        <title>{`Create Post | ${SITE_TITLE}`}</title>
        <meta
          property="og:title"
          content={`Create Post | ${SITE_TITLE}`}
          key="title"
        />
      </Head>
      <Layout variant="small">
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values, actions) => {
            try {
              let { text, title } = values;

              // user probably didn't hit generate post, generate mock post and then submit
              if (values.title === `` || values.text === ``) {
                const mockPost = generatePost(actions.setValues);
                title = mockPost.title;
                text = mockPost.text;
                await sleep(1000);
              }

              const { errors } = await createPost({
                variables: { input: { text, title } },
                update: (cache) => {
                  cache.evict({ fieldName: `posts:{}` });
                },
              });

              if (errors?.length) {
                handlePostError(errors[0]);
              }

              router.push(`/`);
            } catch (error) {
              console.log({ error });
              handlePostError(error as any);
            }
          }}
        >
          {({ isSubmitting, values, setValues }) => (
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
                  rows={8}
                  style={{ opacity: `1` }}
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
                create post
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    </>
  );
};

export default withApollo({ ssr: false })(CreatePost);
