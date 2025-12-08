import { useEffect, useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorAgenda = () => {
  const navigate = useNavigate();
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(false);

  // MOCK SIMULADO (porque no hay backend aún)
  const mockAgenda = [
    {
      id: 1,
      paciente: "John Smith",
      hora: "10:30",
      motivo: "Dolor de garganta",
    },
    {
      id: 2,
      paciente: "Ana Torres",
      hora: "11:00",
      motivo: "Control general",
    },
    {
      id: 3,
      paciente: "Carlos Pérez",
      hora: "15:00",
      motivo: "Revisión preventiva",
    },
  ];

  const fetchAgenda = async () => {
    setLoading(true);

    // ❌ Desactivado mientras no existe backend
    // try {
    //   const res = await fetch("http://127.0.0.1:8000/doctor/agenda/");
    //   const data = await res.json();
    //   setAgenda(data);
    // } catch (error) {
    //   console.error("Error cargando agenda:", error);
    // }

    // ✔ MOCK data
    setAgenda(mockAgenda);

    setLoading(false);
  };

  useEffect(() => {
    fetchAgenda();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">
      <button
        onClick={() => navigate("/doctor/panel")}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <h1 className="text-3xl font-semibold text-stone-900 mb-6 flex items-center gap-2">
        <Calendar className="text-amber-700" /> Agenda de Hoy
      </h1>

      <div className="bg-white rounded-2xl shadow p-6 border border-amber-100">
        {loading ? (
          <p className="text-stone-500">Cargando agenda...</p>
        ) : agenda.length === 0 ? (
          <p className="text-stone-500">No hay citas programadas para hoy.</p>
        ) : (
          <div className="space-y-4">
            {agenda.map((cita) => (
              <div
                key={cita.id}
                className="p-4 rounded-xl bg-amber-50/40 border border-amber-100"
              >
                <h3 className="font-semibold text-stone-900 text-lg">
                  {cita.paciente}
                </h3>
                <p className="text-stone-700">
                  Hora: <span className="font-medium">{cita.hora}</span>
                </p>
                <p className="text-stone-600 text-sm mt-1">
                  Motivo: {cita.motivo}
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
