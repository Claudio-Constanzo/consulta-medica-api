import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const API_BASE = "http://127.0.0.1:8000";

const DoctorCrearFicha = () => {
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [paciente, setPaciente] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [notas, setNotas] = useState("");

  // Fecha y hora actuales (solo para mostrar)
  const fechaActual = new Date().toLocaleDateString("es-CL");
  const horaActual = new Date().toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const buscarPaciente = async () => {
    if (!rut.trim()) {
      alert("Ingresa un RUT para buscar.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/pacientes/${encodeURIComponent(rut)}/`);
      if (res.status === 404) {
        setPaciente(null);
        alert("Paciente no encontrado.");
        return;
      }
      if (!res.ok) throw new Error("Error HTTP");

      const data = await res.json();
      setPaciente(data);
    } catch (e) {
      console.error("Error buscando paciente:", e);
      alert("No se pudo buscar el paciente.");
    }
  };

  const guardarFicha = async () => {
    if (!paciente) {
      alert("Debe buscar y seleccionar un paciente válido.");
      return;
    }
    if (!titulo.trim()) {
      alert("Debe ingresar un título para la ficha médica.");
      return;
    }

    const payload = {
      rut: paciente.rut,
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      telefono: paciente.telefono,
      direccion: paciente.direccion,
      prevision: paciente.prevision,
      titulo,
      notas,
    };

    try {
      const res = await fetch(`${API_BASE}/fichas/crear/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error respuesta backend:", data);
        alert("No se pudo guardar la ficha médica.");
        return;
      }

      alert(
        `Ficha guardada correctamente para ${paciente.nombre} ${paciente.apellido}.`
      );
      navigate("/doctor/fichas");
    } catch (e) {
      console.error("Error guardando ficha:", e);
      alert("Error de red al guardar la ficha.");
    }
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

        {/* BUSCAR POR RUT */}
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

        {/* DATOS DEL PACIENTE */}
        {paciente && (
          <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-100 mb-6 text-sm">
            <p>
              <strong>Nombre:</strong> {paciente.nombre} {paciente.apellido}
            </p>
            <p>
              <strong>Teléfono:</strong> {paciente.telefono}
            </p>
            <p>
              <strong>Dirección:</strong> {paciente.direccion}
            </p>
            <p>
              <strong>Previsión:</strong> {paciente.prevision}
            </p>
            <p>
              <strong>Email:</strong> {paciente.email}
            </p>
          </div>
        )}

        {/* FECHA Y HORA DE CREACIÓN (solo visual) */}
        <div className="bg-stone-100/60 p-4 rounded-xl border text-sm mb-6">
          <p>
            <strong>Fecha creación (visual):</strong> {fechaActual}
          </p>
          <p>
            <strong>Hora creación (visual):</strong> {horaActual}
          </p>
          <p className="text-xs text-stone-500 mt-1">
            *En la base de datos se guarda la fecha/hora exacta en el servidor.
          </p>
        </div>

        {/* CAMPOS DE LA FICHA */}
        <label className="font-semibold">Título:</label>
        <input
          className="w-full px-4 py-2 border rounded-lg mb-4"
          placeholder="Ej: Diagnóstico de Gripe"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label className="font-semibold">Notas:</label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg mb-6"
          placeholder="Escriba las observaciones médicas."
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />

        <Button variant="primary" className="w-full" onClick={guardarFicha}>
          Guardar Ficha
        </Button>
      </div>
    </div>
  );
};

export default DoctorCrearFicha;
