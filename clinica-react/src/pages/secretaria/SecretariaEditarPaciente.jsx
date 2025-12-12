import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/common/Button";

const API = "http://127.0.0.1:8000";

const SecretariaEditarPaciente = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const res = await fetch(`${API}/pacientes/${id}/`);
      const data = await res.json();
      setPaciente(data);
    };
    cargar();
  }, [id]);

  const handleChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    const res = await fetch(`${API}/pacientes/editar/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paciente),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error actualizando paciente:\n" + JSON.stringify(data));
      return;
    }

    alert("Paciente actualizado correctamente");
    navigate("/secretaria/pacientes");
  };

  if (!paciente) return <p className="p-6">Cargando...</p>;

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">

      <button
        onClick={() => navigate("/secretaria/pacientes")}
        className="flex items-center text-stone-600 hover:text-stone-900 gap-2 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <div className="bg-white p-8 rounded-3xl border border-amber-100 max-w-xl mx-auto">

        <h1 className="text-3xl font-semibold mb-6 text-stone-900">
          Editar Paciente
        </h1>

        <div className="space-y-4">
          {["nombre", "apellido", "email", "direccion", "telefono", "prevision"].map((f) => (
            <div key={f}>
              <label className="font-semibold text-stone-800 mb-1 block">
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </label>
              <input
                name={f}
                value={paciente[f] ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          ))}
        </div>

        <Button
          variant="primary"
          className="w-full mt-6"
          onClick={guardarCambios}
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};

export default SecretariaEditarPaciente;
