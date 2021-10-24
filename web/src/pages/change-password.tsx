import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { RouterChakraLink } from "../components/RouterChakraLink";
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from "../generated/graphql";
import { passwordSchema } from "../utils/passwordSchema";
import { toErrorMap } from "../utils/toErrorMap";

interface ChangePasswordPageProps {}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = ({}) => {
  const { token } = useParams<{ token?: string }>();
  const history = useHistory();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={passwordSchema}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            variables: {
              newPassword: values.password,
              token: typeof token === "string" ? token : ``,
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
            history.push("/");
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
                <RouterChakraLink
                  to="/forgot-password"
                  textDecoration="underline"
                >
                  click here to get a new one
                </RouterChakraLink>
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
  );
};

export default ChangePasswordPage;
