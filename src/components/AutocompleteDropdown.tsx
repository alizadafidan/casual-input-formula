import React from "react";
import type { AutocompleteItem } from "../types";

interface AutocompleteDropdownProps {
  isOpen: boolean;
  items: AutocompleteItem[];
  isLoading: boolean;
  onSelect: (item: AutocompleteItem) => void;
  highlightedIndex: number;
}

export const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({
  isOpen,
  items,
  isLoading,
  onSelect,
  highlightedIndex,
}) => {
  if (!isOpen) return null;

  return (
    <div className="autocomplete-dropdown">
      {isLoading ? (
        <div className="autocomplete-loading">
          <div className="loading-spinner"></div>
          Loading suggestions...
        </div>
      ) : items.length > 0 ? (
        items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`autocomplete-item ${
              index === highlightedIndex ? "highlighted" : ""
            }`}
          >
            <div className="item-name">{item.name}</div>
            <div className="item-details">
              <span className="item-category">{item.category}</span>
              <span className="item-value">
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}
              </span>
            </div>
          </button>
        ))
      ) : (
        <div className="autocomplete-empty">No suggestions found</div>
      )}
    </div>
  );
};
