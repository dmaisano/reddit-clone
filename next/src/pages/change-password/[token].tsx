import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputField from "../../components/InputField";
import Layout from "../../components/Layout";
import { SITE_TITLE } from "../../constants";
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { passwordSchema } from "../../utils/passwordSchema";
import { toErrorMap } from "../../utils/toErrorMap";
import withApollo from "../../utils/withApollo";

interface ChangePasswordProps {}

const ChangePassword: NextPage<ChangePasswordProps> = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <>
      <Head>
        <title>{`Change Password | ${SITE_TITLE}`}</title>
        <meta
          property="og:title"
          content={`Change Password | ${SITE_TITLE}`}
          key="title"
        />
      </Head>
      <Layout variant="small">
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={passwordSchema}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({
              variables: {
                newPassword: values.password,
                token:
                  typeof router.query.token === "string"
                    ? router.query.token
                    : ``,
              },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: `Query`,
                    me: data?.changePassword.user,
                  },
                });
              },
            });
            if (response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (response.data?.changePassword.user) {
              // worked
              router.push("/");
            }
          }}
        >
          {({ isSubmitting, errors, values }) => (
            <Form>
              <InputField
                name="password"
                placeholder="new password"
                label="New Password"
                type="password"
              />
              <Box mt={4}>
                <InputField
                  name="confirmPassword"
                  placeholder="confirm password"
                  label="Confirm Password"
                  type="password"
                />
              </Box>
              {tokenError ? (
                <Flex>
                  <Box mr={2} color="red">
                    {tokenError}
                  </Box>
                  <NextLink href="/forgot-password">
                    <Link>click here to get a new one</Link>
                  </NextLink>
                </Flex>
              ) : null}
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
                disabled={
                  Object.keys(errors).length > 0 ||
                  values.confirmPassword.length <= 0 ||
                  values.password.length <= 0
                }
              >
                change password
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    </>
  );
};

// export default withUrqlClient(createUrqlClient)(ChangePassword as any);

export default withApollo({ ssr: false })(ChangePassword);
