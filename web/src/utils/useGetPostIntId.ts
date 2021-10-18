import { useParams } from "react-router-dom";

export const useGetPostIntId = () => {
  const { id } = useParams<{ id: string }>();

  let intId: number = -1;
  if (id && typeof id === "string") {
    intId = parseInt(id);
  }

  return intId;
};
