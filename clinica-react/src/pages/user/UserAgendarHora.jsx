import { useState, useEffect } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const UserAgendarHora = () => {
  const navigate = useNavigate();

  const pacienteNombre = localStorage.getItem("userName") || "Paciente";
  const pacienteApellido = localStorage.getItem("userApellido") || "";

  const [fecha, setFecha] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

  // HORARIO 30 MIN
  const generar = (inicio, fin, fechaStr) => {
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
        ...generar(new Date(`${fechaStr}T10:30`), new Date(`${fechaStr}T13:00`)),
        ...generar(new Date(`${fechaStr}T15:00`), new Date(`${fechaStr}T19:00`)),
      ];
    }

    if (dia === 5) {
      return [...generar(new Date(`${fechaStr}T10:30`), new Date(`${fechaStr}T13:00`))];
    }
  };

  const mockOcupadas = ["10:30", "15:30"];

  useEffect(() => {
    if (!fecha) return;
    const all = generarHoras(fecha);
    setHorasDisponibles(all.filter((h) => !mockOcupadas.includes(h)));
  }, [fecha]);

  const reservar = () => {
    alert(`Cita agendada (mock):
${pacienteNombre} ${pacienteApellido}
${fecha} — ${horaSeleccionada}`);
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

      <h1 className="text-3xl font-semibold flex items-center gap-2 text-stone-900 mb-6">
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
              {horasDisponibles.map((h) => (
                <button
                  key={h}
                  className={`px-4 py-2 rounded-lg border ${
                    horaSeleccionada === h
                      ? "bg-amber-600 text-white"
                      : "bg-white text-stone-800 border-amber-200 hover:bg-amber-100"
                  }`}
                  onClick={() => setHoraSeleccionada(h)}
                >
                  {h}
                </button>
              ))}
            </div>
          </>
        )}

        <Button variant="primary" className="w-full" onClick={reservar}>
          Reservar Hora
        </Button>
      </div>
    </div>
  );
};

export default UserAgendarHora;
