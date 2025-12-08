import DashboardCard from "../../components/common/DashboardCard";
import { Calendar, FileText, Clock } from "lucide-react";

const UserDashboard = () => {
  const nombre = localStorage.getItem("userName") || "Paciente";
  const apellido = localStorage.getItem("userApellido") || "";

  return (
    <main className="min-h-screen bg-amber-50/40 px-6 py-8">
      <h1 className="text-3xl font-semibold text-stone-900">
        Hola {nombre} {apellido}
      </h1>
      <p className="text-stone-500 mb-10">Bienvenido a tu portal de paciente.</p>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
