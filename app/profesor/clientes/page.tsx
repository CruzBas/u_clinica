"use client";

import React, { useState } from "react";
import DataTable from "../../componentes/DataTable";
import PriorityBadge from "../../componentes/PriorityBadge";
import MaterialIcon from "../../componentes/MaterialIcon";

interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  fechaIngreso: string;
  estado: string;
}

const initialClientes: Cliente[] = [
  {
    id: 1,
    nombre: "Alejandro Ruiz",
    email: "alejandro.r@empresa.com",
    telefono: "+57 321 456 7890",
    fechaIngreso: "12 Ene 2024",
    estado: "Visible",
  },
  {
    id: 2,
    nombre: "Sofía Méndez",
    email: "sofia.m@empresa.com",
    telefono: "+57 300 123 4567",
    fechaIngreso: "05 Feb 2024",
    estado: "Invisible",
  },
  {
    id: 3,
    nombre: "Mateo García",
    email: "mateo.g@empresa.com",
    telefono: "+57 315 789 0123",
    fechaIngreso: "20 Feb 2024",
    estado: "Visible",
  },
  {
    id: 4,
    nombre: "Valeria López",
    email: "valeria.l@empresa.com",
    telefono: "+57 311 222 3333",
    fechaIngreso: "01 Mar 2024",
    estado: "Visible",
  },
];

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filtered.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleSendToStudents = () => {
    if (selectedIds.length === 0) return;
    alert(`Se han enviado ${selectedIds.length} registro(s) a los estudiantes.`);
    setSelectedIds([]);
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const handleToggleStatus = (id: number) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: c.estado === "Visible" ? "Invisible" : "Visible" } : c))
    );
  };

  const filtered = clientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.telefono.toLowerCase().includes(search.toLowerCase())
  );

  const allSelected = filtered.length > 0 && selectedIds.length === filtered.length;

  const tableHeaders = [
    {
      key: "select",
      label: (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => handleSelectAll(e.target.checked)}
          className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-transparent cursor-pointer"
        />
      ),
      className: "w-12 py-4 px-6",
    },
    { key: "nombre", label: "Nombre", className: "py-4 px-6" },
    { key: "telefono", label: "Teléfono", className: "py-4 px-6" },
    { key: "fechaIngreso", label: "Fecha de Ingreso", className: "py-4 px-6" },
    { key: "estado", label: "Estado", className: "py-4 px-6" },
    { key: "acciones", label: "Acciones", className: "py-4 px-6 text-right" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <header className="h-auto min-h-[64px] border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl px-4 md:px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <MaterialIcon name="diversity_3" className="text-primary" />
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Gestión de Practicantes
          </h2>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <MaterialIcon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-slate-100 outline-none"
            />
          </div>
        </div>
      </header>

      <section className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Lista de Espera
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Supervisa y asigna a las personas en lista de espera para atención.
            </p>
          </div>
        </div>

        {selectedIds.length > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-white size-6 rounded-full flex items-center justify-center text-xs font-bold">
                {selectedIds.length}
              </div>
              <span className="text-primary font-semibold text-sm">Personas Seleccionadas</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={handleSendToStudents}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <MaterialIcon name="check_circle" className="text-base" />
                <span className="whitespace-nowrap">Enviar a estudiantes</span>
              </button>
              <button
                onClick={clearSelection}
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 px-4 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <DataTable
          headers={tableHeaders}
          pagination={{
            currentPage: currentPage,
            totalPages: 3,
            showingText: `Mostrando ${filtered.length} de ${clientes.length} personas en lista`,
            onPageChange: setCurrentPage,
          }}
        >
          {filtered.map((c) => (
            <tr
              key={c.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
            >
              <td className="py-4 px-6">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(c.id)}
                  onChange={(e) => handleSelectRow(c.id, e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-transparent cursor-pointer"
                />
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{c.nombre}</span>
                  <span className="text-xs text-slate-400">{c.email}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-sm font-medium text-slate-700 dark:text-slate-300">
                {c.telefono}
              </td>
              <td className="py-4 px-6 text-sm text-slate-500">{c.fechaIngreso}</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={c.estado === "Visible"}
                      onChange={() => handleToggleStatus(c.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                  </label>
                  <PriorityBadge label={c.estado} variant={c.estado === "Visible" ? "confirmado" : "normal"} />
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => alert(`Acción para persona: ${c.nombre}`)}
                  className="text-slate-400 hover:text-primary cursor-pointer"
                >
                  <MaterialIcon name="more_vert" />
                </button>
              </td>
            </tr>
          ))}
        </DataTable>
      </section>
    </div>
  );
}
