"use client";

import React, { useState } from "react";
import MaterialIcon from "../components/MaterialIcon";
import Modal from "../components/Modal";

interface PacienteAsignado {
  id: number;
  nombre: string;
  cedula: string;
  iniciales: string;
  bgClass: string;
  textClass: string;
}

interface Booking {
  id: number;
  time: string;
  dayIndex: number;
  consultorio: string;
  owner: "me" | "other";
}

const initialPacientes: PacienteAsignado[] = [
  {
    id: 1,
    nombre: "María Arrieta",
    cedula: "1-1939-0826",
    iniciales: "MA",
    bgClass: "bg-blue-100 dark:bg-blue-900/40",
    textClass: "text-primary dark:text-blue-400",
  },
  {
    id: 2,
    nombre: "Fiorella Monge",
    cedula: "1-1939-0827",
    iniciales: "FM",
    bgClass: "bg-purple-100 dark:bg-purple-900/40",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const diasSemana = [
  { key: "Lunes", label: "Lunes", num: "20" },
  { key: "Martes", label: "Martes", num: "21" },
  { key: "Miercoles", label: "Miércoles", num: "22" },
  { key: "Jueves", label: "Jueves", num: "23" },
  { key: "Viernes", label: "Viernes", num: "24" },
  { key: "Sabado", label: "Sábado", num: "25" },
  { key: "Domingo", label: "Domingo", num: "26" },
];

const horasSemana = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const fixedOccupied: Booking[] = [
  { id: 1, time: "08:00 AM", dayIndex: 1, consultorio: "Cons. 1", owner: "other" },
  { id: 2, time: "09:00 AM", dayIndex: 0, consultorio: "Cons. 2", owner: "other" },
  { id: 3, time: "10:00 AM", dayIndex: 2, consultorio: "Cons. 3", owner: "other" },
  { id: 4, time: "11:00 AM", dayIndex: 4, consultorio: "Cons. 1", owner: "other" },
  { id: 5, time: "02:00 PM", dayIndex: 1, consultorio: "Cons. 2", owner: "other" },
  { id: 6, time: "02:00 PM", dayIndex: 3, consultorio: "Cons. 3", owner: "other" },
  { id: 7, time: "04:00 PM", dayIndex: 0, consultorio: "Cons. 1", owner: "other" },
  { id: 8, time: "04:00 PM", dayIndex: 2, consultorio: "Cons. 2", owner: "other" },
];

export default function EstudianteDashboard() {
  const [activePaciente, setActivePaciente] = useState<PacienteAsignado | null>(null);
  const [selectedBookingCell, setSelectedBookingCell] = useState<{ dayLabel: string; dayIndex: number; hour: string } | null>(null);
  const [selectedManagedBooking, setSelectedManagedBooking] = useState<Booking | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isManageBookingModalOpen, setIsManageBookingModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(fixedOccupied);
  const [isModalConfirm, setisModalConfirm] = useState(false);
  const [selectedConsultorio, setSelectedConsultorio] = useState("Consultorio #1");
  const [feedbackMessage ,setfeedbackMessage]= useState("");
  const [bookingMode, setBookingMode] = useState<"create" | "reschedule">("create");

  const openContact = (paciente: PacienteAsignado) => {
    setActivePaciente(paciente);
    setIsContactModalOpen(true);
  };

  const handleCellClick = (dayLabel: string, dayIndex: number, hour: string) => {
    setSelectedBookingCell({ dayLabel, dayIndex, hour });
    if (bookingMode === "create") {
      setSelectedConsultorio("Consultorio #1");
    }
    setIsBookingModalOpen(true);
  };

  const handleManageBooking = (booking: Booking) => {
    if (booking.owner !== "me") return;
    setSelectedManagedBooking(booking);
    setIsManageBookingModalOpen(true);
  };

  const confirmBooking = () => {
    if (!selectedBookingCell) return;
    const { hour, dayIndex } = selectedBookingCell;

    const newBooking: Booking = {
      id: Date.now(),
      time: hour,
      dayIndex,
      consultorio: selectedConsultorio.replace("Consultorio #", "Cons. "),
      owner: "me",
    };

    setBookings((prev) => [...prev, newBooking]);
    setIsBookingModalOpen(false);
    setSelectedBookingCell(null);
    setisModalConfirm(true);
    setfeedbackMessage("La reserva fue confirmada exitosamente. Ahora puede cancelarla o reagendarla desde el calendario.");
  };

  const cancelManagedBooking = () => {
    if (!selectedManagedBooking) return;
    setBookings((prev) => prev.filter((booking) => booking.id !== selectedManagedBooking.id));
    setIsManageBookingModalOpen(false);
    setSelectedManagedBooking(null);
    setisModalConfirm(true);
    setfeedbackMessage("La cita fue cancelada exitosamente.");
  };

  const startReschedule = () => {
    if (!selectedManagedBooking) return;
    setSelectedConsultorio(selectedManagedBooking.consultorio.replace("Cons. ", "Consultorio #"));
    setBookingMode("reschedule");
    setIsManageBookingModalOpen(false);
    setIsBookingModalOpen(false);
    setSelectedBookingCell(null);
    setfeedbackMessage("Seleccione un nuevo espacio libre para reagendar su cita.");
    setisModalConfirm(true);
  };

  const confirmReschedule = () => {
    if (!selectedBookingCell || !selectedManagedBooking) return;
    const { hour, dayIndex } = selectedBookingCell;

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === selectedManagedBooking.id
          ? {
            ...booking,
            time: hour,
            dayIndex,
            consultorio: selectedConsultorio.replace("Consultorio #", "Cons. "),
          }
          : booking
      )
    );
    setIsBookingModalOpen(false);
    setSelectedBookingCell(null);
    setSelectedManagedBooking(null);
    setBookingMode("create");
    setisModalConfirm(true);
    setfeedbackMessage("La cita fue reagendada exitosamente.");
  };

  const handleCloseModal = () => {
    setisModalConfirm(false);
  };

  const handleBookingModalClose = () => {
    setIsBookingModalOpen(false);
    setSelectedBookingCell(null);
    if (bookingMode === "reschedule") {
      setBookingMode("create");
      setSelectedManagedBooking(null);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <header className="flex shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-clinical-blue">
            <div className="size-8 flex items-center justify-center bg-clinical-blue/10 rounded-lg">
              <MaterialIcon name="medical_services" className="text-clinical-blue text-2xl" />
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Clínica Universitaria</h2>
          </div>
          <h1 className="hidden md:block text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Panel de Gestión
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-950 dark:text-slate-50">Ricardo Pérez</p>
            <p className="text-[10px] text-slate-500 uppercase">Practicante</p>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-clinical-blue/20 bg-slate-200 overflow-hidden">
            <img
              alt="Perfil"
              src="https://ui-avatars.com/api/?name=Ricardo+Perez&background=135bec&color=fff"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 w-full overflow-hidden">
          <section className="w-1/3 max-w-[350px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold">Citas Asignadas</h3>
              <span className="bg-clinical-blue/10 text-clinical-blue text-xs font-bold px-2 py-1 rounded-full">
                {initialPacientes.length}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {initialPacientes.map((paciente) => (
                <div
                  key={paciente.id}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`size-10 rounded-full flex items-center justify-center font-bold text-sm ${paciente.bgClass} ${paciente.textClass}`}
                    >
                      {paciente.iniciales}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {paciente.nombre}
                      </h4>
                      <p className="text-[10px] text-slate-500">Céd: {paciente.cedula}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openContact(paciente)}
                    className="w-full py-2 bg-clinical-blue text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors cursor-pointer"
                  >
                    <MaterialIcon name="contact_phone" className="text-sm" />
                    Gestionar Contacto
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 z-30 shrink-0">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">
                  Horario de Consultorios
                </h2>
                <p className="text-slate-500 text-sm">Semana del 20 al 26 de Mayo</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2 items-center text-[10px] font-bold uppercase text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-danger-red/30 border border-danger-red" />
                    Ocupado por otro
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-clinical-blue/30 border border-clinical-blue" />
                    Mi cita
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700" />
                    Libre
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto scrollbar-thin">
              <div className="grid grid-cols-[80px_repeat(7,_1fr)] min-w-[1000px]">
                <div className="sticky top-0 bg-white dark:bg-slate-900 z-20 border-b border-slate-200 dark:border-slate-800 py-3 text-center" />
                {diasSemana.map((dia) => {
                  const esHoy = dia.key === "Jueves";
                  return (
                    <div
                      key={dia.key}
                      className={`sticky top-0 bg-white dark:bg-slate-900 z-20 border-b border-slate-200 dark:border-slate-800 py-3 text-center ${esHoy ? "bg-clinical-blue/5" : ""
                        }`}
                    >
                      <span
                        className={`block text-[10px] font-black uppercase ${esHoy ? "text-clinical-blue" : "text-slate-400"
                          }`}
                      >
                        {dia.label}
                      </span>
                      <span className={`text-xl font-black ${esHoy ? "text-clinical-blue" : ""}`}>
                        {dia.num}
                      </span>
                    </div>
                  );
                })}

                {horasSemana.map((hora) => (
                  <React.Fragment key={hora}>
                    <div className="sticky left-0 bg-white dark:bg-slate-900 z-10 text-[10px] font-bold text-slate-400 text-right pr-3 pt-2 border-b border-slate-200 dark:border-slate-800">
                      {hora}
                    </div>
                    {Array.from({ length: 7 }).map((_, i) => {
                      const esAlmuerzo = hora === "01:00 PM";
                      const esDomingo = i === 6;
                      const booking = bookings.find((b) => b.time === hora && b.dayIndex === i);

                      if (esAlmuerzo) {
                        return (
                          <div
                            key={i}
                            className="border-b border-r border-slate-200 dark:border-slate-800 min-h-[80px] p-1 bg-slate-50 dark:bg-slate-950/20 flex items-center justify-center italic text-[9px] text-slate-400"
                          >
                            Receso
                          </div>
                        );
                      }

                      if (esDomingo) {
                        return (
                          <div
                            key={i}
                            className="border-b border-r border-slate-200 dark:border-slate-800 min-h-[80px] p-1 bg-slate-50 dark:bg-slate-950/40"
                          />
                        );
                      }

                      if (booking) {
                        const isMine = booking.owner === "me";

                        return (
                          <div
                            key={i}
                            onClick={() => handleManageBooking(booking)}
                            className={`border-b border-r border-slate-200 dark:border-slate-800 min-h-[80px] p-1 transition-colors relative ${isMine ? "cursor-pointer hover:bg-clinical-blue/5" : ""
                              }`}
                          >
                            <div
                              className={`rounded-md p-1 mb-1 text-[9px] font-semibold leading-tight flex flex-col gap-0.5 border-l-2 ${isMine
                                ? "bg-clinical-blue/10 border-clinical-blue text-clinical-blue"
                                : "bg-danger-red/10 border-danger-red text-danger-red"
                                }`}
                            >
                              <span>{booking.consultorio}</span>
                              <span className="opacity-70">{isMine ? "Mi cita" : "Reservado"}</span>
                              {isMine && (
                                <span className="mt-1 inline-flex items-center gap-1 text-[8px] uppercase tracking-wide opacity-80">
                                  <MaterialIcon name="edit_calendar" className="text-[10px]" />
                                  Gestionar
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={i}
                          onClick={() => handleCellClick(diasSemana[i].label + " " + diasSemana[i].num, i, hora)}
                          className={`border-b border-r border-slate-200 dark:border-slate-800 min-h-[80px] p-1 transition-colors relative hover:bg-slate-100/50 dark:hover:bg-slate-800/30 cursor-pointer ${bookingMode === "reschedule" ? "ring-1 ring-inset ring-clinical-blue/20" : ""
                            }`}
                        />
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
        {activePaciente && (
          <div className="relative">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute right-0 top-0 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <MaterialIcon name="close" />
            </button>

            <div className="mb-5 flex items-center gap-4 mt-2">
              <div
                className={`size-14 rounded-full flex items-center justify-center font-bold text-xl shadow-inner border-2 border-white ${activePaciente.bgClass} ${activePaciente.textClass}`}
              >
                {activePaciente.iniciales}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activePaciente.nombre}
                </h3>
                <p className="text-xs text-slate-500 font-medium">Paciente Registrado</p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Cédula: <span className="font-mono">{activePaciente.cedula}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Opciones de contacto
              </p>

              <a
                href="tel:+50688888888"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 hover:border-clinical-blue transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-clinical-blue/10 flex items-center justify-center text-clinical-blue group-hover:bg-clinical-blue group-hover:text-white transition-colors">
                    <MaterialIcon name="call" className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Llamada telefónica</p>
                    <p className="text-[10px] text-slate-500">+506 8888-8888</p>
                  </div>
                </div>
                <MaterialIcon
                  name="chevron_right"
                  className="text-slate-300 group-hover:text-clinical-blue"
                />
              </a>

              <a
                href="https://wa.me/50688888888"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-green-50/50 dark:bg-green-950/10 border border-green-100 dark:border-green-950/30 hover:border-whatsapp transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-whatsapp flex items-center justify-center text-white shadow-sm">
                    <MaterialIcon name="chat" className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-700 dark:text-green-400">WhatsApp</p>
                    <p className="text-[10px] text-green-600/70 dark:text-green-500/50">
                      Enviar mensaje directo
                    </p>
                  </div>
                </div>
                <MaterialIcon name="open_in_new" className="text-green-300 group-hover:text-whatsapp" />
              </a>
            </div>

            <button
              onClick={() => setIsContactModalOpen(false)}
              className="w-full mt-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}
      </Modal>

      <Modal isOpen={isBookingModalOpen} onClose={handleBookingModalClose}>
        {selectedBookingCell && (
          <div className="relative">
            <button
              onClick={handleBookingModalClose}
              className="absolute right-0 top-0 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <MaterialIcon name="close" />
            </button>
            <div className="mb-6 mt-2">
              <h3 className="text-xl font-black text-clinical-blue flex items-center gap-2">
                <MaterialIcon name={bookingMode === "reschedule" ? "edit_calendar" : "add_circle"} />
                {bookingMode === "reschedule" ? "Reagendar Cita" : "Nueva Reserva"}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Día seleccionado</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedBookingCell.dayLabel}
                </p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Hora de inicio</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedBookingCell.hour}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1 ml-1">
                  Consultorio Disponible
                </label>
                <select
                  value={selectedConsultorio}
                  onChange={(e) => setSelectedConsultorio(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm p-3 focus:ring-2 focus:ring-clinical-blue focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100"
                >
                  <option>Consultorio #1</option>
                  <option>Consultorio #2</option>
                  <option>Consultorio #3</option>
                  <option>Consultorio #4</option>
                  <option>Consultorio #5</option>
                  <option>Consultorio #6</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  onClick={handleBookingModalClose}
                  className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={bookingMode === "reschedule" ? confirmReschedule : confirmBooking}
                  className="flex-[2] py-3 bg-clinical-blue text-white rounded-xl text-sm font-bold shadow-lg shadow-clinical-blue/20 hover:bg-green-700 transition-all cursor-pointer"
                >
                  {bookingMode === "reschedule" ? "Confirmar Cambio" : "Confirmar Espacio"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal isOpen={isManageBookingModalOpen} onClose={() => setIsManageBookingModalOpen(false)}>
        {selectedManagedBooking && (
          <div className="relative">
            <button
              onClick={() => setIsManageBookingModalOpen(false)}
              className="absolute right-0 top-0 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <MaterialIcon name="close" />
            </button>
            <div className="mb-6 mt-2">
              <h3 className="text-xl font-black text-clinical-blue flex items-center gap-2">
                <MaterialIcon name="event_available" />
                Gestionar mi cita
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Día reservado</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {diasSemana[selectedManagedBooking.dayIndex].label} {diasSemana[selectedManagedBooking.dayIndex].num}
                </p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Hora</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedManagedBooking.time}
                </p>
              </div>
            </div>
            <div className="p-3 mb-6 rounded-xl bg-clinical-blue/10 border border-clinical-blue/20 text-clinical-blue">
              <p className="text-[10px] font-bold uppercase">Consultorio</p>
              <p className="text-sm font-black">{selectedManagedBooking.consultorio}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={cancelManagedBooking}
                className="flex-1 py-3 bg-danger-red text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all cursor-pointer"
              >
                Cancelar cita
              </button>
              <button
                onClick={startReschedule}
                className="flex-1 py-3 bg-clinical-blue text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all cursor-pointer"
              >
                Reagendar
              </button>
            </div>
          </div>
        )}
      </Modal>
     <Modal isOpen={isModalConfirm} onClose={handleCloseModal}>
             <div className="text-center">
               <div className="size-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <MaterialIcon name="check_circle" className="text-4xl" />
               </div>
               <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                 ¡Acción completada!
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
    </div>
  );
}
