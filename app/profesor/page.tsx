"use client";

import React, { useState } from "react";
import Link from "next/link";
import MaterialIcon from "../components/MaterialIcon";
import PriorityBadge from "../components/PriorityBadge";
import Modal from "../components/Modal";

interface Registro {
  id: number;
  nombre: string;
  email: string;
  curso: string;
  fecha: string;
  estado: string;
}

const initialRegistros: Registro[] = [
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

const materias = [
  "Anatomia",
  "Bioquimica",
  "Farmacologia",
  "Fisiologia",
  "Practica Clinica",
];

const cuatrimestres = ["I", "II", "III"];

export default function ProfesorDashboard() {
  const [registros] = useState<Registro[]>(initialRegistros);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materia, setMateria] = useState(materias[0]);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear + index);
  const [cuatrimestre, setCuatrimestre] = useState(cuatrimestres[0]);
  const [anio, setAnio] = useState(String(currentYear));
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);

  };
   const handleCreateLink = () => {
    setIsModalOpen(true);
  };

  const handleCopyLink = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams({
      materia,
      cuatrimestre,
      anio,
      vence: fechaVencimiento,
    });

    navigator.clipboard.writeText(`${window.location.origin}/registro?${params.toString()}`);
    alert("¡Enlace de registro copiado al portapapeles!");
    handleCloseModal();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Resumen del Tablero
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Overview of the active recruitment and onboarding cycle.
          </p>
        </div>

        <div>
          <button
            onClick={handleCreateLink}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all cursor-pointer"
          >
            <MaterialIcon name="link" className="text-lg" />
            Crear Enlace de Registro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Total De Estudiantes Activos
            </p>
            <MaterialIcon name="groups" className="text-primary" />
          </div>
          <p className="text-slate-900 dark:text-white text-3xl font-black leading-tight">20</p>
        </div>
      </div>

      <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Registros Recientes</h3>
          <Link href="/profesor/practicantes" className="text-primary text-sm font-bold hover:underline">
            Ver Todos
          </Link>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Nombre del Practicante
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Curso
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Fecha de Registro
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Estado
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {registros.map((reg) => (
                <tr
                  key={reg.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{reg.nombre}</p>
                      <p className="text-xs text-slate-500">{reg.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {reg.curso}
                  </td>
                  <td className="p-4 text-sm text-slate-500">{reg.fecha}</td>
                  <td className="p-4">
                    <PriorityBadge label={reg.estado} />
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Detalles del practicante: ${reg.nombre}`)}
                      className="text-slate-400 hover:text-primary transition-colors cursor-pointer"
                    >
                      <MaterialIcon name="arrow_right" className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleCopyLink} className="flex flex-col gap-5">
          <div className="text-center">
          <div className="size-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MaterialIcon name="link" className="text-4xl" />
          </div>
          <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
            Crear enlace de registro
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Seleccione la informacion que tendra el formulario de registro.
          </p>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
              Materia
              <select
                value={materia}
                onChange={(event) => setMateria(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                required
              >
                {materias.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                Cuatrimestre
                <select
                  value={cuatrimestre}
                  onChange={(event) => setCuatrimestre(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  required
                >
                  {cuatrimestres.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                Año
                <select
                  value={anio}
                  onChange={(event) => setAnio(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  required
                >
                  {years.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
              Fecha de vencimiento
              <input
                type="date"
                value={fechaVencimiento}
                onChange={(event) => setFechaVencimiento(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                required
              />
            </label>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleCloseModal}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90 dark:bg-slate-100 dark:text-slate-900 cursor-pointer"
           onClick={handleCopyLink}
          >
            <MaterialIcon name="content_copy" className="text-lg" />
            Copiar Enlace
          </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
