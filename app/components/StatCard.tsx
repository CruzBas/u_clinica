import React from "react";
import MaterialIcon from "./MaterialIcon";

interface Trend {
  direction: "up" | "down";
  value: string;
}

interface StatCardProps {
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
  label: string;
  value: string;
  trend?: Trend;
}

export default function StatCard({
  icon,
  iconBgClass,
  iconTextClass,
  label,
  value,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className={`size-10 rounded-lg ${iconBgClass} flex items-center justify-center ${iconTextClass} text-xl`}>
          <MaterialIcon name={icon} />
        </div>
        {trend && (
          <span
            className={`text-sm font-semibold flex items-center gap-1 ${
              trend.direction === "up" ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            <MaterialIcon name={trend.direction === "up" ? "trending_up" : "trending_down"} className="text-sm" />
            {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</p>
        <p className="text-2xl text-black sm:text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}
