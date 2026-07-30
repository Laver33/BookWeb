import { create } from "zustand";
import api from "../services/api";

export interface iAuthor {
  id: string;
  email: string;
  name: string;
  surname: string;
  description?: string;
  age: number;
}

interface iAuthorStore {
  authors: iAuthor[];
  currentAuthor: iAuthor | null;
  loading: boolean;
  fetchAuthors: () => Promise<void>;
  fetchAuthor: (id: string) => Promise<void>;
  deleteAuthor: (id: string) => Promise<void>;
  //   createAuthor: (author: any) => Promise<void>;
}

const useAuthorStore = create<iAuthorStore>((set) => ({
  authors: [],
  currentAuthor: null,
  loading: false,

  fetchAuthors: async () => {
    set({ loading: true });

    try {
      const response = await api.get("/authors");
      set({ authors: response.data, loading: false });
    } catch (e) {
      console.log(e);
    }
  },

  fetchAuthor: async (id) => {
    set({ loading: true });

    try {
      const response = await api.get(`/author/${id}`);
      set({ currentAuthor: response.data, loading: false });
    } catch (e) {
      console.log(e);
    }
  },

  deleteAuthor: async (id) => {
    set({ loading: true });

    try {
      await api.delete(`/author/${id}`);
      set({ loading: false });
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useAuthorStore;
