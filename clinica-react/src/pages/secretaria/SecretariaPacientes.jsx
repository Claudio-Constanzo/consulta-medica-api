import { useState, useEffect } from "react";
import { ArrowLeft, Edit, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

const SecretariaPacientes = () => {
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 CARGA REAL DESDE DJANGO
  const cargarPacientes = async () => {
    try {
      const res = await fetch(`${API}/pacientes/`);
      const data = await res.json();
      setPacientes(data);
    } catch (error) {
      console.error("Error cargando pacientes:", error);
      alert("No se pudo cargar la lista de pacientes.");
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  // 🔎 FILTRO ORIGINAL POR NOMBRE + APELLIDO
  const filtered = pacientes.filter((p) =>
    `${p.nombre} ${p.apellido}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">

      {/* BOTÓN VOLVER */}
      <button
        onClick={() => navigate("/secretaria/panel")}
        className="flex items-center text-stone-600 hover:text-stone-900 gap-2 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <h1 className="text-3xl font-semibold text-stone-900 mb-6">
        Pacientes
      </h1>

      {/* BUSCADOR — diseño original */}
      <div className="flex items-center border border-amber-200 rounded-xl bg-white px-4 py-2 mb-6 max-w-xl">
        <Search size={18} className="text-stone-600" />
        <input
          placeholder="Buscar paciente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full ml-3 bg-transparent focus:outline-none"
        />
      </div>

      {/* LISTA DE PACIENTES — diseño original */}
      <div className="space-y-4">
        {filtered.map((p) => (
          <div
            key={p.rut}
            className="bg-white p-4 rounded-xl shadow border border-amber-100 flex justify-between"
          >
            <div>
              <p className="font-semibold text-stone-900">
                {p.nombre} {p.apellido}
              </p>
              <p className="text-stone-600 text-sm">{p.email}</p>
            </div>

            <button
              onClick={() => navigate(`/secretaria/editar/${p.rut}`)}
              className="flex items-center gap-2 text-stone-700 hover:text-stone-900"
            >
              <Edit size={18} /> Editar
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-stone-500 text-center">No hay pacientes encontrados.</p>
        )}
      </div>
    </div>
  );
};

export default SecretariaPacientes;
