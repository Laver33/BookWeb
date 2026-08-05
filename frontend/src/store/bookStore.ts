import { create } from "zustand";
import api from "../services/api";
import type { iAuthor } from "./authorStore";

interface iBook {
  id: string;
  title: string;
  description: string;
  price: number | null;
  createdAt: Date;

  likes?: number;
  views?: number;
  author: iAuthor;
}

interface iBookStore {
  books: iBook[];
  currentBook: iBook | null;
  loading: boolean;
  fetchBooks: () => Promise<void>;
  fetchBook: (id: string) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  createBook: (
    bookData: Omit<iBook, "id" | "createdAt" | "author">,
  ) => Promise<iBook>;
  putLikeBook: (id: string) => Promise<void>;
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
    } catch (e) {
      set({ loading: false });
      console.log(e);
    }
  },

  putLikeBook: async (id) => {
    set({ loading: true });

    try {
      const response = await api.put(`/book/${id}/like`);
      set((_state) => ({
        currentBook: response.data.book || response.data,
        loading: false,
      }));
    } catch (e) {
      set({ loading: false });
      console.error(e);
    }
  },

  fetchBook: async (id) => {
    set({ loading: true });

    try {
      const response = await api.get(`/book/${id}`);
      set({ currentBook: response.data, loading: false });
    } catch (e) {
      set({ loading: false });
      console.log(e);
    }
  },

  deleteBook: async (id) => {
    set({ loading: true });

    try {
      await api.delete(`/book/${id}`);
      set({ loading: false });
    } catch (e) {
      set({ loading: false });
      console.log(e);
    }
  },

  createBook: async (bookData) => {
    set({ loading: true });

    try {
      const response = await api.post("/book", {
        title: bookData.title,
        description: bookData.description,
        price: bookData.price ?? undefined,
      });

      const newBook = response.data.book || response.data;
      set((state) => ({
        books: [...state.books, newBook],
        loading: false,
      }));

      return newBook;
    } catch (e) {
      console.error(e);
      set({ loading: false });
      throw e;
    }
  },
}));

export default useBookStore;
