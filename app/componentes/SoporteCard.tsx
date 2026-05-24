import React from "react";
import MaterialIcon from "./MaterialIcon";

interface SoporteCardProps {
  onContactClick?: () => void;
}

export default function SoporteCard({ onContactClick }: SoporteCardProps) {
  return (
    <div className="mt-auto p-4 rounded-xl bg-primary/10 border border-primary/20">
      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">SOPORTE</p>
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        ¿Necesitas ayuda para gestionar el programa?
      </p>
      <button
        onClick={onContactClick}
        className="mt-3 text-sm font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
      >
        Contactar Soporte Técnico
        <MaterialIcon name="arrow_forward" className="text-sm" />
      </button>
    </div>
  );
}
