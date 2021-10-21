import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { RouterLink, RouterLinkProps } from ".";

export type RouterChakraLinkProps = PropsWithChildren<
  RouterLinkProps & Omit<ChakraLinkProps, "as">
>;

export const RouterChakraLink = ({
  children,
  ...props
}: RouterChakraLinkProps) => {
  return (
    <ChakraLink as={RouterLink} {...props}>
      {children}
    </ChakraLink>
  );
};
