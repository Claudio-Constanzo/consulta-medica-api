import { useEffect, useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

const getTodayYmdChile = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santiago",
  }).format(new Date());

const calcularHoraFinal = (horaInicio) => {
  const [h, m] = horaInicio.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m + 30);
  return d.toTimeString().slice(0, 5);
};

const UserAgendarHora = () => {
  const navigate = useNavigate();

  const usuarioId = localStorage.getItem("idUsuario");

  const [fecha, setFecha] = useState(getTodayYmdChile());
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar horas disponibles según fecha
  useEffect(() => {
    if (!fecha) return;

    const fetchHoras = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/horas-ocupadas/?fecha=${fecha}`);
        if (!res.ok) throw new Error("Error HTTP");

        const data = await res.json();
        const ocupadas = data.ocupadas || [];

        // Horas base 
        const all = [];
        for (let h = 8; h < 18; h++) {
          all.push(`${String(h).padStart(2, "0")}:00`);
          all.push(`${String(h).padStart(2, "0")}:30`);
        }

        // Filtrar ocupadas 
        const disponibles = all.filter(
          (h) => !ocupadas.includes(`${h}:00`)
        );

        setHorasDisponibles(disponibles);
        setHoraSeleccionada("");
      } catch (e) {
        console.error("Error cargando horas:", e);
        setHorasDisponibles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHoras();
  }, [fecha]);

  // Reservar hora
  const reservar = async () => {
    if (!fecha || !horaSeleccionada) {
      alert("Debe seleccionar fecha y hora.");
      return;
    }

    try {
      const res = await fetch(`${API}/crear_hora_usuario/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fecha,
          hora_inicio: horaSeleccionada,
          hora_final: calcularHoraFinal(horaSeleccionada),
          usuario_id: usuarioId, 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Error al agendar hora.");
        return;
      }

      alert("Hora agendada correctamente.");
      navigate("/user/citas");
    } catch (e) {
      console.error(e);
      alert("No se pudo conectar al servidor.");
    }
  };

  const fechaLegible = new Intl.DateTimeFormat("es-CL", {
    timeZone: "America/Santiago",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${fecha}T12:00:00`));

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">
      <button
        onClick={() => navigate("/user/panel")}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <h1 className="text-3xl font-semibold text-stone-900 mb-2 flex items-center gap-2">
        <Calendar className="text-amber-700" /> Agendar Hora Médica
      </h1>
      <p className="text-stone-500 mb-6">Fecha seleccionada: {fechaLegible}</p>

      {/* Fecha */}
      <label className="font-medium mb-2 block">Seleccione fecha</label>
      <input
        type="date"
        min={getTodayYmdChile()} // ❌ no días pasados
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-6"
      />

      {/* Horas */}
      <div className="bg-white rounded-2xl shadow p-6 border border-amber-100">
        {loading ? (
          <p className="text-stone-500">Cargando horas disponibles...</p>
        ) : horasDisponibles.length === 0 ? (
          <p className="text-stone-500">
            No hay horas disponibles para esta fecha.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {horasDisponibles.map((hora) => (
              <button
                key={hora}
                onClick={() => setHoraSeleccionada(hora)}
                className={`py-2 rounded-lg border transition ${
                  horaSeleccionada === hora
                    ? "bg-amber-600 text-white border-amber-600"
                    : "bg-white text-stone-700 border-stone-300 hover:bg-amber-50"
                }`}
              >
                {hora}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Confirmar */}
      <button
        onClick={reservar}
        disabled={!horaSeleccionada}
        className="mt-6 w-full py-3 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 disabled:opacity-60"
      >
        Confirmar Hora
      </button>
    </div>
  );
};

export default UserAgendarHora;
