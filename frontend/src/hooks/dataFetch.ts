import { useEffect } from "react";
import useBookStore from "../store/bookStore";
import useAuthorStore from "../store/authorStore";

const useFetchAllData = () => {
  const { fetchBooks } = useBookStore();
  const { fetchAuthors } = useAuthorStore();

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);
};

export default useFetchAllData;
