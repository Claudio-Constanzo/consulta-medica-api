import { useEffect, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://127.0.0.1:8000";

const SecretariaFichaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ficha, setFicha] = useState(null);

  // 🔥 Cargar ficha real
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`${API}/fichas/${id}/`);
        const data = await res.json();
        setFicha(data);
      } catch (error) {
        alert("No se pudo cargar la ficha médica");
      }
    };

    cargar();
  }, [id]);

  if (!ficha) return <p className="p-6">Cargando ficha...</p>;

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">

      <button
        onClick={() => navigate("/secretaria/fichas")}
        className="flex items-center text-stone-600 hover:text-stone-900 gap-2 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <div className="bg-white p-8 rounded-3xl border border-amber-100 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold flex items-center gap-2 mb-6">
          <FileText className="text-amber-700" /> Ficha Médica
        </h1>

        <div className="space-y-3">
          <p><strong>Paciente:</strong> {ficha.nombre_paciente} {ficha.apellido_paciente}</p>
          <p><strong>RUT:</strong> {ficha.rut_paciente}</p>
          <p><strong>Teléfono:</strong> {ficha.telefono_paciente}</p>
          <p><strong>Dirección:</strong> {ficha.direccion_paciente}</p>
          <p><strong>Previsión:</strong> {ficha.prevision_paciente}</p>

          <p><strong>Título:</strong> {ficha.titulo}</p>
          <p><strong>Notas:</strong> {ficha.notas}</p>

          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(ficha.hora_ficha).toLocaleString("es-CL")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecretariaFichaDetalle;
