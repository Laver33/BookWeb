import { useEffect } from "react";
import useBookStore from "../store/bookStore";
import useAuthorStore from "../store/authorStore";
import useNoteStore from "@/store/noteStore";

const useFetchAllData = () => {
  const { fetchBooks } = useBookStore();
  const { fetchAuthors } = useAuthorStore();
  const { fetchNotes } = useNoteStore();

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchNotes();
  }, []);
};

export default useFetchAllData;
