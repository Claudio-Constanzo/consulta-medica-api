import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const DoctorFichas = () => {
  const navigate = useNavigate();
  const [fichas, setFichas] = useState([]);
  const [search, setSearch] = useState("");

  const mockFichas = [
    {
      id: 1,
      paciente: "John Smith",
      diagnostico: "Faringitis aguda",
      fecha: "2025-01-15",
    },
    {
      id: 2,
      paciente: "Ana Torres",
      diagnostico: "Alergia estacional",
      fecha: "2025-01-14",
    },
    {
      id: 3,
      paciente: "Carlos Pérez",
      diagnostico: "Sinusitis leve",
      fecha: "2025-01-10",
    },
  ];

  const fetchFichas = async () => {
    // ❌ Fetch desactivado temporalmente
    // try {
    //   const res = await fetch("http://127.0.0.1:8000/fichas/");
    //   const data = await res.json();
    //   setFichas(data);
    // } catch {}

    // ✔ mock realista
    setFichas(mockFichas);
  };

  useEffect(() => {
    fetchFichas();
  }, []);

  const filtered = fichas.filter((f) =>
    f.paciente.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">

      <button
        onClick={() => navigate("/doctor/panel")}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-semibold text-stone-900 flex items-center gap-2">
          <FileText className="text-amber-700" /> Fichas Médicas
        </h1>

        <Button onClick={() => navigate("/doctor/fichas/crear")}>
          + Crear Ficha
        </Button>
      </div>

      {/* Buscador */}
      <div className="flex items-center border border-amber-200 rounded-xl bg-white px-4 py-2 mb-6 max-w-xl">
        <Search size={18} className="text-stone-600" />
        <input
          type="text"
          placeholder="Buscar paciente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full ml-3 bg-transparent focus:outline-none text-stone-700"
        />
      </div>

      {/* Tabla mock */}
      <div className="bg-white rounded-2xl shadow p-6 border border-amber-100">
        {filtered.length === 0 ? (
          <p className="text-stone-500">No hay fichas.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b text-stone-600">
              <tr>
                <th className="py-2">Paciente</th>
                <th>Diagnóstico</th>
                <th>Fecha</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((f) => (
                <tr
                  key={f.id}
                  className="border-b border-amber-50 hover:bg-amber-50/40"
                >
                  <td className="py-3">{f.paciente}</td>
                  <td>{f.diagnostico}</td>
                  <td>{f.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorFichas;
