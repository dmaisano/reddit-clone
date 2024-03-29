import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { SITE_TITLE } from "../constants";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import withApollo from "../utils/withApollo";
import cookies from "js-cookie";
import { setAccessToken } from "../utils/token";

interface LoginProps {}

const Login: NextPage<LoginProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <>
      <Head>
        <title>{`Login | ${SITE_TITLE}`}</title>
        <meta
          property="og:title"
          content={`Login | ${SITE_TITLE}`}
          key="title"
        />
      </Head>
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

              // if (typeof router.query.next === "string") {
              //   router.push(router.query.next);
              // } else {
              //   router.push(`/`);
              // }
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
                <NextLink href="/forgot-password">
                  <Link ml="auto">forgot password?</Link>
                </NextLink>
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
    </>
  );
};

export default withApollo({ ssr: false })(Login);
