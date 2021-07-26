import { Button } from "@chakra-ui/button";
import { Box, Center, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { SITE_TITLE } from "../constants";
import { useRegisterMutation } from "../generated/graphql";
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
            // update: (cache, { data }) => {
            // cache.writeQuery<MeQuery>({
            //   query: MeDocument,
            //   data: {
            //     __typename: `Query`,
            //     me: data?.register.user,
            //   },
            // });
            // },
          });

          const errors = response.data?.register;
          if (errors && errors?.length > 0) {
            actions.setErrors(toErrorMap(errors));
          } else {
            actions.setStatus({ success: true });
          }

          // else if (response.data?.register.user) {
          //   actions.setStatus({ success: true });
          // }
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
              </Box>
            </Center>
          )
        }
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(Register);
