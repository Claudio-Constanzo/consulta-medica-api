import { useState, useEffect } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const SecretariaAgendarHora = () => {
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [paciente, setPaciente] = useState(null);

  const [fecha, setFecha] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

  const mockPacientes = {
    "11.111.111-1": {
      nombre: "John",
      apellido: "Smith",
      telefono: "+56 9 2345 6789",
      direccion: "Avenida Central 123",
    },
    "22.222.222-2": {
      nombre: "Ana",
      apellido: "Torres",
      telefono: "+56 9 9876 5432",
      direccion: "Calle Norte 55",
    },
  };

  const buscarPaciente = () => {
    setPaciente(mockPacientes[rut] || null);
    if (!mockPacientes[rut]) alert("Paciente no encontrado (mock)");
  };

  // GENERADOR DE HORAS (misma lógica que real)
  const generarBloques30 = (inicio, fin, fechaStr) => {
    const bloques = [];
    let hora = new Date(inicio);

    while (hora < fin) {
      bloques.push(hora.toTimeString().slice(0, 5));
      hora = new Date(hora.getTime() + 30 * 60000);
    }
    return bloques;
  };

  const generarHoras = (fechaStr) => {
    const d = new Date(`${fechaStr}T00:00`);
    const dia = d.getDay();

    if (dia === 0 || dia === 6) return []; // sin atención

    if (dia >= 1 && dia <= 4) {
      return [
        ...generarBloques30(new Date(`${fechaStr}T10:30`), new Date(`${fechaStr}T13:00`)),
        ...generarBloques30(new Date(`${fechaStr}T15:00`), new Date(`${fechaStr}T19:00`)),
      ];
    }

    if (dia === 5) {
      return [...generarBloques30(new Date(`${fechaStr}T10:30`), new Date(`${fechaStr}T13:00`))];
    }
  };

  // MOCK de horas ocupadas
  const mockOcupadas = ["10:30", "15:30"];

  useEffect(() => {
    if (!fecha) return;
    const all = generarHoras(fecha);
    setHorasDisponibles(all.filter((h) => !mockOcupadas.includes(h)));
  }, [fecha]);

  const guardarCita = () => {
    alert(
      `Cita guardada (mock):
Paciente: ${paciente?.nombre} ${paciente?.apellido}
Fecha: ${fecha}
Hora: ${horaSeleccionada}`
    );
    navigate("/secretaria/panel");
  };

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">
      <button
        onClick={() => navigate("/secretaria/panel")}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <div className="bg-white p-8 rounded-3xl border border-amber-100 max-w-3xl mx-auto">

        <h1 className="text-3xl font-semibold text-stone-900 mb-6">
          Agendar Hora Médica
        </h1>

        <label>Buscar paciente por RUT:</label>
        <div className="flex gap-2 mb-6">
          <input
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <Button variant="secondary" onClick={buscarPaciente}>
            <Search size={16} className="inline mr-1" />
            Buscar
          </Button>
        </div>

        {paciente && (
          <div className="bg-amber-50/40 p-4 rounded-xl mb-6 border border-amber-100">
            <p className="font-semibold">
              {paciente.nombre} {paciente.apellido}
            </p>
            <p>{paciente.telefono}</p>
            <p>{paciente.direccion}</p>
          </div>
        )}

        <label>Fecha:</label>
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

        <Button variant="primary" className="w-full" onClick={guardarCita}>
          Guardar Cita
        </Button>
      </div>
    </div>
  );
};

export default SecretariaAgendarHora;
