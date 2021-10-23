import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { RouterChakraLink } from "../components/RouterChakraLink";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { useQuery } from "../utils";
import { toErrorMap } from "../utils/toErrorMap";
import { setAccessToken } from "../utils/token";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const history = useHistory();
  const query = useQuery();
  const [login] = useLoginMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: `Query`,
                  me: data?.login.user,
                },
              });
              cache.evict({ fieldName: "posts:{}" });
            },
          });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (
            response.data?.login.user &&
            response.data.login.accessToken
          ) {
            setAccessToken(response.data.login.accessToken);

            const next = query.get(`next`);
            if (typeof next === "string") {
              history.push(next);
            } else {
              history.push(`/`);
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              autoComplete="username"
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex mt={2}>
              <RouterChakraLink ml="auto" to="/forgot-password">
                forgot password
              </RouterChakraLink>

              {/* <NextLink href="/forgot-password">
                <Link ml="auto">forgot password?</Link>
              </NextLink> */}
            </Flex>
            <Button
              mt={4}
              w="full"
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default LoginPage;
