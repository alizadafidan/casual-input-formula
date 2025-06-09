import React from "react";

interface CursorIndicatorProps {
  position?: number;
}

export const CursorIndicator: React.FC<CursorIndicatorProps> = () => {
  return <span className="cursor-indicator">|</span>;
};
