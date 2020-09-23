import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/core";
import { useField } from "formik";
import React from "react";

type InputFieldProps = React.HTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor="name">{label}</FormLabel>
      <Input {...field} id={field.name} placeholder={props.placeholder} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
