import React from "react";

interface PriorityBadgeProps {
  label: string;
  variant?: string;
}

export default function PriorityBadge({ label, variant }: PriorityBadgeProps) {
  const norm = (variant || label || "").toLowerCase().trim();

  let colorClasses = "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";

  if (norm === "alta" || norm === "rose" || norm === "danger") {
    colorClasses = "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400";
  } else if (norm === "media" || norm === "amber" || norm === "warning") {
    colorClasses = "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
  } else if (norm === "baja" || norm === "slate" || norm === "normal") {
    colorClasses = "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
  } else if (norm === "pendiente" || norm === "orange" || norm === "pending") {
    colorClasses = "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
  } else if (norm === "en revision" || norm === "en revisión" || norm === "indigo" || norm === "review") {
    colorClasses = "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
  } else if (
    norm === "confirmada" ||
    norm === "confirmado" ||
    norm === "activo" ||
    norm === "completado" ||
    norm === "emerald" ||
    norm === "success" ||
    norm === "success-green"
  ) {
    colorClasses = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
      {label}
    </span>
  );
}
