import React from "react";
import MaterialIcon from "./MaterialIcon";

interface TableHeader {
  key: string;
  label: string | React.ReactNode;
  className?: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  showingText: string;
  onPageChange: (page: number) => void;
}

interface DataTableProps {
  title?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  headerActions?: React.ReactNode;
  headers: TableHeader[];
  children: React.ReactNode;
  pagination?: Pagination;
}

export default function DataTable({
  title,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  headerActions,
  headers,
  children,
  pagination,
}: DataTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
      {(title || onSearchChange || headerActions) && (
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {title && <h3 className="text-lg font-bold text-black">{title}</h3>}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {headerActions}
            {onSearchChange && (
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full sm:w-64 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-slate-100"
              />
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              {headers.map((header) => (
                <th
                  key={header.key}
                  className={`px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ${
                    header.className || ""
                  }`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {children}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
            {pagination.showingText}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
              disabled={pagination.currentPage === 1}
              className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-400 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <MaterialIcon name="chevron_left" className="text-base" />
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => {
              const isActive = page === pagination.currentPage;
              return (
                <button
                  key={page}
                  onClick={() => pagination.onPageChange(page)}
                  className={`size-8 flex items-center justify-center rounded border ${
                    isActive
                      ? "bg-primary text-white border-primary"
                      : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  } text-sm font-medium transition-colors`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
              disabled={pagination.currentPage === pagination.totalPages}
              className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-400 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <MaterialIcon name="chevron_right" className="text-base" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
