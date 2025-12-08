import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
// si tienes logo de la clínica, impórtalo aquí:
// import logo from "../../assets/clinica/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", path: "#inicio" },
    { name: "Servicios", path: "#servicios" },
    { name: "Nosotros", path: "#nosotros" },
    { name: "Contacto", path: "#contacto" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-neutral-100 fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo + nombre */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden">
              {/* Reemplaza este círculo por tu logo de la clínica */}
              <span className="text-amber-700 font-bold text-lg">C</span>
              {/* <img src={logo} alt="Clínica" className="w-full h-full object-cover" /> */}
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-stone-900 leading-none">
                Clínica
              </span>
              <span className="text-xs text-stone-500">
                Otorrinolaringología
              </span>
            </div>
          </Link>

          {/* Links centro (desktop) */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Botones derecha (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="secondary">Iniciar Sesión</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">Registrarse</Button>
            </Link>
          </div>

          {/* Menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              className="text-stone-700"
            >
              {isMenuOpen ? (
                <span className="text-2xl">&times;</span>
              ) : (
                <span className="text-2xl">&#9776;</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block px-3 py-2 text-sm text-stone-700 hover:text-stone-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
