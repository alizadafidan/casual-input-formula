import React from "react";

interface OperatorButtonProps {
  operator: string;
  onClick: (operator: string) => void;
  label?: string;
}

export const OperatorButton: React.FC<OperatorButtonProps> = ({
  operator,
  onClick,
  label,
}) => {
  return (
    <button
      onClick={() => onClick(operator)}
      className="operator-button"
      title={label || `Insert ${operator}`}
    >
      {operator}
    </button>
  );
};
