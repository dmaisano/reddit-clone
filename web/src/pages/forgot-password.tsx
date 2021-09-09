import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { SITE_TITLE } from "../constants";
import { useForgotPasswordMutation } from "../generated/graphql";
import withApollo from "../utils/withApollo";

interface ForgotPasswordProps {}

const ForgotPassword: NextPage<ForgotPasswordProps> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <>
      <Head>
        <title>{`Forgot Password | ${SITE_TITLE}`}</title>
        <meta
          property="og:title"
          content={`Forgot Password | ${SITE_TITLE}`}
          key="title"
        />
      </Head>
      <Layout variant="small">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            await forgotPassword({ variables: values });
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box>
                if an account with that email exists, we sent you an email
              </Box>
            ) : (
              <Form>
                <Box mt={4}>
                  <InputField
                    name="email"
                    placeholder="email"
                    label="Email"
                    type="email"
                  />
                </Box>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  forgot password
                </Button>
              </Form>
            )
          }
        </Formik>
      </Layout>
    </>
  );
};

export default withApollo({ ssr: true })(ForgotPassword);
