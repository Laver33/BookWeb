import api from "@/services/api";
import { create } from "zustand";

export interface iNote {
  id: number;
  content: string;
  createdAt: Date;

  bookId: string;
}

interface iNoteStore {
  notes: iNote[];
  currentNote: iNote | null;
  bookNotes: iNote[];
  loading: boolean;
  fetchNotes: () => Promise<void>;
  fetchNote: (noteId: string) => Promise<void>;
  createNote: (noteData: Omit<iNote, "id" | "createdAt">) => Promise<iNote>;
  fetchNotesByBook: (bookId: string) => Promise<void>;
  //   deleteNote: (noteId: string) => Promise<void>;
  //   updateNote: (noteId: string, content: string) => Promise<iNote>;
}

const useNoteStore = create<iNoteStore>((set) => ({
  notes: [],
  bookNotes: [],
  currentNote: null,
  loading: false,

  fetchNotes: async () => {
    set({ loading: true });

    try {
      const response = await api.get("/notes");
      set({ notes: response.data, loading: false });
    } catch (e) {
      set({ loading: false });
      console.error(e);
    }
  },

  fetchNotesByBook: async (bookId: string) => {
    set({ loading: true });

    try {
      const response = await api.get(`/book/${bookId}/notes`);
      set({
        bookNotes: response.data.notes,
        loading: false,
      });
    } catch (e) {
      set({ loading: false });
      console.error(e);
    }
  },

  fetchNote: async (noteId) => {
    set({ loading: true });

    try {
      const response = await api.get(`/note/${noteId}`);
      set({ currentNote: response.data, loading: false });
    } catch (e) {
      set({ loading: false });
      console.error(e);
    }
  },

  createNote: async (noteData) => {
    set({ loading: true });

    try {
      const response = await api.post(`/note/${noteData.bookId}`, {
        content: noteData.content,
      });

      const newNote = response.data.note || response.data;
      set((state) => ({
        notes: [...state.notes, newNote],
        loading: false,
      }));

      return newNote;
    } catch (e) {
      set({ loading: false });
      console.error(e);
    }
  },
}));

export default useNoteStore;
