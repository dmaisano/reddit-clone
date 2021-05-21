import { useApolloClient } from "@apollo/client";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { NextChakraLink } from "./NextChakraLink";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  let body: JSX.Element | null = null;

  // data is loading
  if (loading) {
  }
  // user not logged in
  else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  }
  // user is logged in
  else {
    body = (
      <Flex align="center">
        <Button as={NextChakraLink} mr={4} href="/create-post">
          <b>create post</b>
        </Button>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutLoading}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="tan"
      p={4}
      ml="auto"
      align="center"
    >
      <Flex flex={1} maxW={800} mx="auto" align="center">
        <NextChakraLink href="/">
          <Heading>LiReddit</Heading>
        </NextChakraLink>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
