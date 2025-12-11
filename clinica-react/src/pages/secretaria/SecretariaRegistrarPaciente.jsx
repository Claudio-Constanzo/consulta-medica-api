import { useState } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

const SecretariaRegistrarPaciente = () => {
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [pacienteExiste, setPacienteExiste] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    prevision: "",
  });

  const [error, setError] = useState("");

  // 🔍 Buscar por RUT
  const handleRutChange = async (value) => {
    // Normalizar manteniendo DV + guion
    const limpio = value.replace(/[^\dkK-]/g, "").toUpperCase();
    setRut(limpio);

    setError("");
    setUsuario(null);
    setPacienteExiste(false);

    // Validar formato completo: 12345678-9 o 1234567-K
    const rutRegex = /^\d{7,8}-[\dkK]$/;
    if (!rutRegex.test(limpio)) {
      return; // No consultar backend hasta que el RUT esté correcto
    }

    // 1) Buscar paciente (silenciar error 404)
    let resPaciente;
    try {
      resPaciente = await fetch(`${API}/pacientes/${limpio}/`);
    } catch (_) {
      resPaciente = null;
    }

    if (resPaciente && resPaciente.ok) {
      setPacienteExiste(true);
      setError("Este paciente ya está registrado.");
      return;
    }

    // 2) Buscar usuario asociado al RUT (silenciar 404)
    let resUsuario;
    try {
      resUsuario = await fetch(`${API}/usuario/${limpio}/`);
    } catch (_) {
      resUsuario = null;
    }

    if (resUsuario && resUsuario.ok) {
      const data = await resUsuario.json();
      setUsuario(data);

      setForm({
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: "",
        direccion: "",
        prevision: "",
      });

      return;
    }

    // Usuario NO existe → limpiar campos
    setUsuario(null);
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      direccion: "",
      prevision: "",
    });
  };

  const handleChange = (e) => {
    if (usuario && ["nombre", "apellido", "email"].includes(e.target.name)) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🟢 Guardar paciente
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (pacienteExiste) {
      setError("Este paciente ya está registrado.");
      return;
    }

    try {
      const res = await fetch(`${API}/pacientes/crear/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rut,
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          telefono: form.telefono,
          direccion: form.direccion,
          prevision: form.prevision,
          usuarioId: usuario ? usuario.idUsuario : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Error al registrar paciente.");
        return;
      }

      alert("Paciente registrado correctamente.");
      navigate("/secretaria/panel");
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar al servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <button
          onClick={() => navigate("/secretaria/panel")}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-2"
        >
          <ArrowLeft size={20} /> Volver
        </button>

        <h1 className="text-3xl font-bold text-stone-900">Registrar Paciente</h1>

        {/* RUT */}
        <div className="bg-white p-6 rounded-3xl shadow border space-y-4">
          <label className="font-medium text-stone-800">RUT del Paciente:</label>

          <input
            className={`w-full px-4 py-2 border rounded-xl ${
              pacienteExiste ? "border-red-400" : "border-stone-300"
            }`}
            placeholder="11.111.111-1"
            value={rut}
            onChange={(e) => handleRutChange(e.target.value)}
          />

          {pacienteExiste && (
            <p className="flex items-center gap-2 text-red-700">
              <AlertCircle size={18} /> Este paciente ya está registrado.
            </p>
          )}
        </div>

        {/* Error general */}
        {error && (
          <div className="text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-sm flex gap-2">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 space-y-6"
        >
          <Input
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            disabled={!!usuario}
          />
          <Input
            label="Apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            disabled={!!usuario}
          />
          <Input
            label="Correo"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={!!usuario}
          />

          <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
          <Input label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} />
          <Input label="Previsión" name="prevision" value={form.prevision} onChange={handleChange} />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 transition"
            disabled={pacienteExiste}
          >
            Guardar Paciente
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, disabled, ...props }) => (
  <div className="flex flex-col">
    <label className="font-medium text-stone-800 mb-1">{label}</label>
    <input
      {...props}
      disabled={disabled}
      className={`px-4 py-2 border rounded-xl ${
        disabled ? "bg-stone-100 cursor-not-allowed" : "bg-white"
      }`}
    />
  </div>
);

export default SecretariaRegistrarPaciente;
