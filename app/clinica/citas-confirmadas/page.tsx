"use client";

import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import MaterialIcon from "../../components/MaterialIcon";

interface Cita {
  id: string;
  paciente: string;
  pacienteId: string;
  servicio: string;
  fecha: string;
  hora: string;
  estado: string;
}

const initialCitas: Cita[] = [
  {
    id: "#CT-8902",
    paciente: "Roberto Jiménez",
    pacienteId: "2.089.432",
    servicio: "Odontología Preventiva",
    fecha: "2026-02-26",
    hora: "08:30 AM",
    estado: "Confirmada",
  },
  {
    id: "#CT-8905",
    paciente: "Lucía Fernández",
    pacienteId: "3.122.908",
    servicio: "Cardiología",
    fecha: "2026-02-26",
    hora: "10:45 AM",
    estado: "Confirmada",
  },
  {
    id: "#CT-8912",
    paciente: "Fernando Torres",
    pacienteId: "1.556.778",
    servicio: "Dermatología",
    fecha: "2026-02-27",
    hora: "02:15 PM",
    estado: "Confirmada",
  },
];

export default function CitasConfirmadas() {
  const [citas] = useState<Cita[]>(initialCitas);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [search, setSearch] = useState("");

  const [filteredCitas, setFilteredCitas] = useState<Cita[]>(initialCitas);
  const [currentPage, setCurrentPage] = useState(1);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilter = () => {
    let result = citas;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.paciente.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.servicio.toLowerCase().includes(q)
      );
    }

    if (startDate) {
      result = result.filter((c) => c.fecha >= startDate);
    }

    if (endDate) {
      result = result.filter((c) => c.fecha <= endDate);
    }

    setFilteredCitas(result);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredCitas.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const handleSendToCommandCenter = () => {
    if (selectedIds.length === 0) return;
    setFeedbackMessage(
      `Se han enviado ${selectedIds.length} citas confirmadas al Command Center para su monitoreo en tiempo real.`
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearSelection();
  };

  const allSelected = filteredCitas.length > 0 && selectedIds.length === filteredCitas.length;

  const tableHeaders = [
    {
      key: "select",
      label: (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => handleSelectAll(e.target.checked)}
          className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/20 bg-white dark:bg-slate-800 cursor-pointer"
        />
      ),
      className: "text-center w-12",
    },
    { key: "id", label: "ID Cita" },
    { key: "paciente", label: "Paciente" },
    { key: "servicio", label: "Servicio" },
    { key: "fecha", label: "Fecha" },
    { key: "hora", label: "Hora" },
    { key: "estado", label: "Estado" },
    { key: "acciones", label: "Acciones", className: "text-center" },
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Citas Confirmadas</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Listado de todas las citas agendadas y confirmadas.
        </p>
      </div>

      {selectedIds.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-white size-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/20">
              {selectedIds.length}
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-bold text-sm">Citas Seleccionadas</span>
              <span className="text-[11px] text-primary/60 font-medium tracking-wide uppercase">
                Preparadas para envío
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={handleSendToCommandCenter}
              className="flex-1 md:flex-none bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md cursor-pointer"
            >
              <MaterialIcon name="send_and_archive" className="text-lg" />
              Enviar a Command Center
            </button>
            <button
              onClick={clearSelection}
              className="flex-1 md:flex-none text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-end gap-4">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                Fecha de Inicio
              </label>
              <div className="relative">
                <MaterialIcon
                  name="calendar_today"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                Fecha de Fin
              </label>
              <div className="relative">
                <MaterialIcon
                  name="calendar_today"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                Búsqueda Rápida
              </label>
              <div className="relative">
                <MaterialIcon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Paciente, ID..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleFilter}
            className="w-full lg:w-auto bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-8 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all cursor-pointer animate-pulse"
          >
            Filtrar
          </button>
        </div>
      </div>

      <DataTable
        headers={tableHeaders}
        pagination={{
          currentPage: currentPage,
          totalPages: 1,
          showingText: `Mostrando ${filteredCitas.length} citas confirmadas`,
          onPageChange: setCurrentPage,
        }}
      >
        {filteredCitas.map((cita) => (
          <tr
            key={cita.id}
            className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
          >
            <td className="px-6 py-4 text-center">
              <input
                type="checkbox"
                checked={selectedIds.includes(cita.id)}
                onChange={(e) => handleSelectRow(cita.id, e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/20 bg-white dark:bg-slate-800 cursor-pointer"
              />
            </td>
            <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400">{cita.id}</td>
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <span className="text-sm font-bold">{cita.paciente}</span>
                <span className="text-[11px] text-slate-400">ID: {cita.pacienteId}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-sm font-medium">{cita.servicio}</td>
            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{cita.fecha}</td>
            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{cita.hora}</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {cita.estado}
              </span>
            </td>
            <td className="px-6 py-4 text-center">
              <button
                onClick={() => alert(`Visualizando detalles de la cita: ${cita.id}`)}
                className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
              >
                <MaterialIcon name="visibility" className="text-xl" />
              </button>
            </td>
          </tr>
        ))}
      </DataTable>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-center">
          <div className="size-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MaterialIcon name="check_circle" className="text-4xl" />
          </div>
          <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
            ¡Operación Exitosa!
          </h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{feedbackMessage}</p>
          <button
            onClick={handleCloseModal}
            className="w-full bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white font-bold py-3.5 rounded-2xl hover:opacity-90 transition-all shadow-lg cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </Modal>
    </>
  );
}
