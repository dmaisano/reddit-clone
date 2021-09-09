import { Button } from "@chakra-ui/button";
import { Box, Center, Link, Text } from "@chakra-ui/react";
import { GraphQLError } from "graphql";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SITE_TITLE } from "../../constants";
import {
  MeDocument,
  MeQuery,
  useConfirmRegistrationMutation,
} from "../../generated/graphql";
import withApollo from "../../utils/withApollo";
import NextLink from "next/link";
import { sleep } from "../../../../library/utils";
import Layout from "../../components/Layout";

const Title = (
  <Head>
    <title>{`Confirm Registration | ${SITE_TITLE}`}</title>
    <meta
      property="og:title"
      content={`Confirm Registration | ${SITE_TITLE}`}
      key="title"
    />
  </Head>
);

interface ConfirmRegistrationProps {
  token: string;
}

const ConfirmRegistration: NextPage<ConfirmRegistrationProps> = ({ token }) => {
  const [confirmRegistration] = useConfirmRegistrationMutation();
  const [state, setState] = useState<{
    isLoading: boolean;
    isError: boolean;
  }>({ isError: false, isLoading: true });

  const confirm = async () => {
    await sleep(1000);
    let isError = false;

    if (token && typeof token === "string") {
      try {
        const { data } = await confirmRegistration({
          variables: {
            token,
          },
          update: (cache, { data }) => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: `Query`,
                me: data?.confirmRegistration,
              },
            });
          },
        });
      } catch (error) {
        isError = true;
        console.log({ error });
        alert((error as GraphQLError).message);
      } finally {
        console.log({ state });
        setState({
          ...state,
          isError,
          isLoading: false,
        });
      }
    }
  };

  // Run once on component load
  useEffect(() => {
    confirm();
  }, []);

  if (state?.isError) {
    return (
      <Layout variant="small">
        {Title}
        <Center style={{ height: "100vh" }}>
          <Box textAlign="center">
            <Text fontSize="4xl" pb="2">
              Error occured.
            </Text>
          </Box>
        </Center>
      </Layout>
    );
  }

  return (
    <Layout variant="regular">
      {Title}
      <Center style={{ height: "100vh" }}>
        <Box textAlign="center">
          {state?.isLoading ? (
            <Text fontSize="4xl" pb="2">
              Loading ⏳
            </Text>
          ) : (
            <>
              <Text fontSize="4xl" pb="2">
                Submission successful ✔️
              </Text>
              <Text fontSize="2xl">User created 🎉</Text>
              <Button mx="4" mt="6" colorScheme="teal" w="fit-content">
                <Link as={NextLink} href="/">
                  home 🏠
                </Link>
              </Button>
            </>
          )}
        </Box>
      </Center>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    // will be passed to the page component as props
    props: {
      token: context.query.token || ``,
    },
  };
}

export default withApollo({ ssr: false })(ConfirmRegistration as any);
