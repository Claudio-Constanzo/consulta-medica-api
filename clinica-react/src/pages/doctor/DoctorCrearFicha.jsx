import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const DoctorCrearFicha = () => {
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [paciente, setPaciente] = useState(null);

  const mockPacientes = {
    "11.111.111-1": {
      nombre: "John",
      apellido: "Smith",
      telefono: "+56 9 2345 6789",
      direccion: "Av. Central 123",
    },
    "22.222.222-2": {
      nombre: "Ana",
      apellido: "Torres",
      telefono: "+56 9 8765 4321",
      direccion: "Calle Norte 55",
    },
  };

  const buscarPaciente = () => {
    // ❌ fetch desactivado
    // const res = await fetch(...)

    if (mockPacientes[rut]) {
      setPaciente(mockPacientes[rut]);
    } else {
      alert("Paciente no encontrado");
    }
  };

  const guardarFicha = () => {
    alert("Ficha guardada (modo simulación)");
    navigate("/doctor/fichas");
  };

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">
      <button
        onClick={() => navigate("/doctor/fichas")}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <div className="bg-white rounded-3xl shadow p-8 border border-amber-100 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-stone-900 mb-6">
          Crear Ficha Médica
        </h1>

        {/* Buscar por RUT */}
        <label className="font-semibold text-stone-800">RUT Paciente:</label>
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 px-4 py-2 border rounded-lg"
            placeholder="11.111.111-1"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
          <Button onClick={buscarPaciente}>
            <Search size={16} className="inline mr-1" />
            Buscar
          </Button>
        </div>

        {paciente && (
          <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-100 mb-4">
            <p className="font-semibold">
              {paciente.nombre} {paciente.apellido}
            </p>
            <p>{paciente.telefono}</p>
            <p>{paciente.direccion}</p>
          </div>
        )}

        {/* Datos de ficha */}
        <label className="font-semibold">Título:</label>
        <input
          className="w-full px-4 py-2 border rounded-lg mb-4"
          placeholder="Diagnóstico..."
        />

        <label className="font-semibold">Notas:</label>
        <textarea className="w-full px-4 py-2 border rounded-lg mb-4" />

        <Button variant="primary" className="w-full" onClick={guardarFicha}>
          Guardar Ficha
        </Button>
      </div>
    </div>
  );
};

export default DoctorCrearFicha;
