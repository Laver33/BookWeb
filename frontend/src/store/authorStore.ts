import { create } from "zustand";
import api from "../services/api";

export interface iAuthor {
  id: string;
  email: string;
  name: string;
  surname: string;
  description?: string;
  age: number;
  password?: string;
}

interface iAuthorStore {
  authors: iAuthor[];
  currentAuthor: iAuthor | null;
  loading: boolean;
  fetchAuthors: () => Promise<void>;
  fetchAuthor: (id: string) => Promise<void>;
  deleteAuthor: (id: string) => Promise<void>;
  createAuthor: (authorData: Omit<iAuthor, "id">) => Promise<iAuthor>;
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
      console.error(e);
      set({ loading: false });
    }
  },

  fetchAuthor: async (id) => {
    set({ loading: true });
    try {
      const response = await api.get(`/author/${id}`);
      set({ currentAuthor: response.data, loading: false });
    } catch (e) {
      console.error(e);
      set({ loading: false });
    }
  },

  deleteAuthor: async (id) => {
    set({ loading: true });
    try {
      await api.delete(`/author/${id}`);
      set((state) => ({
        authors: state.authors.filter((author) => author.id !== id),
        loading: false,
      }));
    } catch (e) {
      console.error(e);
      set({ loading: false });
    }
  },

  createAuthor: async (authorData) => {
    set({ loading: true });
    try {
      const response = await api.post("/auth/register", {
        name: authorData.name,
        surname: authorData.surname,
        email: authorData.email,
        password: authorData.password,
        age: authorData.age || undefined,
      });

      const newAuthor = response.data.author || response.data;
      set((state) => ({
        authors: [...state.authors, newAuthor],
        loading: false,
      }));

      return newAuthor;
    } catch (e) {
      console.error(e);
      set({ loading: false });
      throw e;
    }
  },
}));

export default useAuthorStore;
