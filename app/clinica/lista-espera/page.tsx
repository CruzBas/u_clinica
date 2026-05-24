"use client";

import React, { useState } from "react";
import DataTable from "../../componentes/DataTable";
import PriorityBadge from "../../componentes/PriorityBadge";
import Modal from "../../componentes/Modal";
import MaterialIcon from "../../componentes/MaterialIcon";

interface Paciente {
  id: number;
  nombre: string;
  servicio: string;
  fecha: string;
  prioridad: string;
  estado: string;
}

const initialPacientes: Paciente[] = [
  { id: 1, nombre: "Juan Pérez", servicio: "Consulta General", fecha: "24/10/2023", prioridad: "Alta", estado: "Pendiente" },
  { id: 2, nombre: "María García", servicio: "Odontología", fecha: "24/10/2023", prioridad: "Media", estado: "Pendiente" },
  { id: 3, nombre: "Carlos López", servicio: "Dermatología", fecha: "23/10/2023", prioridad: "Baja", estado: "Pendiente" },
  { id: 4, nombre: "Ana Martínez", servicio: "Pediatría", fecha: "23/10/2023", prioridad: "Alta", estado: "Pendiente" },
];

const profesoresList = [
  { name: "Dr. Ricardo Espinoza", specialty: "Medicina General" },
  { name: "Dra. Marta Sánchez", specialty: "Odontología" },
  { name: "Dr. Carlos Vaca", specialty: "Dermatología" },
  { name: "Dra. Elena Martínez", specialty: "Pediatría" },
];

export default function ListaEspera() {
  const [pacientes] = useState<Paciente[]>(initialPacientes);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedProfs, setSelectedProfs] = useState<string[]>([]);
  const [isProfDropdownOpen, setIsProfDropdownOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const activeIds = filtered.map((p) => p.id);
      setSelectedIds(activeIds);
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

  const handleProfCheckboxChange = (name: string, checked: boolean) => {
    if (checked) {
      setSelectedProfs((prev) => [...prev, name]);
    } else {
      setSelectedProfs((prev) => prev.filter((p) => p !== name));
    }
  };

  const clearSelection = () => {
    setSelectedIds([]);
    setSelectedProfs([]);
    setIsProfDropdownOpen(false);
  };

  const handleShare = () => {
    if (selectedProfs.length === 0) {
      alert("Por favor selecciona al menos un profesor.");
      return;
    }
    setIsSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    clearSelection();
  };

  const filtered = pacientes.filter(
    (p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.servicio.toLowerCase().includes(search.toLowerCase())
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
          className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary bg-transparent cursor-pointer"
        />
      ),
    },
    { key: "nombre", label: "Nombre del Paciente" },
    { key: "servicio", label: "Servicio" },
    { key: "fecha", label: "Fecha Recibida" },
    { key: "prioridad", label: "Prioridad" },
    { key: "estado", label: "Estado" },
  ];

  const getDropdownText = () => {
    if (selectedProfs.length === 0) return "Seleccionar Profesores...";
    if (selectedProfs.length === 1) return selectedProfs[0];
    return `${selectedProfs.length} Profesores Seleccionados`;
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Lista de Espera</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Selecciona pacientes para compartir sus expedientes con los profesores encargados.
        </p>
      </div>

      {selectedIds.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-white size-6 rounded-full flex items-center justify-center text-xs font-bold">
                {selectedIds.length}
              </div>
              <span className="text-primary font-semibold text-sm">Pacientes Seleccionados</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto relative">
              <div className="relative w-full sm:w-80">
                <button
                  onClick={() => setIsProfDropdownOpen(!isProfDropdownOpen)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-primary/20 rounded-lg text-sm flex items-center justify-between font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                >
                  <span className={selectedProfs.length > 0 ? "text-primary font-bold" : ""}>
                    {getDropdownText()}
                  </span>
                  <MaterialIcon
                    name="expand_more"
                    className="text-primary transition-transform"
                  />
                </button>

                {isProfDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 flex flex-col p-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Profesores Disponibles
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 max-h-48 overflow-y-auto scrollbar-thin">
                      {profesoresList.map((prof) => (
                        <label
                          key={prof.name}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedProfs.includes(prof.name)}
                            onChange={(e) => handleProfCheckboxChange(prof.name, e.target.checked)}
                            className="rounded text-primary focus:ring-primary cursor-pointer"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{prof.name}</span>
                            <span className="text-[10px] text-slate-400">{prof.specialty}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleShare}
                  className="flex-1 sm:flex-none bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 cursor-pointer"
                >
                  <MaterialIcon name="send" className="text-base font-bold" />
                  Compartir
                </button>
                <button
                  onClick={clearSelection}
                  className="flex-1 sm:flex-none text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DataTable
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Filtrar por nombre o servicio..."
        headers={tableHeaders}
        pagination={{
          currentPage: currentPage,
          totalPages: 2,
          showingText: `Mostrando ${filtered.length} de 128 pacientes en espera`,
          onPageChange: setCurrentPage,
        }}
      >
        {filtered.map((paciente) => (
          <tr
            key={paciente.id}
            className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
          >
            <td className="px-6 py-4">
              <input
                type="checkbox"
                checked={selectedIds.includes(paciente.id)}
                onChange={(e) => handleSelectRow(paciente.id, e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary bg-transparent cursor-pointer"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap font-medium">{paciente.nombre}</td>
            <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
              {paciente.servicio}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
              {paciente.fecha}
            </td>
            <td className="px-6 py-4">
              <PriorityBadge label={paciente.prioridad} />
            </td>
            <td className="px-6 py-4">
              <PriorityBadge label={paciente.estado} />
            </td>
          </tr>
        ))}
      </DataTable>

      <Modal isOpen={isSuccessModalOpen} onClose={handleSuccessModalClose}>
        <div className="text-center">
          <div className="size-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <MaterialIcon name="check_circle" className="text-4xl" />
          </div>
          <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
            ¡Compartido con Éxito!
          </h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            Los expedientes han sido enviados al profesor seleccionado correctamente.
          </p>
          <button
            onClick={handleSuccessModalClose}
            className="w-full bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </Modal>
    </>
  );
}
