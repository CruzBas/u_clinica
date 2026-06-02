"use client";

import React, { useState } from "react";
import MaterialIcon from "../components/MaterialIcon";
import CheckboxChip from "../components/CheckboxChip";

export default function Formulario() {
  const [show, setShow] = useState(false);
  const inputStyle =
    "w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all";
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Formulario de Admisión Clínica
          </h1>
          <p className="text-2xl font-semibold text-teal-600 mb-2">
            Este es el primer paso hacia su bienestar. Por favor, complete la
            información de manera honesta para brindarle el mejor acompañamiento
            posible.
          </p>
        </div>
        <form className="space-y-12" id="admissionForm">
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
                    className={inputStyle}
                  />
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Indique su nombre si está realizando la solicitud para un
                    familiar o tercero.
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Nombre completo
                </label>
                <input
                  className={inputStyle}
                  id="fullName"
                  name="fullName"
                  placeholder="Ej. Ana García Pérez"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Número de cédula
                </label>
                <input
                  className={inputStyle}
                  id="idNumber"
                  name="idNumber"
                  placeholder="0-0000-0000"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Edad
                </label>
                <input
                  className={inputStyle}
                  id="age"
                  name="age"
                  placeholder="Años"
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Género
                </label>
                <select className={inputStyle} id="gender" name="gender">
                  <option value="">Seleccione una opción</option>
                  <option value="femenino">Femenino</option>
                  <option value="masculino">Masculino</option>
                  <option value="no-binario">No binario</option>
                  <option value="otro">Otro / Prefiero no decir</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Provincia de residencia
                </label>
                <input
                  className={inputStyle}
                  id="province"
                  name="province"
                  placeholder="Ej. San José"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Teléfono de contacto
                </label>
                <input
                  className={inputStyle}
                  id="phone"
                  name="phone"
                  placeholder="+506 0000-0000"
                  type="tel"
                />
              </div>
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
                value="dificultades-alimentos"
                label="Dificultades asociadas al consumo de alimentos"
              />
              <CheckboxChip
                id="mantener-atencion"
                value="mantener-atencion"
                label="Dificultades para mantener la atención"
              />
              <CheckboxChip
                id="valoracion-mayor"
                value="valoracion-mayor"
                label="Valoración psicológica mayor de edad"
              />
              <CheckboxChip
                id="valoracion-menor"
                value="valoracion-menor"
                label="Valoración psicológica menor de edad"
              />
              <CheckboxChip
                id="relacion-familia"
                value="relacion-familia"
                label="Problemas familiares"
              />
              <CheckboxChip
                id="control-esfinteres"
                value="control-esfinteres"
                label="Control de esfínteres"
              />
              <CheckboxChip
                id="problemas-laborales"
                value="problemas-laborales"
                label="Problemas laborales)"
              />
              <CheckboxChip
                id="abuso-sexual"
                value="abuso-sexual"
                label="Abuso Sexual/Violación"
              />
              <CheckboxChip
                id="cambios-estado-animo"
                value="cambios-estado-animo"
                label="Cambios en el estado del ánimo"
              />
              <CheckboxChip
                id="dificultades-socializar"
                value="dificultades-socializar"
                label="Dificultades para socializar"
              />
              <CheckboxChip
                id="manejo-ira"
                value="manejo-ira"
                label="Dificultades para manejar la ira"
              />
              <CheckboxChip
                id="autoestima"
                value="autoestima"
                label="Problemas de autoestima"
              />
              <CheckboxChip
                id="conducta"
                value="conducta"
                label="Problemas de conducta"
              />
              <CheckboxChip
                id="violencia-intrafamiliar"
                value="violencia-intrafamiliar"
                label="Violencia Intrafamiliar"
              />
              <CheckboxChip
                id="sueno"
                value="sueno"
                label="Problemas del sueño"
              />
              <CheckboxChip
                id="problemas-escolares"
                value="problemas-escolares"
                label="Problemas escolares/universidad"
              />
              <CheckboxChip
                id="problemas-familiares"
                value="problemas-familiares"
                label="Problemas familiares"
              />
              <CheckboxChip
                id="disfunciones-sexuales"
                value="disfunciones-sexuales"
                label="Disfunciones sexuales"
              />
              <CheckboxChip id="ansiedad" value="ansiedad" label="Ansiedad" />
              <CheckboxChip
                id="adicciones"
                value="adicciones"
                label="Adicciones"
              />
              <CheckboxChip
                id="autolesiones"
                value="autolesiones"
                label="Autolesiones"
              />
              <CheckboxChip
                id="duelo-luto"
                value="duelo-luto"
                label="Duelo/Luto"
              />
              <CheckboxChip
                id="depresion"
                value="depresion"
                label="Depresión"
              />

              <CheckboxChip
                id="gestion-emocional"
                value="gestion-emocional"
                label="Gestión Emocional"
              />
              <CheckboxChip
                id="evento-traumatico"
                value="evento-traumatico"
                label="Evento Traumático"
              />
              <CheckboxChip
                id="relacion-pareja"
                value="relacion-pareja"
                label="Problemas de pareja"
              />
              <CheckboxChip
                id="ideacion-suicida"
                value="ideacion-suicida"
                label="Ideación Suicida"
              />
              <CheckboxChip id="otro" value="otro" label="Otro" />
            </div>
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
                Relato de la situación
              </label>
              <textarea
                className={inputStyle}
                id="description"
                name="description"
                placeholder="Describa cómo se siente, cuánto tiempo lleva así y cómo esto ha afectado sus áreas de vida (personal, familiar, social)..."
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
    </div>
  );
}
