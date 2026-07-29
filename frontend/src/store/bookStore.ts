import { create } from "zustand";
import api from "../services/api";

interface iBook {
  id: string;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
}

interface iBookStore {
  books: iBook[];
  currentBook: iBook | null;
  loading: boolean;
  fetchBooks: () => Promise<void>;
  fetchBook: (id: string) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  //   createAuthor: (author: any) => Promise<void>;
}

const useBookStore = create<iBookStore>((set) => ({
  books: [],
  currentBook: null,
  loading: false,

  fetchBooks: async () => {
    set({ loading: true });

    try {
      const response = await api.get("/books");
      set({ books: response.data, loading: false });
      console.log("start");
    } catch (e) {
      console.log(e);
    }
  },

  fetchBook: async (id) => {
    set({ loading: true });

    try {
      const response = await api.get(`/book/${id}`);
      set({ currentBook: response.data, loading: false });
    } catch (e) {
      console.log(e);
    }
  },

  deleteBook: async (id) => {
    set({ loading: true });

    try {
      await api.delete(`/books/${id}`);
      set({ loading: false });
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useBookStore;
