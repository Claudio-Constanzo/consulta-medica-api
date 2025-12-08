import { useState, useEffect } from "react";
import { ArrowLeft, XCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserCitas = () => {
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);

  const mockCitas = [
    {
      id: 1,
      fecha: "2025-01-20",
      hora: "10:30",
      motivo: "Control general",
    },
    {
      id: 2,
      fecha: "2025-01-22",
      hora: "11:00",
      motivo: "Dolor de garganta",
    },
  ];

  useEffect(() => {
    // ❌ Backend desactivado
    // const res = await fetch("...")

    // ✔ Mock
    setCitas(mockCitas);
  }, []);

  const cancelarCita = (id) => {
    const confirmado = confirm("¿Deseas cancelar esta cita?");
    if (!confirmado) return;

    setCitas((prev) => prev.filter((c) => c.id !== id));
    alert("Cita cancelada (modo simulación).");
  };

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">

      <button
        onClick={() => navigate("/user/dashboard")}
        className="flex items-center gap-2 mb-6 text-stone-600 hover:text-stone-900"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <h1 className="text-3xl font-semibold flex items-center gap-2 text-stone-900 mb-6">
        <Calendar className="text-amber-700" /> Mis Citas
      </h1>

      <div className="space-y-4">
        {citas.length === 0 ? (
          <p className="text-stone-600">No tienes citas agendadas.</p>
        ) : (
          citas.map((c) => (
            <div
              key={c.id}
              className="bg-white p-4 rounded-xl border border-amber-100 shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-stone-900">
                  {c.fecha} — {c.hora}
                </p>
                <p className="text-stone-700">{c.motivo}</p>
              </div>

              <button
                className="flex items-center gap-2 text-red-600 hover:text-red-800"
                onClick={() => cancelarCita(c.id)}
              >
                <XCircle size={20} /> Cancelar
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default UserCitas;
