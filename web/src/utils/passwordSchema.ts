import * as yup from "yup";

/**
 * reference: https://dev.to/estheragbaje/how-to-build-a-simple-form-with-validation-using-yup-and-formik-beginner-friendly-521j
 */
export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
      "Password must contain at least 8 characters, one number and one special character",
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (password) => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match"),
    }),
});
