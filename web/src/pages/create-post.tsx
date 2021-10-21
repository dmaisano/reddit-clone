import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { generatePost, handlePostError, sleep } from "../utils";
import { useIsAuth } from "../utils/useIsAuth";

interface CreatePostPageProps {}

const CreatePostPage: React.FC<CreatePostPageProps> = ({}) => {
  const history = useHistory();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  const [isDisabled, setDisabled] = useState(true);

  return (
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

            history.push(`/`);
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
  );
};

export default CreatePostPage;
