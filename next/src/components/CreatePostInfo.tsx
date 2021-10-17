import React from "react";
import { Text } from "@chakra-ui/react";

const CreatePostInfo: React.FC = () => {
  return (
    <Text
      fontSize="large"
      fontWeight="medium"
      border="1px"
      borderStyle="dashed"
      padding="4"
    >
      To create a post, first click "generate post" to fill with mock data, then
      click "create post".
    </Text>
  );
};

export default CreatePostInfo;
