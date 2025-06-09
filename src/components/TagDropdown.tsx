import React from "react";

interface TagDropdownProps {
  isOpen: boolean;
  onSelect: (action: string) => void;
  onClose: () => void;
}

export const TagDropdown: React.FC<TagDropdownProps> = ({
  isOpen,
  onSelect,
  onClose,
}) => {
  if (!isOpen) return null;

  const options = [
    { label: "Edit Variable", value: "edit" },
    { label: "Format Number", value: "format" },
    { label: "View Properties", value: "properties" },
    { label: "Duplicate", value: "duplicate" },
    { label: "Delete", value: "delete", className: "delete-option" },
  ];

  return (
    <div className="tag-dropdown">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            onSelect(option.value);
            onClose();
          }}
          className={`dropdown-option ${option.className || ""}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
