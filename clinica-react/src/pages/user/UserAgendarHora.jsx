import { useState, useEffect } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const API = "http://127.0.0.1:8000";

const UserAgendarHora = () => {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("idUsuario");

  const [fecha, setFecha] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

  // Generador de bloques
  const generar = (inicio, fin) => {
    const arr = [];
    let h = new Date(inicio);
    while (h < fin) {
      arr.push(h.toTimeString().slice(0, 5));
      h = new Date(h.getTime() + 30 * 60000);
    }
    return arr;
  };

  const generarHoras = (fechaStr) => {
    const d = new Date(`${fechaStr}T00:00`);
    const dia = d.getDay();

    if (dia === 0 || dia === 6) return [];

    if (dia >= 1 && dia <= 4) {
      return [
        ...generar(`${fechaStr}T10:30`, `${fechaStr}T13:00`),
        ...generar(`${fechaStr}T15:00`, `${fechaStr}T19:00`),
      ];
    }

    if (dia === 5) {
      return generar(`${fechaStr}T10:30`, `${fechaStr}T13:00`);
    }
  };

  useEffect(() => {
    if (!fecha) return;
    const all = generarHoras(fecha);

    const cargarOcupadas = async () => {
      const res = await fetch(`${API}/horas-ocupadas/?fecha=${fecha}`);
      const ocupadas = await res.json();

      setHorasDisponibles(all.filter(h => !ocupadas.includes(h)));
    };

    cargarOcupadas();
  }, [fecha]);

  const reservar = async () => {
    if (!fecha || !horaSeleccionada) {
      alert("Seleccione fecha y hora");
      return;
    }

    const res = await fetch(`${API}/horas/agendar/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario_id: usuarioId,
        fecha,
        hora_inicio: horaSeleccionada,
        hora_final: horaSeleccionada,
      }),
    });

    if (!res.ok) {
      alert("Error al agendar hora");
      return;
    }

    alert("Hora agendada correctamente");
    navigate("/user/citas");
  };

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">

      <button
        onClick={() => navigate("/user/dashboard")}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <h1 className="text-3xl font-semibold flex items-center gap-2 mb-6">
        <Clock className="text-amber-700" /> Agendar Hora Médica
      </h1>

      <div className="bg-white p-8 rounded-3xl border max-w-xl mx-auto">

        <label className="font-semibold mb-1 block">Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-6"
        />

        {fecha && (
          <>
            <h2 className="font-semibold mb-3">Horas Disponibles</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {horasDisponibles.map(h => (
                <button
                  key={h}
                  onClick={() => setHoraSeleccionada(h)}
                  className={
                    horaSeleccionada === h
                      ? "px-4 py-2 rounded-lg bg-amber-600 text-white"
                      : "px-4 py-2 rounded-lg border border-amber-200 hover:bg-amber-100"
                  }
                >
                  {h}
                </button>
              ))}
            </div>
          </>
        )}

        <Button variant="primary" className="w-full" onClick={reservar}>
          Agendar Hora
        </Button>
      </div>
    </div>
  );
};

export default UserAgendarHora;
