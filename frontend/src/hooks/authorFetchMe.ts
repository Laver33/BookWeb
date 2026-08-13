import { useEffect } from "react";
import useAuthorStore from "../store/authorStore";

const useFetchMe = () => {
  const { fetchAuthors, getMe } = useAuthorStore();

  useEffect(() => {
    fetchAuthors();
    getMe();
  }, []);
};

export default useFetchMe;
