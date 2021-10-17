import { usePostQuery } from "../generated/graphql";
import { useGetPostIntId } from "./useGetPostIntId";

export const useGetPostFromUrl = (intId?: number) => {
  if (!intId) {
    intId = useGetPostIntId();
  }

  return usePostQuery({
    variables: {
      id: intId,
    },
  });
};
