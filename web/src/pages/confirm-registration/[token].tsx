import React from "react";
import { Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/button";
import { useConfirmRegistrationQuery } from "../../generated/graphql";
import withApollo from "../../utils/withApollo";
import BadRequest from "../../components/BadRequest";
import Head from "next/head";
import { SITE_TITLE } from "../../constants";

interface ConfirmRegistrationProps {}

const ConfirmRegistration: NextPage<ConfirmRegistrationProps> = ({}) => {
  const router = useRouter();

  const { token } = router.query;
  const { data, error } = useConfirmRegistrationQuery({
    variables: {
      token: token as string,
    },
  });

  if (error) {
    return <BadRequest />;
  }

  return (
    <>
      <Head>
        <title>{`Confirm Registration | ${SITE_TITLE}`}</title>
        <meta
          property="og:title"
          content={`Confirm Registration | ${SITE_TITLE}`}
          key="title"
        />
      </Head>
      <Text>token: {token}</Text>
      {/* <Text>{JSON.stringify({ data, error })}</Text> */}
      if ()
    </>
  );
};

export default withApollo({ ssr: false })(ConfirmRegistration as any);
