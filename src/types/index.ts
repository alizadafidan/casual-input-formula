export interface FormulaItem {
  id: string;
  type: "variable" | "operator" | "number";
  name: string;
  value?: number | string;
  category?: string;
}

export interface AutocompleteItem {
  id: string;
  name: string;
  category: string;
  value: number | string;
}

export interface FormulaStore {
  formula: FormulaItem[];
  cursorPosition: number;
  selectedTagId: string | null;
  isTyping: boolean;

  addToFormula: (item: FormulaItem) => void;
  removeFromFormula: (id: string) => void;
  insertAtPosition: (item: FormulaItem, position: number) => void;
  updateCursorPosition: (position: number) => void;
  setSelectedTag: (id: string | null) => void;
  setTyping: (isTyping: boolean) => void;
  clearFormula: () => void;
  moveToPosition: (position: number) => void;
  updateTag: (id: string, updates: Partial<FormulaItem>) => void;
}
