import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  FileText,
  Users,
  LogOut,
} from "lucide-react";
import DashboardCard from "../../components/common/DashboardCard";

const DoctorPanel = () => {
  const navigate = useNavigate();

  const nombre = localStorage.getItem("userName") || "";
  const apellido = localStorage.getItem("userApellido") || "";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-amber-50/40 px-6 py-8">

      {/* Logout arriba derecha */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-200 transition"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>

      {/* Bienvenida */}
      <h1 className="text-3xl font-semibold text-stone-900">
        Buenos días, Dr. {nombre} {apellido}
      </h1>
      <p className="text-stone-500 mb-10">
        Panel de Gestión Médica
      </p>

      {/* Tarjetas del panel (igual que PowerFit pero versión clínica) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <DashboardCard
          Icon={Calendar}
          title="Agenda"
          subtitle="Revisar tus citas del día"
          buttonText="Ver Agenda"
          to="/doctor/agenda"
        />

        <DashboardCard
          Icon={FileText}
          title="Fichas Médicas"
          subtitle="Gestionar y revisar fichas"
          buttonText="Ver Fichas"
          to="/doctor/fichas"
        />

        <DashboardCard
          Icon={Users}
          title="Pacientes"
          subtitle="Información y búsqueda de pacientes"
          buttonText="Ver Pacientes"
          to="/doctor/pacientes"
        />

      </section>
    </main>
  );
};

export default DoctorPanel;
