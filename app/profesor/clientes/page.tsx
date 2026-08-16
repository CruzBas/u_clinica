"use client";

import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import PriorityBadge from "../../components/PriorityBadge";
import MaterialIcon from "../../components/MaterialIcon";
import Modal from "../../components/Modal";

interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  servicio: string;
  fechaIngreso: string;
  prioridad: string;
}
interface Registro {
  id: number;
  nombre: string;
  email: string;
  curso: string;
  fecha: string;
  estado: string;
}

const initialClientes: Cliente[] = [
  {
    id: 1,
    nombre: "Alejandro Ruiz",
    telefono: "+57 321 456 7890",
    servicio: "Consultoría",
    fechaIngreso: "12 Ene 2024",
    prioridad: "Alta"
  },
  {
    id: 2,
    nombre: "Sofía Méndez",
    telefono: "+57 300 123 4567",
    servicio: "Parejas",
    fechaIngreso: "05 Feb 2024",
    prioridad: "Media"
  },
  {
    id: 3,
    nombre: "Mateo García",
    telefono: "+57 315 789 0123",
    servicio: "Terapia Individual",
    fechaIngreso: "20 Feb 2024",
    prioridad: "Baja"
  },
  {
    id: 4,
    nombre: "Valeria López",
    telefono: "+57 311 222 3333",
    servicio: "Terapia Familiar",
    fechaIngreso: "01 Mar 2024",
    prioridad: "Alta"
  },
];

const Estudiantes: Registro[] = [
  {
    id: 1,
    nombre: "John Doe",
    email: "john.doe@example.com",
    curso: "Product Design",
    fecha: "Oct 24, 2023",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Alice Smith",
    email: "alice.s@example.com",
    curso: "Software Eng",
    fecha: "Oct 23, 2023",
    estado: "Pendiente",
  },
  {
    id: 3,
    nombre: "Michael Ross",
    email: "ross.m@example.com",
    curso: "Marketing",
    fecha: "Oct 22, 2023",
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Sarah King",
    email: "sarah.k@example.com",
    curso: "Data Analytics",
    fecha: "Oct 21, 2023",
    estado: "Inactivo",
  },
];

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);

  const [isStudentSelectOpen, setIsStudentSelectOpen] = useState(false);

  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null);

  const[clienteToSee, setClienteTosee] = useState<Cliente | null>(null);

  const[ModalConfirmOpen,setModalConfirmOpen]= useState(false);
  const[ModalMassage, setModalMassage] = useState("");

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
    if (selectedStudentIds.length === 0) {
      alert("Seleccione al menos un estudiante.");
      return;
    }

    setModalMassage(
      `Se han enviado ${selectedIds.length} registro(s) a ${selectedStudentIds.length} estudiante(s).`
    );
    setSelectedIds([]);
    setSelectedStudentIds([]);
    setIsStudentSelectOpen(false);
    setModalConfirmOpen(true);
  };

  const clearSelection = () => {
    setSelectedIds([]);
    setSelectedStudentIds([]);
    setIsStudentSelectOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!clienteToDelete) return;

    setClientes((prev) => prev.filter((cliente) => cliente.id !== clienteToDelete.id));
    setSelectedIds((prev) => prev.filter((id) => id !== clienteToDelete.id));
    setClienteToDelete(null);
  };
  const handleCloseModal = () => {
    setClienteTosee(null);
    setModalConfirmOpen(false);
  };

  const filtered = clientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.servicio.toLowerCase().includes(search.toLowerCase()) ||
      c.telefono.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStudent = (id: number) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedStudentsText =
    selectedStudentIds.length > 0
      ? `${selectedStudentIds.length} estudiante(s) seleccionados`
      : "Seleccione estudiantes";
  const selectedStudentNames = Estudiantes.filter((student) =>
    selectedStudentIds.includes(student.id)
  )
    .map((student) => student.nombre)
    .join(", ");

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
    { key: "servicio", label: "Servicio Solicitado", className: "py-4 px-6" },
    { key: "fechaIngreso", label: "Fecha de Ingreso", className: "py-4 px-6" },
    { key: "prioridad", label: "Prioridad", className: "py-4 px-6" },
    { key: "acciones", label: "Acciones", className: "py-4 px-6 text-right" },
  ];

  return (
    <>
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
          <div className="mb-6 rounded-xl border border-primary/20 bg-white p-4 shadow-sm animate-in slide-in-from-top-4 duration-300 dark:bg-slate-900 dark:border-primary/30">
            <div className="flex flex-col xl:flex-row xl:items-center gap-4">
              <div className="flex items-center gap-3 min-w-0 xl:w-72">
                <div className="bg-primary text-white size-9 shrink-0 rounded-full flex items-center justify-center text-sm font-black">
                  {selectedIds.length}
                </div>
                <div className="min-w-0">
                  <span className="block text-slate-900 dark:text-slate-100 font-bold text-sm">
                    Personas seleccionadas
                  </span>
                  <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                    Registros listos para asignar
                  </span>
                </div>
              </div>

              <div className="relative min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => setIsStudentSelectOpen((prev) => !prev)}
                  className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-left transition-all hover:border-primary/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 cursor-pointer"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <MaterialIcon name="school" className="text-primary text-xl shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-slate-900 dark:text-slate-100">
                        {selectedStudentsText}
                      </span>
                      <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                        {selectedStudentNames || "Puede seleccionar mas de uno"}
                      </span>
                    </span>
                  </span>
                  <MaterialIcon
                    name={isStudentSelectOpen ? "expand_less" : "expand_more"}
                    className="text-slate-400 shrink-0"
                  />
                </button>

                {isStudentSelectOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-950">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-2 py-2 dark:border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        Estudiantes
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedStudentIds([])}
                        disabled={selectedStudentIds.length === 0}
                        className="rounded-md px-2 py-1 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-red-500 disabled:pointer-events-none disabled:opacity-40 dark:hover:bg-slate-800 cursor-pointer"
                      >
                        Limpiar
                      </button>
                    </div>

                    <div className="mt-2 grid max-h-64 gap-1 overflow-y-auto">
                      {Estudiantes.map((item) => {
                        const isSelected = selectedStudentIds.includes(item.id);

                        return (
                          <label
                            key={item.id}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-primary/10 text-primary"
                                : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleStudent(item.id)}
                              className="size-4 shrink-0 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-bold">{item.nombre}</span>
                              <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                                {item.curso}
                              </span>
                            </span>
                            {isSelected && (
                              <MaterialIcon name="check" className="text-primary text-lg shrink-0" />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 xl:w-auto">
                <button
                  onClick={handleSendToStudents}
                  className="min-h-12 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MaterialIcon name="check_circle" className="text-base" />
                  <span className="whitespace-nowrap">Enviar</span>
                </button>
                <button
                  onClick={clearSelection}
                  className="min-h-12 border border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-red-900/40 dark:hover:bg-red-950/20 px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>

            {selectedStudentIds.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                {Estudiantes.filter((student) => selectedStudentIds.includes(student.id)).map(
                  (student) => (
                    <span
                      key={student.id}
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                    >
                      {student.nombre}
                      <button
                        type="button"
                        onClick={() => handleToggleStudent(student.id)}
                        className="flex size-4 items-center justify-center rounded-full hover:bg-primary/10 cursor-pointer"
                        aria-label={`Quitar ${student.nombre}`}
                      >
                        <MaterialIcon name="close" className="text-sm" />
                      </button>
                    </span>
                  )
                )}
              </div>
            )}
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
              <td className="py-4 px-6"><span className="text-sm font-bold text-slate-900 dark:text-white">{c.nombre}</span></td>
              <td className="py-4 px-6 text-sm font-medium text-slate-700 dark:text-slate-300">
                {c.telefono}
              </td>
              <td className="py-4 px-6 text-sm text-slate-500 font-bold">{c.servicio}</td>
              <td className="py-4 px-6 text-sm text-slate-500">{c.fechaIngreso}</td>
              
              <td className="py-4 px-6"><PriorityBadge label={c.prioridad} /></td>
              <td className="py-4 px-10 text-right">
                <button
                  onClick={() => setClienteTosee(c)}
                  className="text-slate-400 hover:text-primary cursor-pointer"
                >
                  <MaterialIcon name="visibility" />
                </button>
                <button
                  onClick={() => setClienteToDelete(c)}
                  className="text-slate-400 hover:text-red-500 cursor-pointer"
                  aria-label={`Eliminar ${c.nombre}`}
                >
                  <MaterialIcon name="delete" />
                </button>
              </td>
            </tr>
          ))}
        </DataTable>
      </section>
    </div>
    <Modal isOpen={clienteToSee != null} onClose={handleCloseModal}>
      <div className="relative">
        <button
          type="button"
          onClick={handleCloseModal}
          className="absolute right-0 top-0 flex size-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200 cursor-pointer"
          aria-label="Cerrar modal"
        >
          <MaterialIcon name="close" className="text-xl" />
        </button>

        <div className="pr-10">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">
            Expediente del paciente
          </p>
          <h4 className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">
            Informacion del paciente
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Resumen de datos principales para revision y asignacion clinica.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-white text-2xl font-black text-primary shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
              {clienteToSee?.nombre.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h5 className="truncate text-lg font-black text-slate-900 dark:text-slate-100">
                {clienteToSee?.nombre}
              </h5>
              <div className="mt-2 flex flex-wrap gap-2">
                <PriorityBadge label={clienteToSee?.prioridad ?? ""} />
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-sm dark:bg-slate-950 dark:text-slate-400">
                  Ingreso: {clienteToSee?.fechaIngreso}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <div className="flex items-start gap-3 rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-800">
            <MaterialIcon name="call" className="mt-0.5 text-xl text-primary" />
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Telefono
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-100">
                {clienteToSee?.telefono}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-800">
            <MaterialIcon name="medical_services" className="mt-0.5 text-xl text-primary" />
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Servicio solicitado
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-100">
                {clienteToSee?.servicio}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-800">
            <MaterialIcon name="event_available" className="mt-0.5 text-xl text-primary" />
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Fecha de ingreso
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-100">
                {clienteToSee?.fechaIngreso}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCloseModal}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white cursor-pointer"
        >
          <MaterialIcon name="check" className="text-lg" />
          Entendido
        </button>
      </div>
    </Modal>

    <Modal isOpen={clienteToDelete !== null} onClose={() => setClienteToDelete(null)}>
      <div className="relative flex flex-col gap-6">
        <button
          type="button"
          onClick={() => setClienteToDelete(null)}
          className="absolute right-0 top-0 flex size-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200 cursor-pointer"
          aria-label="Cerrar modal"
        >
          <MaterialIcon name="close" className="text-xl" />
        </button>

        <div className="flex flex-col items-center px-4 pt-2 text-center">
          <div className="relative mb-4 flex size-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100 dark:bg-red-950/30 dark:ring-red-900/40">
            <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-white text-red-600 shadow-sm ring-1 ring-red-100 dark:bg-slate-950 dark:ring-red-900/40">
              <MaterialIcon name="priority_high" className="text-base" />
            </div>
            <MaterialIcon name="delete" className="text-3xl" />
          </div>

          <p className="text-xs font-bold uppercase tracking-wide text-red-500">
            Confirmacion requerida
          </p>
          <h4 className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">
            Eliminar cliente
          </h4>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
            Este registro se ocultara de la lista de espera al confirmar la accion.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-white text-lg font-black text-primary shadow-sm dark:bg-slate-950">
              {clienteToDelete?.nombre.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1 py-3 pr-3">
              <p className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
                {clienteToDelete?.nombre}
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-500 shadow-sm dark:bg-slate-950 dark:text-slate-400">
                  {clienteToDelete?.servicio}
                </span>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-500 shadow-sm dark:bg-slate-950 dark:text-slate-400">
                  {clienteToDelete?.telefono}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-left dark:border-red-900/40 dark:bg-red-950/20">
          <MaterialIcon name="info" className="mt-0.5 text-lg text-red-600" />
          <p className="text-xs leading-5 text-red-700 dark:text-red-300">
            Esta es una eliminacion simulada: el cliente desaparecera de la tabla en esta vista.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setClienteToDelete(null)}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 cursor-pointer"
          >
            Mantener
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 cursor-pointer"
          >
            <MaterialIcon name="delete" className="text-lg" />
            Eliminar cliente
          </button>
        </div>
      </div>
    </Modal>
    <Modal isOpen={ModalConfirmOpen} onClose={handleCloseModal}>
            <div className="text-center">
              <div className="size-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MaterialIcon name="check_circle" className="text-4xl" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                ¡Operación Exitosa!
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{ModalMassage}</p>
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
