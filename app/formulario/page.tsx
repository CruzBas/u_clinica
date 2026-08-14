"use client";

import React, { FormEvent, useState } from "react";
import MaterialIcon from "../components/MaterialIcon";
import CheckboxChip from "../components/CheckboxChip";
import Modal from "../components/Modal";

const MAX_COMPANIONS = 3;

export default function Formulario() {
  const [show, setShow] = useState(false);
  const [hasCompanion, setHasCompanion] = useState(false);
  const [companionCount, setCompanionCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [formResetKey, setFormResetKey] = useState(0);
  const inputStyle =
    "w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all";
  const helperStyle = "text-xs text-slate-600 dark:text-slate-400";
  const requiredText = "text-danger-red";

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const selectedReasons = form.querySelectorAll<HTMLInputElement>(
      'input[name="motivos"]:checked',
    );

    if (selectedReasons.length === 0) {
      setFormError("Seleccione al menos un motivo de consulta.");
      return;
    }

    if (selectedReasons.length > 3) {
      setFormError("Seleccione máximo 3 motivos de consulta.");
      return;
    }

    if (!form.reportValidity()) {
      setFormError("Revise los campos marcados antes de enviar.");
      return;
    }

    setFormError("");
    form.reset();
    setFormResetKey((currentKey) => currentKey + 1);
    setShow(false);
    setHasCompanion(false);
    setCompanionCount(1);
    setIsModalOpen(true);
  };

  const handleMotivoChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const target = event.target;

    if (
      target instanceof HTMLInputElement &&
      target.name === "motivos" &&
      target.checked
    ) {
      const selectedReasons = event.currentTarget.querySelectorAll(
        'input[name="motivos"]:checked',
      );

      if (selectedReasons.length > 3) {
        target.checked = false;
        setFormError("Seleccione máximo 3 motivos de consulta.");
        return;
      }
    }

    setFormError("");
  };

  const handleCompanionAnswer = (answer: boolean) => {
    setHasCompanion(answer);
    setCompanionCount(1);
  };

  const addCompanion = () => {
    setCompanionCount((currentCount) =>
      Math.min(currentCount + 1, MAX_COMPANIONS),
    );
  };

  const removeCompanion = () => {
    setCompanionCount((currentCount) => {
      const nextCount = Math.max(currentCount - 1, 1);

      if (nextCount === 1) {
        return nextCount;
      }

      return nextCount;
    });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Formulario de Admisión Clínica
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium text-teal-700 dark:text-teal-300 max-w-4xl mx-auto leading-relaxed">
            Este es el primer paso hacia su bienestar. Por favor, complete la
            información de manera honesta para brindarle el mejor acompañamiento
            posible.
          </p>
        </div>
        <form
          key={formResetKey}
          className="space-y-12"
          id="admissionForm"
          onChange={handleMotivoChange}
          onSubmit={handleSubmit}
          noValidate={false}
        >
          <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                Datos Personales y de Contacto
              </h2>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Información básica para identificar su expediente y contactarle.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2 flex flex-col gap-4 mb-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  La cita es para:
                </label>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="target_patient"
                      value="myself"
                      defaultChecked
                      onChange={() => setShow(false)}
                      className="w-5 h-5 text-teal-600 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white"
                    />
                    <span className="text-base text-slate-900 dark:text-slate-100">
                      Para mí
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="target_patient"
                      value="other"
                      onChange={() => setShow(true)}
                      className="w-5 h-5 text-teal-600 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white"
                    />
                    <span className="text-base text-slate-900 dark:text-slate-100">
                      Para otra persona
                    </span>
                  </label>
                </div>
              </div>
              {show && (
                <div
                  id="applicant_name_container"
                  className="col-span-1 md:col-span-2 flex flex-col gap-2 transition-all duration-300"
                >
                  <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Nombre completo del solicitante
                  </label>
                  <input
                    type="text"
                    id="applicantName"
                    name="applicantName"
                    placeholder="Ej. Juan Pérez"
                    minLength={3}
                    maxLength={80}
                    required={show}
                    className={inputStyle}
                  />
                  <p className={helperStyle}>
                    Indique su nombre si está realizando la solicitud para un
                    familiar o tercero.
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Nombre completo <span className={requiredText}>*</span>
                </label>
                <input
                  className={inputStyle}
                  id="fullName"
                  name="fullName"
                  placeholder="Ej. Ana García Pérez"
                  type="text"
                  minLength={3}
                  maxLength={80}
                  pattern="^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$"
                  title="Ingrese nombre y apellido, usando solo letras y espacios."
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Número de cédula <span className={requiredText}>*</span>
                </label>
                <input
                  className={inputStyle}
                  id="idNumber"
                  name="idNumber"
                  placeholder="0-0000-0000"
                  type="text"
                  inputMode="numeric"
                  pattern="^[0-9]{1,2}-?[0-9]{3,4}-?[0-9]{3,4}$"
                  title="Ingrese una cédula válida, por ejemplo 1-1234-5678."
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Edad <span className={requiredText}>*</span>
                </label>
                <input
                  className={inputStyle}
                  id="age"
                  name="age"
                  placeholder="Años"
                  type="number"
                  min={1}
                  max={120}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Género <span className={requiredText}>*</span>
                </label>
                <select className={inputStyle} id="gender" name="gender" required>
                  <option value="">Seleccione una opción</option>
                  <option value="femenino">Femenino</option>
                  <option value="masculino">Masculino</option>
                  <option value="no-binario">No binario</option>
                  <option value="otro">Otro / Prefiero no decir</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Provincia de residencia <span className={requiredText}>*</span>
                </label>
                <select className={inputStyle} id="province" name="province" required>
                  <option value="">Seleccione una provincia</option>
                  <option value="san-jose">San José</option>
                  <option value="alajuela">Alajuela</option>
                  <option value="cartago">Cartago</option>
                  <option value="heredia">Heredia</option>
                  <option value="guanacaste">Guanacaste</option>
                  <option value="puntarenas">Puntarenas</option>
                  <option value="limon">Limón</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Teléfono de contacto <span className={requiredText}>*</span>
                </label>
                <input
                  className={inputStyle}
                  id="phone"
                  name="phone"
                  placeholder="+506 0000-0000"
                  type="tel"
                  inputMode="tel"
                  pattern="^(?:\+506\s?)?[2678][0-9]{3}-?\s?[0-9]{4}$"
                  title="Ingrese un teléfono costarricense válido, por ejemplo +506 8888-8888."
                  required
                />
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  ¿Asistirá con acompañante?
                </label>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="has_companion"
                      value="no"
                      defaultChecked
                      onChange={() => handleCompanionAnswer(false)}
                      className="w-5 h-5 text-teal-600 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white"
                    />
                    <span className="text-base text-slate-900 dark:text-slate-100">
                      No
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="has_companion"
                      value="si"
                      onChange={() => handleCompanionAnswer(true)}
                      className="w-5 h-5 text-teal-600 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white"
                    />
                    <span className="text-base text-slate-900 dark:text-slate-100">
                      Sí
                    </span>
                  </label>
                </div>
              </div>
              {hasCompanion && (
                <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                  {Array.from({ length: companionCount }, (_, index) => {
                    const companionNumber = index + 1;

                    return (
                      <div
                        key={companionNumber}
                        className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4"
                      >
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Acompañante {companionNumber}
                          </h3>
                          {companionCount > 1 && companionNumber === companionCount && (
                            <button
                              type="button"
                              onClick={removeCompanion}
                              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-danger-red hover:bg-danger-red/10 transition-all"
                            >
                              <MaterialIcon name="remove" className="text-lg" />
                              Quitar
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              Nombre completo <span className={requiredText}>*</span>
                            </label>
                            <input
                              className={inputStyle}
                              id={`companionName${companionNumber}`}
                              name={`companion_${companionNumber}_name`}
                              placeholder="Ej. María Pérez"
                              type="text"
                              minLength={3}
                              maxLength={80}
                              pattern="^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$"
                              title="Ingrese nombre y apellido, usando solo letras y espacios."
                              required={hasCompanion}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              Cédula <span className={requiredText}>*</span>
                            </label>
                            <input
                              className={inputStyle}
                              id={`companionId${companionNumber}`}
                              name={`companion_${companionNumber}_id`}
                              placeholder="0-0000-0000"
                              type="text"
                              inputMode="numeric"
                              pattern="^[0-9]{1,2}-?[0-9]{3,4}-?[0-9]{3,4}$"
                              title="Ingrese una cédula válida, por ejemplo 1-1234-5678."
                              required={hasCompanion}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              Parentesco o relación <span className={requiredText}>*</span>
                            </label>
                            <input
                              className={inputStyle}
                              id={`companionRelation${companionNumber}`}
                              name={`companion_${companionNumber}_relation`}
                              placeholder="Ej. Madre"
                              type="text"
                              minLength={3}
                              maxLength={40}
                              pattern="^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$"
                              title="Ingrese solo letras y espacios."
                              required={hasCompanion}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {companionCount < MAX_COMPANIONS && (
                    <button
                      type="button"
                      onClick={addCompanion}
                      className="inline-flex w-fit items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-all"
                    >
                      <MaterialIcon name="add" className="text-lg" />
                      Agregar acompañante
                    </button>
                  )}
                  <p className={helperStyle}>
                    Puede registrar hasta {MAX_COMPANIONS} acompañantes.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                Motivo de Consulta
              </h2>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Seleccione hasta 3 opciones que mejor describan su necesidad
                actual.
              </p>
            </div>
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              id="motivoGrid"
            >
              <CheckboxChip
                id="dificultades-alimentos"
                name="motivos"
                value="dificultades-alimentos"
                label="Dificultades asociadas al consumo de alimentos"
              />
              <CheckboxChip
                id="mantener-atencion"
                name="motivos"
                value="mantener-atencion"
                label="Dificultades para mantener la atención"
              />
              <CheckboxChip
                id="valoracion-mayor"
                name="motivos"
                value="valoracion-mayor"
                label="Valoración psicológica mayor de edad"
              />
              <CheckboxChip
                id="valoracion-menor"
                name="motivos"
                value="valoracion-menor"
                label="Valoración psicológica menor de edad"
              />
              <CheckboxChip
                id="relacion-familia"
                name="motivos"
                value="relacion-familia"
                label="Problemas familiares"
              />
              <CheckboxChip
                id="control-esfinteres"
                name="motivos"
                value="control-esfinteres"
                label="Control de esfínteres"
              />
              <CheckboxChip
                id="problemas-laborales"
                name="motivos"
                value="problemas-laborales"
                label="Problemas laborales"
              />
              <CheckboxChip
                id="abuso-sexual"
                name="motivos"
                value="abuso-sexual"
                label="Abuso Sexual/Violación"
              />
              <CheckboxChip
                id="cambios-estado-animo"
                name="motivos"
                value="cambios-estado-animo"
                label="Cambios en el estado del ánimo"
              />
              <CheckboxChip
                id="dificultades-socializar"
                name="motivos"
                value="dificultades-socializar"
                label="Dificultades para socializar"
              />
              <CheckboxChip
                id="manejo-ira"
                name="motivos"
                value="manejo-ira"
                label="Dificultades para manejar la ira"
              />
              <CheckboxChip
                id="autoestima"
                name="motivos"
                value="autoestima"
                label="Problemas de autoestima"
              />
              <CheckboxChip
                id="conducta"
                name="motivos"
                value="conducta"
                label="Problemas de conducta"
              />
              <CheckboxChip
                id="violencia-intrafamiliar"
                name="motivos"
                value="violencia-intrafamiliar"
                label="Violencia Intrafamiliar"
              />
              <CheckboxChip
                id="sueno"
                name="motivos"
                value="sueno"
                label="Problemas del sueño"
              />
              <CheckboxChip
                id="problemas-escolares"
                name="motivos"
                value="problemas-escolares"
                label="Problemas escolares/universidad"
              />
              <CheckboxChip
                id="problemas-familiares"
                name="motivos"
                value="problemas-familiares"
                label="Problemas familiares"
              />
              <CheckboxChip
                id="disfunciones-sexuales"
                name="motivos"
                value="disfunciones-sexuales"
                label="Disfunciones sexuales"
              />
              <CheckboxChip id="ansiedad" name="motivos" value="ansiedad" label="Ansiedad" />
              <CheckboxChip
                id="adicciones"
                name="motivos"
                value="adicciones"
                label="Adicciones"
              />
              <CheckboxChip
                id="autolesiones"
                name="motivos"
                value="autolesiones"
                label="Autolesiones"
              />
              <CheckboxChip
                id="duelo-luto"
                name="motivos"
                value="duelo-luto"
                label="Duelo/Luto"
              />
              <CheckboxChip
                id="depresion"
                name="motivos"
                value="depresion"
                label="Depresión"
              />

              <CheckboxChip
                id="gestion-emocional"
                name="motivos"
                value="gestion-emocional"
                label="Gestión Emocional"
              />
              <CheckboxChip
                id="evento-traumatico"
                name="motivos"
                value="evento-traumatico"
                label="Evento Traumático"
              />
              <CheckboxChip
                id="relacion-pareja"
                name="motivos"
                value="relacion-pareja"
                label="Problemas de pareja"
              />
              <CheckboxChip
                id="ideacion-suicida"
                name="motivos"
                value="ideacion-suicida"
                label="Ideación Suicida"
              />
              <CheckboxChip id="otro" name="motivos" value="otro" label="Otro" />
            </div>
            {formError && (
              <p className="mt-4 rounded-lg border border-danger-red/30 bg-danger-red/10 px-4 py-3 text-sm font-medium text-danger-red">
                {formError}
              </p>
            )}
          </section>

          <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                Descripción Detallada
              </h2>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Por favor, utilice este espacio para contarnos un poco más sobre
                su situación actual.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Relato de la situación <span className={requiredText}>*</span>
              </label>
              <textarea
                className={inputStyle}
                id="description"
                name="description"
                placeholder="Describa cómo se siente, cuánto tiempo lleva así y cómo esto ha afectado sus áreas de vida (personal, familiar, social)..."
                minLength={20}
                maxLength={1000}
                required
              ></textarea>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                Información Adicional y Antecedentes
              </h2>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Detalles sobre el servicio y antecedentes relevantes.
              </p>
            </div>
            <div className="space-y-12">
              <div>
                <span className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-6">
                  Tipo de servicio requerido
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <input
                      defaultChecked
                      className="peer absolute opacity-0 invisible"
                      id="indiv"
                      name="service"
                      type="radio"
                      value="individual"
                    />
                    <label
                      htmlFor="indiv"
                      className="flex flex-col items-center justify-center gap-3 h-32 rounded-xl border-2 border-slate-300 dark:border-slate-600 cursor-pointer transition-all hover:border-primary/50 text-slate-600 dark:text-slate-400 peer-checked:border-primary peer-checked:text-primary"
                    >
                      <MaterialIcon name="person" className="text-5xl" />
                      <span className="font-medium">Individual</span>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      className="peer absolute opacity-0 invisible"
                      id="fam"
                      name="service"
                      type="radio"
                      value="familiar"
                    />
                    <label
                      htmlFor="fam"
                      className="flex flex-col items-center justify-center gap-3 h-32 rounded-xl border-2 border-slate-300 dark:border-slate-600 cursor-pointer transition-all hover:border-primary/50 text-slate-600 dark:text-slate-400 peer-checked:border-primary peer-checked:text-primary"
                    >
                      <MaterialIcon name="groups" className="text-5xl" />
                      <span className="font-medium">Familiar</span>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      className="peer absolute opacity-0 invisible"
                      id="pare"
                      name="service"
                      type="radio"
                      value="pareja"
                    />
                    <label
                      htmlFor="pare"
                      className="flex flex-col items-center justify-center gap-3 h-32 rounded-xl border-2 border-slate-300 dark:border-slate-600 cursor-pointer transition-all hover:border-primary/50 text-slate-600 dark:text-slate-400 peer-checked:border-primary peer-checked:text-primary"
                    >
                      <MaterialIcon name="favorite" className="text-5xl" />
                      <span className="font-medium">Pareja</span>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      className="peer absolute opacity-0 invisible"
                      id="valor"
                      name="service"
                      type="radio"
                      value="valoracion"
                    />
                    <label
                      htmlFor="valor"
                      className="flex flex-col items-center justify-center gap-3 h-32 rounded-xl border-2 border-slate-300 dark:border-slate-600 cursor-pointer transition-all hover:border-primary/50 text-slate-600 dark:text-slate-400 peer-checked:border-primary peer-checked:text-primary"
                    >
                      <MaterialIcon name="assignment" className="text-5xl" />
                      <span className="font-medium">
                        Valoración psicológica
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-10">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg flex items-center justify-between">
                  <span className="text-base text-slate-900 dark:text-slate-100 font-medium">
                    ¿Es estudiante activo de la universidad?
                  </span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className="text-teal-600 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white h-5 w-5"
                        name="student"
                        type="radio"
                        value="si"
                        required
                      />{" "}
                      <span className="text-slate-900 dark:text-slate-100 text-sm">
                        Sí
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className="text-teal-600 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white h-5 w-5"
                        name="student"
                        type="radio"
                        value="no"
                        required
                      />{" "}
                      <span className="text-slate-900 dark:text-slate-100 text-sm">
                        No
                      </span>
                    </label>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg flex items-center justify-between">
                  <span className="text-base text-slate-900 dark:text-slate-100 font-medium">
                    ¿Posee referencias institucionales?
                  </span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className="text-teal-600 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white h-5 w-5"
                        name="ref"
                        type="radio"
                        value="si"
                        required
                      />{" "}
                      <span className="text-slate-900 dark:text-slate-100 text-sm">
                        Sí
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className="text-teal-600 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white h-5 w-5"
                        name="ref"
                        type="radio"
                        value="no"
                        required
                      />{" "}
                      <span className="text-slate-900 dark:text-slate-100 text-sm">
                        No
                      </span>
                    </label>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg flex items-center justify-between">
                  <span className="text-base text-slate-900 dark:text-slate-100 font-medium">
                    ¿Antecedentes de intento de autoeliminación?
                  </span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className="text-danger-red focus:ring-danger-red h-5 w-5"
                        name="self_harm"
                        type="radio"
                        value="si"
                        required
                      />{" "}
                      <span className="text-slate-900 dark:text-slate-100 text-sm">
                        Sí
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className="text-danger-red focus:ring-danger-red h-5 w-5"
                        name="self_harm"
                        type="radio"
                        value="no"
                        required
                      />{" "}
                      <span className="text-slate-900 dark:text-slate-100 text-sm">
                        No
                      </span>
                    </label>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg flex items-center justify-between">
                  <span className="text-base text-slate-900 dark:text-slate-100 font-medium">
                    ¿Ha recibido atención previa en esta clínica?
                  </span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className="text-teal-600 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white h-5 w-5"
                        name="prev_att"
                        type="radio"
                        value="si"
                        required
                      />{" "}
                      <span className="text-slate-900 dark:text-slate-100 text-sm">
                        Sí
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className="text-teal-600 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white h-5 w-5"
                        name="prev_att"
                        type="radio"
                        value="no"
                        required
                      />{" "}
                      <span className="text-slate-900 dark:text-slate-100 text-sm">
                        No
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10">
            <button
              className="w-full md:w-auto px-10 h-14 rounded-full border-2 border-primary dark:border-slate-300 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              type="button"
            >
              Cancelar
            </button>
            <button
              className="w-full md:w-auto px-12 h-14 rounded-full bg-primary text-white font-medium shadow-sm hover:shadow-md transition-shadow hover:bg-primary/90 transition-all transform hover:-translate-y-1 active:scale-95"
              type="submit"
            >
              Solicitar Cita
            </button>
          </div>
        </form>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 items-center gap-12 bg-slate-100 dark:bg-slate-800 p-12 rounded-3xl">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
              Confidencialidad y Seguridad
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Toda la información proporcionada en este formulario está
              protegida bajo el secreto profesional y las leyes de protección de
              datos personales. Su privacidad es nuestra máxima prioridad para
              garantizar un espacio de sanación seguro.
            </p>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              <span className="">Proceso de datos encriptado</span>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-64 md:h-80">
            <img
              alt="Professional and calming atmosphere"
              className="w-full h-full object-cover"
              data-alt="A bright, serene counseling office with soft natural light streaming through large windows. The room features minimalist decor, comfortable seating in neutral tones, and a small lush indoor plant, creating a feeling of profound psychological safety and clinical warmth. The aesthetic is clean, modern, and deeply professional with a blue and teal color palette."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtJ4xRHwoiHgv3SEsMZRc64vV5-DRoS77tYHC7QQXALN__ipdLNigW8pYYmoUA-PiGZicJ0vgpegVc_58M2IDbgYm-hha_1WrnDdPa6y31RHdWWcqJLcZxnaphjzbVLh0LiWpunfdw1WBF_zQPFzz-oSonVRCJqa6mTM0o5hXeFoDihpLE2-CfwhDihVTLGLOnJG0VMBVUF9ukviENkA4KwLikHoipNO2aKh_mtOyvs10foNnY-928WCZRb1FAZHao_hkqF6iKgyU"
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <div className="text-center">
                <div className="size-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MaterialIcon name="check_circle" className="text-4xl" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                  Registro confirmado
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                  Su solicitud fue registrada correctamente. Nuestro equipo revisará la información y le contactará por el teléfono indicado.
                </p>
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

