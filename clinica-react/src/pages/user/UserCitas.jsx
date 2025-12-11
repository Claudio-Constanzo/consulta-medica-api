import { useState, useEffect } from "react";
import { ArrowLeft, XCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

const UserCitas = () => {
  const navigate = useNavigate();

  const usuarioId = localStorage.getItem("idUsuario");
  const [citas, setCitas] = useState([]);

  const cargarCitas = async () => {
    if (!usuarioId) return;

    try {
      const res = await fetch(`${API}/horas/usuario/${usuarioId}/`);

      if (!res.ok) {
        console.error("Error cargando citas");
        return;
      }

      const data = await res.json();
      setCitas(data);
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudieron cargar las citas.");
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const cancelarCita = async (id) => {
    if (!confirm("¿Deseas cancelar esta cita?")) return;

    try {
      const res = await fetch(`${API}/horas/cancelar/${id}/`, {
        method: "PUT",
      });

      if (res.ok) {
        alert("Cita cancelada");
        cargarCitas();
      }
    } catch {
      alert("Error al cancelar cita");
    }
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
              className="bg-white p-4 rounded-xl border shadow flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  {c.fecha} — {c.hora_inicio}
                </p>
                <p className="text-stone-600 capitalize">{c.estado}</p>
              </div>

              {c.estado !== "cancelada" && (
                <button
                  className="flex items-center gap-2 text-red-600"
                  onClick={() => cancelarCita(c.id)}
                >
                  <XCircle size={20} /> Cancelar
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserCitas;
