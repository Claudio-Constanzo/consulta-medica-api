import { useEffect, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

const UserFichaMedica = () => {
  const navigate = useNavigate();

  const rut = localStorage.getItem("userRut");
  const [fichas, setFichas] = useState([]);

  // 🔥 Cargar fichas reales
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`${API}/fichas/paciente/${rut}/`);
        const data = await res.json();
        setFichas(data);
      } catch (error) {
        alert("No se pudieron cargar las fichas médicas");
      }
    };

    cargar();
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
          fichas.map((f) => (
            <div
              key={f.id_ficha}
              className="p-4 mb-4 rounded-xl bg-amber-50/40 border border-amber-100"
            >
              <p><strong>Título:</strong> {f.titulo}</p>
              <p><strong>Notas:</strong> {f.notas}</p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(f.hora_ficha).toLocaleDateString("es-CL")}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default UserFichaMedica;
