import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register(values);

          if (res.data?.register.errors) {
            setErrors(toErrorMap(res.data.register.errors));
          } else if (res.data?.register.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField name="username" placeholder="username" label="Username" />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                // type="password"
              />
            </Box>

            <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
