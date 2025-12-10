import { useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

const SecretariaAgendaDoctor = () => {
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [agenda, setAgenda] = useState([]);

  const buscarAgenda = async () => {
    if (!fecha) return;

    const res = await fetch(`${API}/horas/agenda-doctor/?fecha=${fecha}`);
    const data = await res.json();
    setAgenda(data);
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

      <div className="bg-white p-6 rounded-3xl border border-amber-100 max-w-xl mb-6 space-y-4">
        <label className="font-semibold">Fecha:</label>

        <input
          type="date"
          className="w-full px-4 py-2 border rounded-lg"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <button
          onClick={buscarAgenda}
          className="w-full bg-stone-900 text-white py-3 rounded-lg font-semibold hover:bg-stone-800"
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
              <p>Hora: {c.hora_inicio}</p>
              <p className="text-stone-600 text-sm">Estado: {c.estado}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SecretariaAgendaDoctor;
