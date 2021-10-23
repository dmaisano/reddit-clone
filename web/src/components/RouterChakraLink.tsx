import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import React from "react";
import { PropsWithChildren } from "react";
import { RouterLink, RouterLinkProps } from ".";

export type RouterChakraLinkProps = PropsWithChildren<
  RouterLinkProps & Omit<ChakraLinkProps, "as">
>;

export const RouterChakraLink = React.forwardRef(
  ({ to, children, innerRef, ...props }: RouterChakraLinkProps, ref) => {
    return (
      <ChakraLink innerRef={innerRef} as={RouterLink} to={to} {...props}>
        {children}
      </ChakraLink>
    );
  },
);
