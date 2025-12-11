import { useEffect, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

const UserFichaMedica = () => {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("idUsuario");

  const [fichas, setFichas] = useState([]);

  const cargarFichas = async () => {
    if (!usuarioId) return;

    try {
      const res = await fetch(`${API}/fichas/usuario/${usuarioId}/`);

      if (!res.ok) return;

      const data = await res.json();
      setFichas(data);
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar las fichas médicas.");
    }
  };

  useEffect(() => {
    cargarFichas();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">
      <button
        onClick={() => navigate("/user/dashboard")}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <h1 className="text-3xl font-semibold flex items-center gap-2 mb-6">
        <FileText className="text-amber-700" /> Mis Fichas Médicas
      </h1>

      <div className="space-y-4">
        {fichas.length === 0 ? (
          <p className="text-stone-600">No tienes fichas registradas.</p>
        ) : (
          fichas.map((f) => (
            <div
              key={f.id_ficha}
              className="bg-white p-4 rounded-xl border shadow"
            >
              <h3 className="font-semibold text-lg">{f.titulo}</h3>
              <p className="text-stone-700">{f.notas}</p>
              <p className="text-stone-500 text-sm mt-1">
                Fecha: {f.hora_ficha?.slice(0, 10)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserFichaMedica;
