"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MaterialIcon from "./components/MaterialIcon";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.toLowerCase().trim();

    if (cleanEmail === "profesor@clinica.com") {
      router.push("/profesor");
    } else if (cleanEmail === "admin@clinica.com") {
      router.push("/clinica");
    } else if (cleanEmail === "practicante@clinica.com") {
      router.push("/estudiante");
    } else {
      alert(
        "Usuario no reconocido. Use profesor@clinica.com, admin@clinica.com o practicante@clinica.com",
      );
    }
  };
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden">
        <div className="relative h-48 w-full bg-primary/10 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDbN1rdrvwOi46EpSKwm6AQhNaoLgw4Y5KurjNSe4VsmTfZZwvG__3EO1MUQb_E3AFN6DRCgFh1PsZf1ZTVOcOm1LB1o8x74enzGAjkjeVczlCzpp5gXdMQjKk1BaysjfCs7XFnaoZYQJ91TeBSWaMQuVdXq57lGe4jDatUZSxM_9oJD0rKwDWMvHfx1cAT1yEbPYREdilNv5Joj1BoVdgPbiwrfd8fwuUxKcJazacUw-5amMf_XNIRUeOvy3ew3yBy6uTeWrGSyE')",
            }}
          />
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-primary p-3 rounded-xl mb-3 shadow-lg">
              <MaterialIcon name="school" className="text-white text-4xl" />
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 font-bold text-xl tracking-tight">
              Portal de Practicantes
            </h2>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">
              Iniciar Sesión
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              Bienvenido al sistema administrativo de pasantías
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                Correo electrónico
              </label>
              <div className="relative">
                <MaterialIcon
                  name="mail"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="usuario@institucion.com"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                  Contraseña
                </label>
                <a
                  className="text-primary text-xs font-semibold hover:underline"
                  href="#"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <MaterialIcon
                  name="lock"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              Entrar
              <MaterialIcon name="login" className="text-xl" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              ¿Aún no tienes una cuenta?
              <Link
                href="/registro"
                className="text-primary font-bold hover:underline ml-1"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-4 flex justify-between items-center">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
            Versión 0.0.0
          </span>
        </div>
      </div>
    </div>
  );
}
