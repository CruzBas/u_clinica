"use client";

import React, { useState } from "react";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import PriorityBadge from "../components/PriorityBadge";

interface Solicitud {
  id: number;
  nombre: string;
  servicio: string;
  fecha: string;
  hora: string;
  prioridad: string;
  estado: string;
}

const initialSolicitudes: Solicitud[] = [
  {
    id: 1,
    nombre: "Juan Pérez",
    servicio: "Consulta General",
    fecha: "24/10/2023",
    hora: "09:30 AM",
    prioridad: "Alta",
    estado: "Pendiente",
  },
  {
    id: 2,
    nombre: "María García",
    servicio: "Odontología",
    fecha: "24/10/2023",
    hora: "10:45 AM",
    prioridad: "Media",
    estado: "En Revisión",
  },
  {
    id: 3,
    nombre: "Carlos López",
    servicio: "Dermatología",
    fecha: "23/10/2023",
    hora: "02:15 PM",
    prioridad: "Baja",
    estado: "Pendiente",
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    servicio: "Pediatría",
    fecha: "23/10/2023",
    hora: "04:30 PM",
    prioridad: "Alta",
    estado: "Pendiente",
  },
];

export default function ClinicaDashboard() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(initialSolicitudes);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleAccept = (id: number) => {
    setSolicitudes((prev) =>
      prev.map((sol) => (sol.id === id ? { ...sol, estado: "Aceptado" } : sol))
    );
  };

  const handleReject = (id: number) => {
    setSolicitudes((prev) =>
      prev.map((sol) => (sol.id === id ? { ...sol, estado: "Rechazado" } : sol))
    );
  };

  const filtered = solicitudes.filter((sol) =>
    sol.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const tableHeaders = [
    { key: "nombre", label: "Nombre del Paciente" },
    { key: "servicio", label: "Servicio Solicitado" },
    { key: "fecha", label: "Fecha" },
    { key: "hora", label: "Hora" },
    { key: "prioridad", label: "Prioridad" },
    { key: "estado", label: "Estado" },
    { key: "acciones", label: "Acciones", className: "text-right" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          icon="receipt_long"
          iconBgClass="bg-primary/10"
          iconTextClass="text-primary"
          label="Total de Solicitudes"
          value="1,284"
          trend={{ direction: "up", value: "+12%" }}
        />
        <StatCard
          icon="pending_actions"
          iconBgClass="bg-orange-100 dark:bg-orange-900/20"
          iconTextClass="text-orange-600"
          label="Pendientes de Hoy"
          value="42"
          trend={{ direction: "up", value: "+5%" }}
        />
        <StatCard
          icon="timer"
          iconBgClass="bg-indigo-100 dark:bg-indigo-900/20"
          iconTextClass="text-indigo-600"
          label="Tiempo Promedio de Respuesta"
          value="15 min"
          trend={{ direction: "down", value: "-2%" }}
        />
      </div>

      <DataTable
        title="Solicitudes Recientes"
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar paciente..."
        headers={tableHeaders}
        pagination={{
          currentPage: currentPage,
          totalPages: 3,
          showingText: `Mostrando ${filtered.length} de 42 solicitudes pendientes`,
          onPageChange: setCurrentPage,
        }}
      >
        {filtered.map((sol) => (
          <tr
            key={sol.id}
            className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
          >
            <td className="px-6 py-4 whitespace-nowrap font-medium">{sol.nombre}</td>
            <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
              {sol.servicio}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
              {sol.fecha}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 font-bold">
              {sol.hora}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <PriorityBadge label={sol.prioridad} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <PriorityBadge label={sol.estado} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
              {sol.estado === "Pendiente" || sol.estado === "En Revisión" ? (
                <>
                  <button
                    onClick={() => handleAccept(sol.id)}
                    className="px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors uppercase tracking-tight cursor-pointer"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => handleReject(sol.id)}
                    className="px-3 py-1 text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors uppercase tracking-tight cursor-pointer"
                  >
                    Rechazar
                  </button>
                </>
              ) : (
                <span className="text-xs text-slate-400 italic">Procesado</span>
              )}
            </td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}
