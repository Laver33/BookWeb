import { create } from "zustand";
import api from "../services/api";
import type { iBook } from "./bookStore";

export interface iAuthor {
  id: string;
  email: string;
  name: string;
  surname: string;
  description?: string;
  age: number;
  password?: string;

  totalViews: number;
  totalLikes: number;
  totalRecommendations: number;

  books: iBook[];
}

interface iLoginAuthor {
  email: string;
  password: string;
}

interface iAuthorStore {
  authors: iAuthor[];
  currentAuthor: iAuthor | null;
  token: string | null;
  loading: boolean;
  fetchAuthors: () => Promise<void>;
  fetchAuthor: (id: string) => Promise<void>;
  deleteAuthor: (id: string) => Promise<void>;
  createAuthor: (authorData: Omit<iAuthor, "id">) => Promise<iAuthor>;
  loginAuthor: (
    loginData: iLoginAuthor,
  ) => Promise<{ token: string; user: iAuthor }>;
  checkAuth: () => boolean;
  logout: () => void;
}

const useAuthorStore = create<iAuthorStore>((set, get) => ({
  authors: [],
  currentAuthor: null,
  token: localStorage.getItem("token") || null,
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

  loginAuthor: async (loginData) => {
    set({ loading: true });
    try {
      const response = await api.post("/auth/login", loginData);

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      set({
        token,
        currentAuthor: user,
        loading: false,
      });

      return { token, user };
    } catch (e) {
      console.error(e);
      set({ loading: false });
      throw e;
    }
  },

  checkAuth: () => {
    const { token } = get();
    return !!token;
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      currentAuthor: null,
    });
  },
}));

export default useAuthorStore;
