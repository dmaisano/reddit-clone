import { Button } from "@chakra-ui/button";
import { Box, Center, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { RouterChakraLink } from "../components/RouterChakraLink";
import Wrapper from "../components/Wrapper";
import {
  useGenerateUsernameQuery,
  useRegisterMutation,
} from "../generated/graphql";
import { passwordSchema } from "../utils/passwordSchema";
import { toErrorMap } from "../utils/toErrorMap";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
  const { data: queryResult } = useGenerateUsernameQuery();
  const [register] = useRegisterMutation();

  const username = queryResult?.generateUsername as string;

  return (
    <Layout>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={passwordSchema}
        onSubmit={async (values, actions) => {
          const response = await register({
            variables: {
              options: {
                email: values.email,
                password: values.password,
                username,
              },
            },
          });

          const errors = response.data?.register;
          if (errors && errors?.length > 0) {
            actions.setErrors(toErrorMap(errors));
          } else {
            actions.setStatus({ success: true });
          }
        }}
      >
        {({ isSubmitting, values, status, errors }) =>
          !status?.success ? (
            <Wrapper variant="small">
              <Form>
                <InputField
                  name="username"
                  value={username}
                  placeholder="username"
                  label="Username"
                  disabled
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
                <Box mt={4}>
                  <InputField
                    name="confirmPassword"
                    placeholder="confirm password"
                    label="Confirm Password"
                    type="password"
                  />
                </Box>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                  disabled={
                    Object.keys(errors).length > 0 ||
                    username === "" ||
                    values.email === "" ||
                    values.confirmPassword.length <= 0 ||
                    values.password.length <= 0
                  }
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
                  <RouterChakraLink to="/">home 🏠</RouterChakraLink>
                </Button>
              </Box>
            </Center>
          )
        }
      </Formik>
    </Layout>
  );
};

export default RegisterPage;
