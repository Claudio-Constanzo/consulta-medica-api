import { Calendar, FileText, Users, User, LogOut, ClipboardPlus } from "lucide-react";

const Sidebar = ({ role }) => {

  const menuDoctor = [
    { label: "Agenda", icon: <Calendar size={18} />, href: "/doctor/agenda" },
    { label: "Fichas Médicas", icon: <FileText size={18} />, href: "/doctor/fichas" },
    { label: "Pacientes", icon: <Users size={18} />, href: "/doctor/pacientes" },
  ];

  const menuSecretaria = [
    { label: "Agenda General", icon: <Calendar size={18} />, href: "/secretaria/agenda" },
    { label: "Registrar Paciente", icon: <ClipboardPlus size={18} />, href: "/secretaria/registrar" },
    { label: "Ver Pacientes", icon: <Users size={18} />, href: "/secretaria/pacientes" },
  ];

  const menuUsuario = [
    { label: "Mis Citas", icon: <Calendar size={18} />, href: "/user/citas" },
    { label: "Agendar Cita", icon: <ClipboardPlus size={18} />, href: "/user/agendar" },
    { label: "Mi Ficha Médica", icon: <FileText size={18} />, href: "/user/ficha" },
  ];

  const menus = {
    doctor: menuDoctor,
    secretaria: menuSecretaria,
    usuario: menuUsuario,
  };

  const currentMenu = menus[role] || [];

  return (
    <aside className="w-72 bg-white border-r border-stone-200 shadow-sm p-6 flex flex-col gap-8">
      
      {/* Perfil */}
      <div className="flex flex-col items-center text-center">
        <img
          src="/doctor.jpg"
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <h2 className="mt-3 text-lg font-semibold text-stone-900">
          {role === "doctor" && "Dr. Claudio Constanzo"}
          {role === "secretaria" && "Secretaria"}
          {role === "usuario" && "Paciente"}
        </h2>
        <p className="text-sm text-stone-600">
          {role === "doctor" && "9 años de experiencia"}
          {role === "usuario" && "Bienvenido(a)"}
        </p>
      </div>

      {/* Lista de enlaces */}
      <nav className="flex flex-col gap-2">
        {currentMenu.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-100 transition font-medium text-stone-700"
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>

      {/* Cerrar Sesión */}
      <div className="mt-auto">
        <a
          href="/logout"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-100 transition text-stone-600 font-medium"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </a>
      </div>

    </aside>
  );
};

export default Sidebar;
