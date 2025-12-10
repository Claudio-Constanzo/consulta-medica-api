import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

const SecretariaRegistrarPaciente = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    telefono: "",
    direccion: "",
    prevision: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Conexión al backend real: POST /pacientes/crear/
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/pacientes/crear/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error al registrar paciente:\n" + JSON.stringify(data));
        return;
      }

      alert("Paciente registrado correctamente");
      navigate("/secretaria/pacientes");

    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">

        {/* 🔙 Volver */}
        <button
          onClick={() => navigate("/secretaria/panel")}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-2"
        >
          <ArrowLeft size={20} /> Volver
        </button>

        {/* Título */}
        <h1 className="text-3xl font-bold text-stone-900">
          Registrar Paciente
        </h1>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
            <Input label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} />
            <Input label="RUT" name="rut" value={form.rut} onChange={handleChange} />
            <Input label="Correo" name="email" value={form.email} onChange={handleChange} />
            <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
            <Input label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} />
            <Input label="Previsión" name="prevision" value={form.prevision} onChange={handleChange} />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 transition"
          >
            Guardar Paciente
          </button>
        </form>
      </div>
    </div>
  );
};

// 🌟 Componente Input reutilizable (sin cambios en el diseño)
const Input = ({ label, ...props }) => {
  return (
    <div className="flex flex-col">
      <label className="font-medium text-stone-800 mb-1">{label}</label>
      <input
        {...props}
        className="px-4 py-2 border border-stone-300 rounded-xl"
      />
    </div>
  );
};

export default SecretariaRegistrarPaciente;
