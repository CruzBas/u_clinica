import React from "react";
import Link from "next/link";
import MaterialIcon from "./MaterialIcon";
import SoporteCard from "./SoporteCard";

interface SidebarItem {
  href: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  title: string;
  subtitle: string;
  items: SidebarItem[];
  activeHref: string;
  isOpen: boolean;
  onClose: () => void;
  onSupportClick?: () => void;
}

export default function Sidebar({
  title,
  subtitle,
  items,
  activeHref,
  isOpen,
  onClose,
  onSupportClick,
}: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 gap-6 overflow-y-auto`}
    >
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 text-slate-500 hover:text-slate-700 cursor-pointer"
      >
        <MaterialIcon name="close" />
      </button>

      <div className="flex flex-col gap-1 mt-8 lg:mt-0">
        <h1 className="text-slate-900 dark:text-slate-100 text-base font-bold">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs">{subtitle}</p>
      </div>

      <nav className="flex flex-col gap-2">
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <MaterialIcon name={item.icon} className="text-xl" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <SoporteCard onContactClick={onSupportClick} />
    </aside>
  );
}
