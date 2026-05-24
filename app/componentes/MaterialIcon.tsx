import React from "react";

interface MaterialIconProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

export default function MaterialIcon({ name, className = "", onClick }: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      onClick={onClick}
    >
      {name}
    </span>
  );
}
