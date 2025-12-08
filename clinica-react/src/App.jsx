import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/user/UserDashboard";
import UserCitas from "./pages/user/UserCitas";
import UserAgendarHora from "./pages/user/UserAgendarHora";
import UserFichaMedica from "./pages/user/UserFichaMedica";

import DoctorPanel from "./pages/doctor/DoctorPanel";
import DoctorAgenda from "./pages/doctor/DoctorAgenda";
import DoctorFichas from "./pages/doctor/DoctorFichas";
import DoctorCrearFicha from "./pages/doctor/DoctorCrearFicha";
import DoctorPacientes from "./pages/doctor/DoctorPacientes";

import SecretariaPanel from "./pages/secretaria/SecretariaPanel";
import SecretariaPacientes from "./pages/secretaria/SecretariaPacientes";
import SecretariaRegistrarPaciente from "./pages/secretaria/SecretariaRegistrarPaciente";
import SecretariaEditarPaciente from "./pages/secretaria/SecretariaEditarPaciente";
import SecretariaFichas from "./pages/secretaria/SecretariaFichas";
import SecretariaFichaDetalle from "./pages/secretaria/SecretariaFichaDetalle";
import SecretariaAgendarHora from "./pages/secretaria/SecretariaAgendarHora";
import SecretariaAgendaDoctor from "./pages/secretaria/SecretariaAgendaDoctor";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Usuario */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/citas" element={<UserCitas />} />
        <Route path="/user/agendar" element={<UserAgendarHora />} />
        <Route path="/user/ficha-medica" element={<UserFichaMedica />} />

        {/* Doctor */}
        <Route path="/doctor/panel" element={<DoctorPanel />} />
        <Route path="/doctor/agenda" element={<DoctorAgenda />} />
        <Route path="/doctor/fichas" element={<DoctorFichas />} />
        <Route path="/doctor/fichas/crear" element={<DoctorCrearFicha />} />
        <Route path="/doctor/pacientes" element={<DoctorPacientes />} />

        {/* Secretaria */}
        <Route path="/secretaria/panel" element={<SecretariaPanel />} />
        <Route path="/secretaria/pacientes" element={<SecretariaPacientes />} />
        <Route path="/secretaria/pacientes/registrar" element={<SecretariaRegistrarPaciente />} />
        <Route path="/secretaria/pacientes/:id" element={<SecretariaEditarPaciente />} />
        <Route path="/secretaria/fichas" element={<SecretariaFichas />} />
        <Route path="/secretaria/fichas/:id" element={<SecretariaFichaDetalle />} />
        <Route path="/secretaria/agendar" element={<SecretariaAgendarHora />} />
        <Route path="/secretaria/agenda-doctor" element={<SecretariaAgendaDoctor />} />
        <Route path="/secretaria/registrar" element={<SecretariaRegistrarPaciente />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
