import { useState, useEffect } from "react";
import { ArrowLeft, FileText, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SecretariaFichas = () => {
  const navigate = useNavigate();

  const [fichas, setFichas] = useState([]);
  const [search, setSearch] = useState("");

  const mockFichas = [
    {
      id: 1,
      paciente: "John Smith",
      titulo: "Diagnóstico de Faringitis",
      fecha: "2025-01-12",
    },
    {
      id: 2,
      paciente: "Ana Torres",
      titulo: "Alergia Estacional",
      fecha: "2025-01-10",
    },
  ];

  useEffect(() => {
    // ❌ desact fetch
    // const res = await fetch ...

    setFichas(mockFichas);
  }, []);

  const filtered = fichas.filter((f) =>
    `${f.paciente} ${f.titulo}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">

      <button
        onClick={() => navigate("/secretaria/panel")}
        className="flex items-center text-stone-600 hover:text-stone-900 gap-2 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <h1 className="text-3xl font-semibold text-stone-900 mb-6 flex items-center gap-2">
        <FileText className="text-amber-700" /> Fichas Médicas
      </h1>

      {/* BUSCADOR */}
      <div className="flex items-center border border-amber-200 rounded-xl bg-white px-4 py-2 mb-6 max-w-lg">
        <Search size={18} className="text-stone-600" />
        <input
          placeholder="Buscar paciente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full ml-3"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((f) => (
          <div
            key={f.id}
            className="p-4 bg-white rounded-xl border border-amber-100 shadow flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-stone-900">{f.titulo}</h3>
              <p className="text-stone-700">{f.paciente}</p>
              <p className="text-stone-500">{f.fecha}</p>
            </div>

            <button
              onClick={() => navigate(`/secretaria/fichas/${f.id}`)}
              className="text-amber-700 hover:text-amber-900 font-semibold"
            >
              Ver Detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretariaFichas;
