import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (!loading && !data?.me) {
      history.replace(`/login?next=${location.pathname}`);
    }
  }, [loading, data, history, location.pathname]);
};
