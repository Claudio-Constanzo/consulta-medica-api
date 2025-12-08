import { useEffect, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserFichaMedica = () => {
  const navigate = useNavigate();

  const [fichas, setFichas] = useState([]);

  const mockFicha = [
    {
      titulo: "Diagnóstico de Faringitis",
      notas: "Paciente con dolor de garganta, leve inflamación.",
      fecha: "2025-01-12",
    },
    {
      titulo: "Alergia Estacional",
      notas: "Se recomienda antihistamínico por 5 días.",
      fecha: "2025-01-10",
    },
  ];

  useEffect(() => {
    // ❌ fetch desactivado
    // const res = await fetch("...")

    // ✔ mock realista
    setFichas(mockFicha);
  }, []);

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">

      <button
        onClick={() => navigate("/user/dashboard")}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <div className="bg-white p-8 rounded-3xl border border-amber-100 max-w-3xl mx-auto">
        
        <h1 className="text-3xl font-semibold flex items-center gap-2 mb-6 text-stone-900">
          <FileText className="text-amber-700" /> Mi Ficha Médica
        </h1>

        {fichas.length === 0 ? (
          <p className="text-stone-600">No tienes fichas registradas.</p>
        ) : (
          fichas.map((f, i) => (
            <div
              key={i}
              className="p-4 mb-4 rounded-xl bg-amber-50/40 border border-amber-100"
            >
              <p><strong>Título:</strong> {f.titulo}</p>
              <p><strong>Notas:</strong> {f.notas}</p>
              <p><strong>Fecha:</strong> {f.fecha}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default UserFichaMedica;
