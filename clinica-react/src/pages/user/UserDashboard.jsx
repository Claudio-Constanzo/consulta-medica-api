import DashboardCard from "../../components/common/DashboardCard";
import { Calendar, FileText, Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const nombre = localStorage.getItem("userName") || "Paciente";
  const apellido = localStorage.getItem("userApellido") || "";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-amber-50/40 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-stone-900">
            Hola {nombre} {apellido}
          </h1>
          <p className="text-stone-500">Bienvenido a tu portal de paciente.</p>
        </div>

        {/* Botón cerrar sesión */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 transition"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <DashboardCard
          Icon={Calendar}
          title="Mis Citas"
          subtitle="Revisa y cancela tus horas médicas"
          buttonText="Ver Citas"
          to="/user/citas"
        />

        <DashboardCard
          Icon={Clock}
          title="Agendar Hora"
          subtitle="Solicita una nueva hora médica"
          buttonText="Agendar"
          to="/user/agendar"
        />

        <DashboardCard
          Icon={FileText}
          title="Mi Ficha Médica"
          subtitle="Consulta tus diagnósticos médicos"
          buttonText="Ver Ficha"
          to="/user/ficha-medica"
        />
      </section>
    </main>
  );
};

export default UserDashboard;
