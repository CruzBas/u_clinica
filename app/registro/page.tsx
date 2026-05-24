"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MaterialIcon from "../componentes/MaterialIcon";

export default function Registro() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("¡Cuenta registrada con éxito!");
    router.push("/");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="p-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <MaterialIcon name="school" className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Clínica Universitaria</h2>
          </div>
          <h1 className="text-3xl font-bold mb-2">Crear Cuenta</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Regístrate para gestionar tus prácticas profesionales
          </p>
        </div>

        <div className="px-8 mb-4">
          <div className="w-full h-32 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
            <MaterialIcon name="person_add" className="text-5xl text-primary opacity-50" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="full_name">
              Nombre completo
            </label>
            <div className="relative">
              <MaterialIcon
                name="person"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
              />
              <input
                id="full_name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none text-slate-900 dark:text-slate-100"
                placeholder="Ej. Juan Pérez"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="email">
              Correo electrónico institucional
            </label>
            <div className="relative">
              <MaterialIcon
                name="mail"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none text-slate-900 dark:text-slate-100"
                placeholder="usuario@institucion.edu"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <MaterialIcon
                name="lock"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none text-slate-900 dark:text-slate-100"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="confirm_password">
              Confirmar contraseña
            </label>
            <div className="relative">
              <MaterialIcon
                name="lock_reset"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
              />
              <input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none text-slate-900 dark:text-slate-100"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Registrarse</span>
              <MaterialIcon name="arrow_forward" />
            </button>
          </div>
        </form>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            ¿Ya tienes una cuenta?
            <Link href="/" className="text-primary font-semibold hover:underline ml-1">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
