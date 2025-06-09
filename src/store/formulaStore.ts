
import { create } from "zustand";
import type { FormulaStore, FormulaItem } from "../types";

export const useFormulaStore = create<FormulaStore>((set, get) => ({
  formula: [],
  cursorPosition: 0,
  selectedTagId: null,
  isTyping: false,

  addToFormula: (item: FormulaItem) => {
    const { formula, cursorPosition } = get();
    const newFormula = [...formula];
    newFormula.splice(cursorPosition, 0, {
      ...item,
      id: Date.now().toString() + Math.random().toString(),
    });
    set({
      formula: newFormula,
      cursorPosition: cursorPosition + 1,
    });
  },

  removeFromFormula: (id: string) => {
    const { formula, cursorPosition } = get();
    const itemIndex = formula.findIndex((item) => item.id === id);
    const newFormula = formula.filter((item) => item.id !== id);

    const newCursorPosition =
      itemIndex < cursorPosition
        ? Math.max(0, cursorPosition - 1)
        : cursorPosition;

    set({
      formula: newFormula,
      cursorPosition: Math.min(newCursorPosition, newFormula.length),
    });
  },

  insertAtPosition: (item: FormulaItem, position: number) => {
    const { formula } = get();
    const newFormula = [...formula];
    console.log(
      `Zustand: Inserting "${item.name}" at position ${position} in formula:`,
      formula.map((f) => f.name)
    );
    newFormula.splice(position, 0, {
      ...item,
      id: Date.now().toString() + Math.random().toString(),
    });
    console.log(
      `Zustand: New formula:`,
      newFormula.map((f) => f.name)
    );
    set({
      formula: newFormula,
      cursorPosition: position + 1,
    });
  },

  updateCursorPosition: (position: number) => {
    const { formula } = get();
    const clampedPosition = Math.max(0, Math.min(position, formula.length));
    set({ cursorPosition: clampedPosition });
  },

  setSelectedTag: (id: string | null) => {
    set({ selectedTagId: id });
  },

  setTyping: (isTyping: boolean) => {
    set({ isTyping });
  },

  clearFormula: () => {
    set({
      formula: [],
      cursorPosition: 0,
      selectedTagId: null,
    });
  },

  moveToPosition: (position: number) => {
    const { formula } = get();
    const clampedPosition = Math.max(0, Math.min(position, formula.length));
    set({ cursorPosition: clampedPosition });
  },

  updateTag: (id: string, updates: Partial<FormulaItem>) => {
    const { formula } = get();
    const newFormula = formula.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    console.log(`Zustand: Updating tag ${id}:`, updates);
    set({ formula: newFormula });
  },
}));
