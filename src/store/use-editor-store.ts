import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
};

/**
 * Global Zustand store that holds the active Tiptap editor instance.
 * Shared across Toolbar, Navbar, and other components that need editor access
 * without requiring prop drilling through the entire document layout.
 */
export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));
