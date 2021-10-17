import React from "react";
import { Center, Text } from "@chakra-ui/react";

interface BadRequestProps {}

const BadRequest: React.FC<BadRequestProps> = ({}) => {
  return (
    <Center style={{ height: "100vh" }}>
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
    </Center>
  );
};

export default BadRequest;
