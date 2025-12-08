import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      correo: formData.email,
      password: formData.password,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Credenciales incorrectas");
        return;
      }

      // Guarda lo que ya guardabas
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.nombre);
      localStorage.setItem("userApellido", data.apellido);
      localStorage.setItem("userCorreo", data.correo);
      localStorage.setItem("userRol", data.rol);

      // Aquí puedes mapear roles reales de la clínica
      if (data.rol === "doctor") {
        navigate("/doctor/panel");
      } else if (data.rol === "secretaria") {
        navigate("/secretaria/panel");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("No se pudo conectar con el servidor");
    }
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
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-stone-900">
            Iniciar Sesión
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Accede a tu portal médico personal
          </p>
        </div>

        {/* Pestañas */}
        <div className="flex bg-amber-50 p-1 rounded-xl mb-8">
          <button className="flex-1 py-2 text-sm font-semibold bg-white text-stone-900 rounded-lg shadow-sm">
            Iniciar Sesión
          </button>
          <Link
            to="/register"
            className="flex-1 py-2 text-sm font-semibold text-stone-500 hover:text-stone-900 text-center"
          >
            Registrarse
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="tu@correo.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500/70 outline-none bg-amber-50/40"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500/70 outline-none bg-amber-50/40"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full py-3 mt-3">
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
