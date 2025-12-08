import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorPacientes = () => {
  const navigate = useNavigate();

  // Datos simulados
  const pacientesSimulados = [
    { id: 1, nombre: "Valeria Lopez", rut: "12.345.678-9", telefono: "+56 9 1234 5678", email: "valeria@mail.com" },
    { id: 2, nombre: "Juliana Soto", rut: "16.987.654-3", telefono: "+56 9 9876 5432", email: "juliana@mail.com" },
    { id: 3, nombre: "Camilo Torres", rut: "20.555.333-1", telefono: "+56 9 5555 3333", email: "camilo@mail.com" },
  ];

  const [busqueda, setBusqueda] = useState("");

  const pacientesFiltrados = pacientesSimulados.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50 p-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-8">

        {/* 🔙 Botón Volver igual que DoctorAgenda */}
        <button
          onClick={() => navigate("/doctor/panel")}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
        >
          <ArrowLeft size={20} /> Volver
        </button>

        {/* Título */}
        <h1 className="text-3xl font-bold text-stone-900">
          Pacientes Registrados
        </h1>

        {/* Contenedor */}
        <section className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">

          {/* Buscador */}
          <input
            type="text"
            placeholder="Buscar paciente por nombre..."
            className="w-full px-4 py-2 border border-stone-300 rounded-xl mb-4"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {/* Tabla */}
          <div className="overflow-hidden rounded-2xl border border-stone-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">Nombre</th>
                  <th className="px-4 py-3 font-semibold">RUT</th>
                  <th className="px-4 py-3 font-semibold">Teléfono</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                </tr>
              </thead>

              <tbody>
                {pacientesFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-6 text-center text-stone-500">
                      No se encontraron pacientes.
                    </td>
                  </tr>
                )}

                {pacientesFiltrados.map((paciente) => (
                  <tr key={paciente.id} className="border-t">
                    <td className="px-4 py-3">{paciente.nombre}</td>
                    <td className="px-4 py-3">{paciente.rut}</td>
                    <td className="px-4 py-3">{paciente.telefono}</td>
                    <td className="px-4 py-3">{paciente.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>
      </div>
    </div>
  );
};

export default DoctorPacientes;
