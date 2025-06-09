import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import type { FormulaItem } from "../types";
import { useFormulaStore } from "../store/formulaStore";
import { TagDropdown } from "./TagDropdown";

interface FormulaTagProps {
  tag: FormulaItem;
  onRemove: (id: string) => void;
  position: number;
}

export const FormulaTag: React.FC<FormulaTagProps> = ({
  tag,
  onRemove,
  position,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    setSelectedTag,
    selectedTagId,
    moveToPosition,
    insertAtPosition,
    updateTag,
  } = useFormulaStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  const handleDropdownSelect = (action: string) => {
    console.log(`Dropdown action: ${action} for tag: ${tag.name}`);
    switch (action) {
      case "delete":
        onRemove(tag.id);
        break;
      case "edit":
        const newName = prompt(`Edit variable name:`, tag.name);
        if (newName && newName.trim() && newName.trim() !== tag.name) {
          console.log(
            `Editing tag ${tag.id} from "${tag.name}" to "${newName.trim()}"`
          );
          updateTag(tag.id, { name: newName.trim() });
        }
        break;
      case "format":
        const currentValue = tag.value?.toString() || "0";
        const newValue = prompt(`Edit value for "${tag.name}":`, currentValue);
        if (newValue !== null && newValue !== currentValue) {
          const parsedValue = !isNaN(Number(newValue))
            ? Number(newValue)
            : newValue;
          console.log(
            `Updating tag ${tag.id} value from "${currentValue}" to "${parsedValue}"`
          );
          updateTag(tag.id, { value: parsedValue });
        }
        break;
      case "properties":
        alert(
          `Tag Properties:\nName: ${tag.name}\nType: ${tag.type}\nValue: ${
            tag.value
          }\nCategory: ${tag.category || "None"}`
        );
        break;
      case "duplicate":
        insertAtPosition(
          {
            type: tag.type,
            name: tag.name + " Copy",
            value: tag.value,
            category: tag.category,
            id: "",
          },
          position + 1
        );
        break;
    }
    setDropdownOpen(false);
  };

  const handleTagClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newPosition = position + 1;
    moveToPosition(newPosition);
    setSelectedTag(selectedTagId === tag.id ? null : tag.id);
    console.log(
      `Tag clicked at position ${position}, cursor moved to ${newPosition}`
    );
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(
      `Dropdown toggle clicked for tag: ${tag.name}, current state: ${dropdownOpen}`
    );
    setDropdownOpen(!dropdownOpen);
  };

  const isSelected = selectedTagId === tag.id;

  return (
    <span className="formula-tag-container" ref={dropdownRef}>
      <span
        className={`formula-tag ${isSelected ? "selected" : ""}`}
        onClick={handleTagClick}
      >
        <span className="tag-name">{tag.name}</span>
        {tag.value && (
          <span className="tag-value">
            ={" "}
            {typeof tag.value === "number"
              ? tag.value.toLocaleString()
              : tag.value}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(tag.id);
          }}
          className="tag-remove"
          title="Remove tag"
        >
          <X size={12} />
        </button>
      </span>

      <button
        onClick={handleDropdownToggle}
        className="tag-dropdown-trigger"
        title="More options"
      >
        <ChevronDown size={12} className={dropdownOpen ? "rotated" : ""} />
      </button>

      {dropdownOpen && (
        <TagDropdown
          isOpen={dropdownOpen}
          onSelect={handleDropdownSelect}
          onClose={() => setDropdownOpen(false)}
        />
      )}
    </span>
  );
};
