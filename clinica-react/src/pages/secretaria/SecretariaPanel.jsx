import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  FileText,
  UserPlus,
  LogOut,
} from "lucide-react";
import DashboardCard from "../../components/common/DashboardCard";

const SecretariaPanel = () => {
  const navigate = useNavigate();

  const nombre = localStorage.getItem("userName") || "";
  const apellido = localStorage.getItem("userApellido") || "";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-amber-50/40 px-6 py-8">

      {/* Cerrar sesión */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-200 rounded-lg transition"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>

      {/* Bienvenida */}
      <h1 className="text-3xl font-semibold text-stone-900">
        Bienvenida, {nombre} {apellido}
      </h1>
      <p className="text-stone-500 mb-10">Panel de Secretaria Clínica</p>

      {/* Tarjetas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <DashboardCard
          Icon={Calendar}
          title="Agendar Hora"
          subtitle="Crear citas médicas"
          buttonText="Agendar"
          to="/secretaria/agendar"
        />

        <DashboardCard
          Icon={Users}
          title="Pacientes"
          subtitle="Ver y editar pacientes"
          buttonText="Ver Pacientes"
          to="/secretaria/pacientes"
        />

        <DashboardCard
          Icon={UserPlus}
          title="Registrar Paciente"
          subtitle="Agregar un nuevo paciente"
          buttonText="Registrar"
          to="/secretaria/registrar"
        />

        <DashboardCard
          Icon={FileText}
          title="Fichas Médicas"
          subtitle="Ver fichas"
          buttonText="Ver Fichas"
          to="/secretaria/fichas"
        />

        <DashboardCard
          Icon={Calendar}
          title="Agenda del Doctor"
          subtitle="Revisar citas del médico"
          buttonText="Ver Agenda"
          to="/secretaria/agenda-doctor"
        />

      </section>
    </main>
  );
};

export default SecretariaPanel;
