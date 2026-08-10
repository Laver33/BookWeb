import { create } from "zustand";
import api from "../services/api";
import type { iAuthor } from "./authorStore";
import type { iNote } from "./noteStore";

export interface iBook {
  id: string;
  title: string;
  description: string;
  price: number | null;
  createdAt: Date;
  recommendations: number;

  likes?: number;
  views?: number;
  author: iAuthor;
  notes?: iNote[];
}

interface iBookStore {
  books: iBook[];
  currentBook: iBook | null;
  loading: boolean;
  fetchBooks: () => Promise<void>;
  fetchBook: (id: string) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  createBook: (
    bookData: Omit<iBook, "id" | "createdAt" | "author" | "recommendations">,
  ) => Promise<iBook>;
  putLikeBook: (id: string) => Promise<void>;

  putRecommendBook: (id: string) => Promise<void>;
  putUnrecommendBook: (id: string) => Promise<void>;
}

const useBookStore = create<iBookStore>((set) => ({
  books: [],
  currentBook: null,
  loading: false,

  putRecommendBook: async (id) => {
    set({ loading: true });
    try {
      await api.put(`/book/${id}/recommend`);
      set({ loading: false });
    } catch (e) {
      set({ loading: false });
      console.error(e);
    }
  },

  putUnrecommendBook: async (id) => {
    set({ loading: true });
    try {
      await api.put(`/book/${id}/unrecommend`);
      set({ loading: false });
    } catch (e) {
      set({ loading: false });
      console.error(e);
    }
  },

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
      await api.put(`/book/${id}/like`);

      set({ loading: false });
    } catch (e) {
      set({ loading: false });
      console.error(e);
      throw e;
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
