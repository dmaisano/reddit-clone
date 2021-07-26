import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { GraphQLError } from "graphql";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import mockPosts from "../../../library/constants/mock_posts";
import { getRandomInt, sleep } from "../../../library/utils";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

interface CreatePostProps {}

const CreatePost: NextPage<CreatePostProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();

  const generatePost = (
    setValues: (
      values: React.SetStateAction<{
        title: string;
        text: string;
      }>,
      shouldValidate?: boolean | undefined,
    ) => void,
  ) => {
    const { text, title } = mockPosts[getRandomInt(999)];

    setValues({
      text,
      title,
    });

    return {
      text,
      title,
    };
  };

  const handleError = (error: GraphQLError | undefined) => {
    if (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, helpers) => {
          try {
            let { text, title } = values;

            // user probably didn't hit generate post, generate mock post and then submit
            if (values.title === `` || values.text === ``) {
              const mockPost = generatePost(helpers.setValues);
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
              handleError(errors[0]);
            }

            router.push(`/`);
          } catch (error) {
            console.log({ error });
            handleError(error);
          }
        }}
      >
        {({ isSubmitting, values, setValues }) => (
          <Form>
            <InputField
              style={{ opacity: `1` }}
              name="title"
              placeholder="title"
              value={values.title}
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
                value={values.text}
                label="Body"
                disabled
              />
            </Box>
            <Button
              onClick={() => generatePost(setValues)}
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
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);
