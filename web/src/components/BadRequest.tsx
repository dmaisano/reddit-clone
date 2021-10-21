import React from "react";
import { Button, Center, Text } from "@chakra-ui/react";
import { RouterChakraLink } from "./RouterChakraLink";

interface BadRequestProps {}

const BadRequest: React.FC<BadRequestProps> = ({}) => {
  return (
    <Center style={{ height: "90%" }} flexDirection="column">
      <Text fontSize="3xl" fontWeight="bold" whiteSpace="pre">
        {/* prettier-ignore */}
        <span>|------------|</span> <br />
        {/* prettier-ignore */}
        <span>|    BAD      |</span> <br />
        {/* prettier-ignore */}
        <span>| REQUEST |</span> <br />
        {/* prettier-ignore */}
        <span>|------------|</span> <br />
        {/* prettier-ignore */}
        <span>(\__/) ||</span> <br />
        {/* prettier-ignore */}
        <span>(•ㅅ•) ||</span> <br />
        {/* prettier-ignore */}
        <span>/ 　 づ</span>
      </Text>

      <Button colorScheme="teal" mt="6" as={RouterChakraLink} to="/">
        Go Home
      </Button>
    </Center>
  );
};

export default BadRequest;
