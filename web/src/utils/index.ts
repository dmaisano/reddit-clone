import { GraphQLError } from "graphql";
import mockPosts from "../../library/constants/mock_posts";
import { getRandomInt } from "../../library/utils";

export const generatePost = (
  setValues: (
    values: React.SetStateAction<{
      title: string;
      text: string;
    }>,
    shouldValidate?: boolean | undefined,
  ) => void,
) => {
  const { text, title } = mockPosts[getRandomInt(999)];

  setValues({
    text,
    title,
  });

  return {
    text,
    title,
  };
};

export const handlePostError = (error: GraphQLError | undefined) => {
  if (error) {
    alert(error.message);
    return;
  }
};
