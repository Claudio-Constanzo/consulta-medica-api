import { useEffect, useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

const getTodayYmdChile = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santiago",
  }).format(new Date());

const DoctorAgenda = () => {
  const navigate = useNavigate();
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fecha] = useState(getTodayYmdChile());

  const fetchAgenda = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/horas/agenda-doctor/?fecha=${fecha}`);
      if (!res.ok) throw new Error("Error HTTP");
      const data = await res.json();

      const ocupadas = (data || []).map((h, idx) => ({
        id: idx + 1,
        hora_inicio: String(h.hora_inicio).slice(0, 5), 

        paciente: h.paciente_nombre && h.paciente_apellido
          ? `${h.paciente_nombre} ${h.paciente_apellido}`
          : "Sin asignar",
      }));

      setAgenda(ocupadas);
    } catch (e) {
      console.error("Error cargando agenda:", e);
      alert("No se pudo cargar la agenda de hoy.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgenda();
  }, [fecha]);

  const fechaLegible = new Intl.DateTimeFormat("es-CL", {
    timeZone: "America/Santiago",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${fecha}T12:00:00`));

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">
      <button
        onClick={() => navigate("/doctor/panel")}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <h1 className="text-3xl font-semibold text-stone-900 mb-2 flex items-center gap-2">
        <Calendar className="text-amber-700" /> Agenda de Hoy
      </h1>
      <p className="text-stone-500 mb-6">Fecha: {fechaLegible}</p>

      <div className="bg-white rounded-2xl shadow p-6 border border-amber-100">
        {loading ? (
          <p className="text-stone-500">Cargando agenda...</p>
        ) : agenda.length === 0 ? (
          <p className="text-stone-500">
            No hay citas programadas para hoy.
          </p>
        ) : (
          <div className="space-y-4">
            {agenda.map((cita, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-amber-50/40 border border-amber-100"
              >
                <p className="font-semibold text-stone-900 text-lg">
                  {cita.hora_inicio} hrs
                </p>
                <p className="text-stone-600 text-sm">
                  Paciente: {cita.paciente}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAgenda;
