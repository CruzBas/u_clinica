"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../componentes/Header";
import Sidebar from "../componentes/Sidebar";
import SidebarOverlay from "../componentes/SidebarOverlay";

export default function ProfesorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "/profesor", label: "Tablero", icon: "dashboard" },
    { href: "/profesor/practicantes", label: "Practicantes", icon: "group" },
    { href: "/profesor/clientes", label: "Lista de espera", icon: "people" },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <Header title="Panel de Profesor" onMenuToggle={() => setIsOpen(true)} />
      <div className="flex flex-1">
        <Sidebar
          title="Panel de Administración"
          subtitle="Cohorte de Verano 2024"
          items={navigationItems}
          activeHref={pathname || "/profesor"}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
        <SidebarOverlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
        <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 gap-6 sm:gap-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
