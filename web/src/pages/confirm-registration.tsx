import { Box, Button, Center, Text } from "@chakra-ui/react";
import { GraphQLError } from "graphql";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { RouterChakraLink } from "../components/RouterChakraLink";
import {
  MeDocument,
  MeQuery,
  useConfirmRegistrationMutation,
} from "../generated/graphql";
import { setAccessToken } from "../utils/token";

interface ConfirmRegistrationPageProps {}

const ConfirmRegistrationPage: React.FC<ConfirmRegistrationPageProps> =
  ({}) => {
    const { token } = useParams<{ token?: string }>();
    const [confirmRegistration] = useConfirmRegistrationMutation();
    const [state, setState] = useState<{
      isLoading: boolean;
      isError: boolean;
      errorMessage?: string;
    }>({ isError: false, isLoading: true, errorMessage: undefined });

    useEffect(() => {
      const confirm = async (token: string) => {
        let isError = false;
        let errorMessage: string | undefined = undefined;

        try {
          const { data } = await confirmRegistration({
            variables: { token },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: `Query`,
                  me: data?.confirmRegistration?.user,
                },
              });
            },
          });

          if (data?.confirmRegistration?.accessToken) {
            setAccessToken(data.confirmRegistration.accessToken);
          }
        } catch (error) {
          isError = true;
          errorMessage = (error as GraphQLError).message;
        } finally {
          setState({
            ...state,
            errorMessage,
            isError,
            isLoading: false,
          });
        }
      };

      if (typeof token === "string" && state.isLoading) {
        confirm(token);
      }
      // eslint-disable-next-line
    }, [token]);

    return (
      <Layout variant="regular">
        <Center style={{ height: "90%" }}>
          <Box textAlign="center">
            {state?.isLoading ? (
              <Text fontSize="4xl" pb="2">
                Loading ⏳
              </Text>
            ) : state.isError ? (
              <div>
                <Text fontSize="4xl" mb="4">
                  Error occurred.
                </Text>
                <Text fontSize="2xl">{state.errorMessage}</Text>
              </div>
            ) : (
              <div>
                <Text fontSize="4xl" pb="2">
                  Submission successful ✔️
                </Text>
                <Text fontSize="2xl">User created 🎉</Text>
                <Button mx="4" mt="6" colorScheme="teal" w="fit-content">
                  <RouterChakraLink to="/">home 🏠</RouterChakraLink>
                </Button>
              </div>
            )}
          </Box>
        </Center>
      </Layout>
    );
  };

export default ConfirmRegistrationPage;
