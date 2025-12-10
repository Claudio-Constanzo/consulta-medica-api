import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://127.0.0.1:8000/registro/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Error al registrar el usuario.");
        return;
      }

      // Opcional: guardar datos básicos y mandar directo al dashboard
      localStorage.setItem("idUsuario", data.idUsuario);
      localStorage.setItem("pacienteId", data.pacienteId ?? "");
      localStorage.setItem("userName", data.nombre);
      localStorage.setItem("userApellido", data.apellido);
      localStorage.setItem("userEmail", data.email);

      // Después de registrarse lo mandamos al login o al dashboard
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/80 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-amber-100 p-8">
        {/* Volver al home */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 mb-4"
        >
          <ArrowLeft size={18} /> Volver al inicio
        </button>

        <h1 className="text-2xl md:text-3xl font-semibold text-stone-900 text-center mb-2">
          Crear Cuenta
        </h1>
        <p className="text-center text-stone-500 mb-6 text-sm">
          Regístrate para acceder a tu portal médico personal.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-stone-800 mb-1">
              Nombre
            </label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Ingrese nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-800 mb-1">
              Apellido
            </label>
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Ingrese apellido"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-800 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-800 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="*******"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-800 mb-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="*******"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 transition disabled:opacity-70"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-600 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-stone-900 hover:underline"
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
