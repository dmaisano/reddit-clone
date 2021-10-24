import { usePostQuery } from "../generated/graphql";
import { useGetPostIntId } from "./useGetPostIntId";

export const useGetPostFromUrl = () => {
  const intId = useGetPostIntId();

  return usePostQuery({
    variables: {
      id: intId,
    },
  });
};
