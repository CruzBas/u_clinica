"use client";

import React, { useState } from "react";
import DataTable from "../../componentes/DataTable";
import PriorityBadge from "../../componentes/PriorityBadge";
import MaterialIcon from "../../componentes/MaterialIcon";

interface Practicante {
  id: number;
  nombre: string;
  email: string;
  departamento: string;
  fechaIngreso: string;
  estado: string;
}

const initialPracticantes: Practicante[] = [
  {
    id: 1,
    nombre: "Alejandro Ruiz",
    email: "alejandro.r@empresa.com",
    departamento: "Ingeniería de Software",
    fechaIngreso: "12 Ene 2024",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Sofía Méndez",
    email: "sofia.m@empresa.com",
    departamento: "Marketing Digital",
    fechaIngreso: "05 Feb 2024",
    estado: "Inactivo",
  },
  {
    id: 3,
    nombre: "Mateo García",
    email: "mateo.g@empresa.com",
    departamento: "Diseño UI/UX",
    fechaIngreso: "20 Feb 2024",
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Valeria López",
    email: "valeria.l@empresa.com",
    departamento: "Recursos Humanos",
    fechaIngreso: "01 Mar 2024",
    estado: "Activo",
  },
];

export default function PracticantesPage() {
  const [practicantes, setPracticantes] = useState<Practicante[]>(initialPracticantes);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deptFilter, setDeptFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filtered.map((p) => p.id));
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

  const handleBulkStatus = (status: "Activo" | "Inactivo") => {
    if (selectedIds.length === 0) return;
    setPracticantes((prev) =>
      prev.map((p) => (selectedIds.includes(p.id) ? { ...p, estado: status } : p))
    );
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`¿Estás seguro de que deseas eliminar ${selectedIds.length} practicante(s)?`)) {
      setPracticantes((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleToggleStatus = (id: number) => {
    setPracticantes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: p.estado === "Activo" ? "Inactivo" : "Activo" } : p))
    );
  };

  const handleAddPracticante = () => {
    const nombre = prompt("Ingrese el nombre completo del practicante:");
    if (!nombre) return;
    const email = prompt("Ingrese el correo electrónico:");
    if (!email) return;
    const departamento = prompt("Ingrese el departamento:");
    if (!departamento) return;

    const newPracticante: Practicante = {
      id: Date.now(),
      nombre,
      email,
      departamento,
      fechaIngreso: new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      estado: "Activo",
    };

    setPracticantes((prev) => [newPracticante, ...prev]);
  };

  const filtered = practicantes.filter((p) => {
    const matchesSearch =
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.departamento.toLowerCase().includes(search.toLowerCase());

    const matchesDept = deptFilter === "Todos" || p.departamento === deptFilter;
    const matchesStatus = statusFilter === "Todos" || p.estado === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const allSelected = filtered.length > 0 && selectedIds.length === filtered.length;

  const depts = ["Todos", ...Array.from(new Set(practicantes.map((p) => p.departamento)))];
  const statuses = ["Todos", "Activo", "Inactivo"];

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
    { key: "practicante", label: "Practicante", className: "py-4 px-6" },
    { key: "departamento", label: "Departamento", className: "py-4 px-6" },
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
              Practicantes
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Administra y supervisa el estado de los estudiantes en práctica.
            </p>
          </div>
          <button
            onClick={handleAddPracticante}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            <MaterialIcon name="add_circle" />
            Añadir Practicante
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 relative">
          <div className="relative">
            <button
              onClick={() => {
                setIsDeptDropdownOpen(!isDeptDropdownOpen);
                setIsStatusDropdownOpen(false);
              }}
              className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 cursor-pointer text-sm font-medium"
            >
              <span>{deptFilter === "Todos" ? "Todos los Departamentos" : deptFilter}</span>
              <MaterialIcon name="keyboard_arrow_down" className="text-slate-400" />
            </button>
            {isDeptDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 p-2 flex flex-col gap-1">
                {depts.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDeptFilter(d);
                      setIsDeptDropdownOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                      deptFilter === d
                        ? "bg-primary text-white"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {d === "Todos" ? "Todos los Departamentos" : d}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setIsStatusDropdownOpen(!isStatusDropdownOpen);
                setIsDeptDropdownOpen(false);
              }}
              className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 cursor-pointer text-sm font-medium"
            >
              <span>{statusFilter === "Todos" ? "Estado" : statusFilter}</span>
              <MaterialIcon name="keyboard_arrow_down" className="text-slate-400" />
            </button>
            {isStatusDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 p-2 flex flex-col gap-1">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setStatusFilter(s);
                      setIsStatusDropdownOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                      statusFilter === s
                        ? "bg-primary text-white"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {s === "Todos" ? "Todos los Estados" : s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedIds.length > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-white size-6 rounded-full flex items-center justify-center text-xs font-bold">
                {selectedIds.length}
              </div>
              <span className="text-primary font-semibold text-sm">Practicantes seleccionados</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleBulkStatus("Activo")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 cursor-pointer"
              >
                <MaterialIcon name="check_circle" className="text-base" />
                <span className="whitespace-nowrap">Marcar Activo</span>
              </button>
              <button
                onClick={() => handleBulkStatus("Inactivo")}
                className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 cursor-pointer"
              >
                <MaterialIcon name="do_not_disturb_on" className="text-base" />
                <span className="whitespace-nowrap">Marcar Inactivo</span>
              </button>
              <button
                onClick={handleBulkDelete}
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 px-4 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}

        <DataTable
          headers={tableHeaders}
          pagination={{
            currentPage: currentPage,
            totalPages: 3,
            showingText: `Mostrando ${filtered.length} de ${practicantes.length} practicantes`,
            onPageChange: setCurrentPage,
          }}
        >
          {filtered.map((p) => (
            <tr
              key={p.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
            >
              <td className="py-4 px-6">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(p.id)}
                  onChange={(e) => handleSelectRow(p.id, e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-transparent cursor-pointer"
                />
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{p.nombre}</span>
                  <span className="text-xs text-slate-400">{p.email}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-sm font-medium text-slate-700 dark:text-slate-300">
                {p.departamento}
              </td>
              <td className="py-4 px-6 text-sm text-slate-500">{p.fechaIngreso}</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={p.estado === "Activo"}
                      onChange={() => handleToggleStatus(p.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                  </label>
                  <PriorityBadge label={p.estado} />
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => alert(`Acción para practicante: ${p.nombre}`)}
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
