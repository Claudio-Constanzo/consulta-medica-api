import { useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SecretariaAgendaDoctor = () => {
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [agenda, setAgenda] = useState([]);

  const mockAgenda = {
    "2025-01-15": [
      { paciente: "John Smith", hora: "10:30", motivo: "Control general" },
      { paciente: "Ana Torres", hora: "11:00", motivo: "Consulta" },
    ],
    "2025-01-16": [
      { paciente: "Carlos Pérez", hora: "15:00", motivo: "Dolor nasal" },
    ],
  };

  const buscarAgenda = () => {
    setAgenda(mockAgenda[fecha] || []);
  };

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">
      <button
        onClick={() => navigate("/secretaria/panel")}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <h1 className="text-3xl font-semibold flex items-center gap-2 mb-6">
        <Calendar className="text-amber-700" /> Agenda del Doctor
      </h1>

      <div className="bg-white p-6 rounded-3xl border border-amber-100 max-w-xl mb-6">
        <label className="font-semibold">Fecha:</label>
        <input
          type="date"
          className="w-full px-4 py-2 border rounded-lg mb-4"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <button
          onClick={buscarAgenda}
          className="w-full bg-stone-900 text-white py-3 rounded-lg font-semibold"
        >
          Consultar Agenda
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-amber-100 max-w-3xl mx-auto">
        {agenda.length === 0 ? (
          <p className="text-stone-600">No hay citas en esta fecha.</p>
        ) : (
          agenda.map((c, i) => (
            <div
              key={i}
              className="p-4 bg-amber-50/40 border border-amber-100 rounded-xl mb-4"
            >
              <p className="font-semibold text-stone-900">{c.paciente}</p>
              <p>Hora: {c.hora}</p>
              <p className="text-stone-600 text-sm">Motivo: {c.motivo}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SecretariaAgendaDoctor;
