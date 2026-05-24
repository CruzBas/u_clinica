import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-slate-950 rounded-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {children}
      </div>
    </div>
  );
}
