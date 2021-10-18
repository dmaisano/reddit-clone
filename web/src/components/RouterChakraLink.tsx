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
  to,
  replace,
  children,
  ...chakraProps
}: RouterChakraLinkProps) => {
  return (
    <RouterLink to={to} replace={replace}>
      <ChakraLink {...chakraProps}>{children}</ChakraLink>
    </RouterLink>
  );
};
