import { useState, useEffect } from "react";
import { ArrowLeft, Edit, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SecretariaPacientes = () => {
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState("");

  const mockPacientes = [
    {
      id: 1,
      nombre: "John",
      apellido: "Smith",
      correo: "john.smith@gmail.com",
      direccion: "Avenida Central 123",
      telefono: "+56 9 2345 6789",
      prevision: "Fonasa"
    },
    {
      id: 2,
      nombre: "Ana",
      apellido: "Torres",
      correo: "ana.torres@gmail.com",
      direccion: "Calle Norte 55",
      telefono: "+56 9 9876 5432",
      prevision: "Isapre Colmena"
    }
  ];

  useEffect(() => {
    // ❌ fetch desactivado
    // const res = await fetch(...)

    // ✔ mock
    setPacientes(mockPacientes);
  }, []);

  const filtered = pacientes.filter((p) =>
    `${p.nombre} ${p.apellido}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50/60 p-6">

      <button
        onClick={() => navigate("/secretaria/panel")}
        className="flex items-center text-stone-600 hover:text-stone-900 gap-2 mb-6"
      >
        <ArrowLeft size={20} /> Volver
      </button>

      <h1 className="text-3xl font-semibold text-stone-900 mb-6">
        Pacientes
      </h1>

      {/* BUSCADOR */}
      <div className="flex items-center border border-amber-200 rounded-xl bg-white px-4 py-2 mb-6 max-w-xl">
        <Search size={18} className="text-stone-600" />
        <input
          placeholder="Buscar paciente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full ml-3"
        />
      </div>

      {/* LISTA DE PACIENTES */}
      <div className="space-y-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-xl shadow border border-amber-100 flex justify-between"
          >
            <div>
              <p className="font-semibold text-stone-900">
                {p.nombre} {p.apellido}
              </p>
              <p className="text-stone-600 text-sm">{p.correo}</p>
            </div>

            <button
              onClick={() => navigate(`/secretaria/pacientes/${p.id}`)}
              className="flex items-center gap-2 text-stone-700 hover:text-stone-900"
            >
              <Edit size={18} /> Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretariaPacientes;
