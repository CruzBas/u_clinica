"use client";

import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import PriorityBadge from "../../components/PriorityBadge";
import MaterialIcon from "../../components/MaterialIcon";
import StatCard from "../../components/StatCard";
import Modal from "../../components/Modal";

interface Consultorio {
  id: string;
  nombre: string;
  estado: "Disponible" | "Bloqueado";
  agenda: string;
  razonBloqueo?: string;
}

const initialConsultorio: Consultorio[] = [
  {
    id: "Cons-001",
    nombre: "Consultorio Central",
    estado: "Disponible",
    agenda: "Disponible ahora",
  },
  {
    id: "Cons-002",
    nombre: "Consultorio Norte",
    estado: "Bloqueado",
    agenda: "Mantenimiento de equipo",
    razonBloqueo: "Mantenimiento de equipo",
  },
  {
    id: "Cons-003",
    nombre: "Consultorio Sur",
    estado: "Disponible",
    agenda: "Disponible ahora",
  },
  {
    id: "Cons-004",
    nombre: "Consultorio Oeste",
    estado: "Disponible",
    agenda: "Disponible ahora",
  },
];

export default function ConsultoriosPage() {
  const [consultorios, setConsultorios] = useState<Consultorio[]>(initialConsultorio);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [blockingConsultorio, setBlockingConsultorio] = useState<Consultorio | null>(null);
  const [blockReason, setBlockReason] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);


  const handleBulkStatus = (status: "Disponible" | "Bloqueado") => {
    if (selectedIds.length === 0) return;
    setConsultorios((prev) =>
      prev.map((p) =>
        selectedIds.includes(p.id)
          ? {
            ...p,
            estado: status,
            agenda: status === "Disponible" ? "Disponible ahora" : p.agenda,
            razonBloqueo: status === "Disponible" ? undefined : p.razonBloqueo,
          }
          : p
      )
    );
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`¿Deseas retirar ${selectedIds.length} consultorio(s) de la lista?`)) {
      setConsultorios((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const openBlockModal = (consultorio: Consultorio) => {
    setBlockingConsultorio(consultorio);
    setBlockReason(consultorio.razonBloqueo || "");
  };

  const closeBlockModal = () => {
    setBlockingConsultorio(null);
    setBlockReason("");
  };

  const handleConfirmBlock = () => {
    if (!blockingConsultorio || blockReason.trim().length === 0) return;

    setConsultorios((prev) =>
      prev.map((p) =>
        p.id === blockingConsultorio.id
          ? {
            ...p,
            estado: "Bloqueado",
            agenda: blockReason.trim(),
            razonBloqueo: blockReason.trim(),
          }
          : p
      )
    );
    setConfirmationMessage(`${blockingConsultorio.nombre} fue bloqueado correctamente.`);
    closeBlockModal();
  };

  const handleEnable = (id: string) => {
    setConsultorios((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, estado: "Disponible", agenda: "Disponible ahora", razonBloqueo: undefined }
          : p
      )
    );
  };


  const filtered = consultorios.filter((p) => {
    const matchesSearch =
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.estado.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "Todos" || p.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const allSelected = filtered.length > 0 && filtered.every((p) => selectedIds.includes(p.id));

  const statuses = ["Todos", "Disponible", "Bloqueado"];
  const availableCount = consultorios.filter((p) => p.estado === "Disponible").length;
  const blockedCount = consultorios.length - availableCount;
  const occupancy = consultorios.length > 0 ? Math.round((blockedCount / consultorios.length) * 100) : 0;

  const tableHeaders = [
    {
      key: "select",
      label: (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => setSelectedIds(e.target.checked ? filtered.map((p) => p.id) : [])}
          className="size-4 rounded border-slate-300 accent-primary"
          aria-label="Seleccionar todos los consultorios"
        />
      ),
      className: "py-4 px-6 w-12",
    },
    { key: "consultorio", label: "Consultorio", className: "py-4 px-6" },
    { key: "estado", label: "Estado actual", className: "py-4 px-6" },
    { key: "agenda", label: "Agenda", className: "py-4 px-6" },
    { key: "acciones", label: "Acciones", className: "py-4 px-6 text-right" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <section className="flex-1">
        <div className="flex items-start gap-4 mb-6 flex-col sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Consultorios
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Supervisa disponibilidad, sector y agenda de cada espacio clínico.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            icon="check_circle_unread"
            iconBgClass="bg-primary/10"
            iconTextClass="text-primary"
            label="Consultorios Libres"
            value={availableCount.toString()}
          />
          <StatCard
            icon="block"
            iconBgClass="bg-red-100 dark:bg-red-900/20"
            iconTextClass="text-red-600"
            label="Consultorios Bloqueados"
            value={blockedCount.toString()}
          />
          <StatCard
            icon="reduce_capacity"
            iconBgClass="bg-indigo-100 dark:bg-indigo-900/20"
            iconTextClass="text-indigo-600"
            label="Ocupación Promedio"
            value={occupancy + "%"}
          />
        </div>

        {confirmationMessage && (
          <div className="mt-6 flex items-start justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200">
            <div className="flex items-start gap-3">
              <MaterialIcon name="check_circle" className="mt-0.5 text-xl text-emerald-600 dark:text-emerald-300" />
              <div>
                <p className="text-sm font-bold">Bloqueo confirmado</p>
                <p className="text-sm">{confirmationMessage}</p>
              </div>
            </div>
            <button
              onClick={() => setConfirmationMessage("")}
              className="flex size-7 shrink-0 items-center justify-center rounded-lg text-emerald-700 transition hover:bg-emerald-100 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
              aria-label="Cerrar mensaje de confirmación"
            >
              <MaterialIcon name="close" className="text-lg" />
            </button>
          </div>
        )}

        <div className="relative my-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <MaterialIcon name="search" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por consultorio o estado..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <button
                onClick={() => {
                  setIsStatusDropdownOpen(!isStatusDropdownOpen);
                }}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <MaterialIcon name="tune" className="text-lg text-slate-400" />
                <span>{statusFilter === "Todos" ? "Todos los estados" : statusFilter}</span>
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
                      className={`text-left px-3 py-2 rounded-lg text-xs font-semibold ${statusFilter === s
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

            {selectedIds.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <span className="px-2 text-xs font-bold text-slate-500">{selectedIds.length} seleccionados</span>
                <button
                  onClick={() => handleBulkStatus("Disponible")}
                  className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300"
                >
                  Liberar
                </button>
                <button
                  onClick={() => handleBulkStatus("Bloqueado")}
                  className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 transition hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300"
                >
                  Bloquear
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-300"
                >
                  Retirar
                </button>
              </div>
            )}
          </div>
        </div>

        <DataTable
          title="Estado de consultorios"
          headers={tableHeaders}
          pagination={{
            currentPage: currentPage,
            totalPages: 1,
            showingText: `Mostrando ${filtered.length} de ${consultorios.length} consultorios`,
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
                  onChange={(e) =>
                    setSelectedIds((prev) =>
                      e.target.checked ? [...prev, p.id] : prev.filter((id) => id !== p.id)
                    )
                  }
                  className="size-4 rounded border-slate-300 accent-primary"
                  aria-label={`Seleccionar ${p.nombre}`}
                />
              </td>

              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    <MaterialIcon name="door_front" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{p.nombre}</p>
                    <p className="text-xs font-semibold text-slate-400">{p.id}</p>
                  </div>
                </div>
              </td>

              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <PriorityBadge label={p.estado} variant={p.estado === "Bloqueado" ? "warning" : "success"} />
                </div>
              </td>

              <td className="py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                {p.agenda}
              </td>

              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => p.estado === "Disponible" ? openBlockModal(p) : handleEnable(p.id)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                    p.estado === "Disponible"
                      ? "border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-900/20"
                      : "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
                  }`}
                >
                  <MaterialIcon name={p.estado === "Disponible" ? "block" : "lock_open"} className="text-base" />
                  {p.estado === "Disponible" ? "Bloquear" : "Habilitar"}
                </button>
              </td>

            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={tableHeaders.length} className="px-6 py-12 text-center">
                <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                    <MaterialIcon name="search_off" className="text-2xl" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    No hay consultorios con esos filtros
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ajusta la búsqueda, el sector o el estado para ver más resultados.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </DataTable>
      </section>

      <Modal isOpen={Boolean(blockingConsultorio)} onClose={closeBlockModal}>
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300">
              <MaterialIcon name="block" className="text-2xl" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                Bloquear consultorio
              </h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {blockingConsultorio?.nombre}
              </p>
            </div>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Razón del bloqueo
            </span>
            <textarea
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              rows={4}
              placeholder="Ej. Limpieza profunda, mantenimiento, equipo no disponible..."
              className="resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              autoFocus
            />
          </label>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              onClick={closeBlockModal}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmBlock}
              disabled={blockReason.trim().length === 0}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Bloquear
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
