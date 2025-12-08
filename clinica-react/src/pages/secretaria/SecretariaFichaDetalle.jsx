import { useEffect, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const SecretariaFichaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ficha, setFicha] = useState(null);

  const mockFichas = {
    1: {
      paciente: "John Smith",
      rut_paciente: "11.111.111-1",
      telefono: "+56 9 2345 6789",
      direccion: "Avenida Central 123",
      titulo: "Diagnóstico de Faringitis",
      notas: "El paciente presenta dolor al tragar.",
      fecha: "2025-01-12",
    },
    2: {
      paciente: "Ana Torres",
      rut_paciente: "22.222.222-2",
      telefono: "+56 9 9876 5432",
      direccion: "Calle Norte 55",
      titulo: "Alergia Estacional",
      notas: "Se recomienda antihistamínicos.",
      fecha: "2025-01-10",
    },
  };

  useEffect(() => {
    setFicha(mockFichas[id]);
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
          <p><strong>Paciente:</strong> {ficha.paciente}</p>
          <p><strong>RUT:</strong> {ficha.rut_paciente}</p>
          <p><strong>Teléfono:</strong> {ficha.telefono}</p>
          <p><strong>Dirección:</strong> {ficha.direccion}</p>
          <p><strong>Título:</strong> {ficha.titulo}</p>
          <p><strong>Notas:</strong> {ficha.notas}</p>
          <p><strong>Fecha:</strong> {ficha.fecha}</p>
        </div>
      </div>
    </div>
  );
};

export default SecretariaFichaDetalle;
