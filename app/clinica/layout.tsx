"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarOverlay from "../components/SidebarOverlay";

export default function ClinicaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "/clinica", label: "Tablero", icon: "dashboard" },
    { href: "/clinica/lista-espera", label: "Lista de espera", icon: "group" },
    { href: "/clinica/citas-confirmadas", label: "Citas Confirmadas", icon: "event_available" },
    { href: "/clinica/consultorios", label:"Consultorios",icon: "meeting_room"}
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <Header title="Panel de Clínica" onMenuToggle={() => setIsOpen(true)} />
      <div className="flex flex-1">
        <Sidebar
          title="Panel de Clínica"
          subtitle="Módulo de Clínica"
          items={navigationItems}
          activeHref={pathname || "/clinica"}
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
