import { useState, useEffect } from "react";
import { ArrowLeft, FileText, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

const SecretariaFichas = () => {
  const navigate = useNavigate();

  const [fichas, setFichas] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 Cargar fichas REALES desde Django
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`${API}/fichas/`);
        const data = await res.json();
        setFichas(data);
      } catch (error) {
        console.error(error);
        alert("Error al cargar las fichas médicas.");
      }
    };

    cargar();
  }, []);

  // 🔎 Buscador por título + nombre paciente
  const filtered = fichas.filter((f) =>
    `${f.titulo} ${f.nombre_paciente} ${f.apellido_paciente}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">
      
      {/* VOLVER */}
      <button
        onClick={() => navigate("/secretaria/panel")}
        className="flex items-center text-stone-600 hover:text-stone-900 gap-2 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      {/* TÍTULO */}
      <h1 className="text-3xl font-semibold text-stone-900 mb-6 flex items-center gap-2">
        <FileText className="text-amber-700" /> Fichas Médicas
      </h1>

      {/* BUSCADOR */}
      <div className="flex items-center border border-amber-200 rounded-xl bg-white px-4 py-2 mb-6 max-w-lg">
        <Search size={18} className="text-stone-600" />
        <input
          placeholder="Buscar paciente o ficha..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full ml-3"
        />
      </div>

      {/* LISTA DE FICHAS */}
      <div className="space-y-4">
        {filtered.map((f) => (
          <div
            key={f.id_ficha}
            className="p-4 bg-white rounded-xl border border-amber-100 shadow flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-stone-900">{f.titulo}</h3>

              <p className="text-stone-700">
                {f.nombre_paciente} {f.apellido_paciente}
              </p>

              <p className="text-stone-500">
                {new Date(f.hora_ficha).toLocaleDateString("es-CL")}
              </p>
            </div>

            <button
              onClick={() => navigate(`/secretaria/fichas/${f.id_ficha}`)}
              className="text-amber-700 hover:text-amber-900 font-semibold"
            >
              Ver Detalles
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-stone-500 text-center">
            No hay fichas que coincidan con la búsqueda.
          </p>
        )}
      </div>
    </div>
  );
};

export default SecretariaFichas;
