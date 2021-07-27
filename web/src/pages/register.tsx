import { Button } from "@chakra-ui/button";
import { Box, Center, Link, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { SITE_TITLE } from "../constants";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import withApollo from "../utils/withApollo";

interface RegisterProps {}

const Register: NextPage<RegisterProps> = ({}) => {
  const [register] = useRegisterMutation();

  return (
    <>
      <Head>
        <title>{`Register | ${SITE_TITLE}`}</title>
        <meta
          property="og:title"
          content={`Register | ${SITE_TITLE}`}
          key="title"
        />
      </Head>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, actions) => {
          const response = await register({
            variables: { options: values },
          });

          const errors = response.data?.register;
          if (errors && errors?.length > 0) {
            actions.setErrors(toErrorMap(errors));
          } else {
            actions.setStatus({ success: true });
          }
        }}
      >
        {({ isSubmitting, status }) =>
          !status?.success ? (
            <Wrapper variant="small">
              <Form>
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                />
                <Box mt={4}>
                  <InputField
                    name="email"
                    placeholder="email"
                    label="Email"
                    type="email"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  register
                </Button>
              </Form>
            </Wrapper>
          ) : (
            <Center style={{ height: "100vh" }}>
              <Box textAlign="center">
                <Text fontSize="4xl" pb="2">
                  Submission successful ✔️
                </Text>
                <Text fontSize="2xl">
                  Please check your email to confirm account registration 📧
                </Text>
                <Button mx="4" mt="6" colorScheme="teal" w="fit-content">
                  <Link as={NextLink} href="/">
                    home 🏠
                  </Link>
                </Button>
              </Box>
            </Center>
          )
        }
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(Register);
