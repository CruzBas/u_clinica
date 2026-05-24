import React from "react";

interface SidebarOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function SidebarOverlay({ isOpen, onClick }: SidebarOverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClick}
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
    />
  );
}
