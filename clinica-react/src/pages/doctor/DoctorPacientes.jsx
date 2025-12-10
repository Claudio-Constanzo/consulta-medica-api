import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

const DoctorPacientes = () => {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(false);

  const fetchPacientes = async () => {
    setCargando(true);
    try {
      const res = await fetch(`${API_BASE}/pacientes/`);
      if (!res.ok) throw new Error("Error HTTP");
      const data = await res.json();
      setPacientes(data || []);
    } catch (e) {
      console.error("Error cargando pacientes:", e);
      alert("No se pudieron cargar los pacientes desde el servidor.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const pacientesFiltrados = pacientes.filter((p) =>
    `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50 p-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-8">
        {/* Volver */}
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
            placeholder="Buscar paciente por nombre."
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
                {cargando && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-6 text-center text-stone-500"
                    >
                      Cargando pacientes...
                    </td>
                  </tr>
                )}

                {!cargando && pacientesFiltrados.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-6 text-center text-stone-500"
                    >
                      No se encontraron pacientes.
                    </td>
                  </tr>
                )}

                {!cargando &&
                  pacientesFiltrados.map((paciente, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-3">
                        {paciente.nombre} {paciente.apellido}
                      </td>
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
