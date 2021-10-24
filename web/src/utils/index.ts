import { GraphQLError } from "graphql";
import { useLocation } from "react-router-dom";
import mockPosts from "../constants/mock_posts";

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const typesafeFilter = <T>(
  arrayToFilter: any[],
  filterFunc: (el: T) => boolean,
): Array<T> => {
  const res = new Array<T>();

  for (const el of arrayToFilter) {
    if (filterFunc(el)) {
      res.push(el);
    }
  }

  return res;
};

export const generatePost = (
  setValues?: (
    values: React.SetStateAction<{
      title: string;
      text: string;
    }>,
    shouldValidate?: boolean | undefined,
  ) => void,
) => {
  const { text, title } = mockPosts[getRandomInt(999)];

  if (typeof setValues === "function") {
    setValues({
      text,
      title,
    });
  }

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

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
