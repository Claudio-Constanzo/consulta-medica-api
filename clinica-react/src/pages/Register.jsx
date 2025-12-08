import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Button from "../components/common/Button";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submit = async () => {
      try {
        const payload = {
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.email,
          password: formData.password,
        };

        const res = await fetch("http://127.0.0.1:8000/registro/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setShowSuccessModal(true);
        } else {
          const err = await res.json();
          alert(
            "Error al registrar: " + (err.detail || JSON.stringify(err))
          );
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("Error de red al contactar el servidor.");
      }
    };

    submit();
  };

  return (
    <div className="min-h-screen bg-amber-50/60 flex flex-col items-center justify-center p-4 relative">
      {/* Volver */}
      <div className="absolute top-20 left-4 md:left-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-stone-500 hover:text-stone-900 text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Link>
      </div>

      {/* Tarjeta */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-8 border border-amber-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-stone-900">
            Crear Cuenta
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Regístrate para acceder a tu portal médico personal
          </p>
        </div>

        {/* Pestañas */}
        <div className="flex bg-amber-50 p-1 rounded-xl mb-6">
          <Link
            to="/login"
            className="flex-1 py-2 text-sm font-semibold text-stone-500 hover:text-stone-900 text-center"
          >
            Iniciar Sesión
          </Link>
          <button className="flex-1 py-2 text-sm font-semibold bg-white text-stone-900 rounded-lg shadow-sm">
            Registrarse
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Juan"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500/70 outline-none bg-amber-50/40"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              placeholder="Pérez"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500/70 outline-none bg-amber-50/40"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="tu@correo.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500/70 outline-none bg-amber-50/40"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500/70 outline-none bg-amber-50/40"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full py-3 mt-2">
            Registrarse
          </Button>
        </form>
      </div>

      {/* Modal éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-amber-100">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>

            <h3 className="text-2xl font-semibold text-stone-900 mb-2">
              ¡Registro Exitoso!
            </h3>
            <p className="text-stone-500 mb-6">
              Tu cuenta ha sido creada correctamente. Ahora puedes iniciar
              sesión para acceder a la plataforma.
            </p>

            <Button
              variant="primary"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Ir a Iniciar Sesión
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
