import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/LogoW.webp";

const NavbarPublic = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-amber-100 shadow-sm sticky top-0 z-50">

      {/* NAV CON MAYOR ANCHURA Y MEJOR CENTRADO */}
      <nav className="w-full px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="Logo clínica"
            className="h-16 w-16 rounded-full object-cover"
          />
        </a>

        {/* MENÚ CENTRADO */}
        <ul className="hidden md:flex flex-1 justify-center items-center gap-12 text-[15px] font-medium text-stone-700">
          <li><a href="#home" className="hover:text-stone-900">Inicio</a></li>
          <li><a href="#services" className="hover:text-stone-900">Servicios</a></li>
          <li><a href="#about" className="hover:text-stone-900">Nosotros</a></li>
          <li><a href="#contacto" className="hover:text-stone-900">Contacto</a></li>
        </ul>

        {/* BOTONES DERECHA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">

          <Link
            to="/login"
            className="px-4 py-2 border border-stone-300 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
          >
            Iniciar Sesión
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-stone-900 text-sm font-medium text-white hover:bg-stone-800"
          >
            Registrarse
          </Link>

        </div>

        {/* BOTÓN MÓVIL */}
        <button
          className="md:hidden text-stone-700"
          onClick={() => setMobileOpen(o => !o)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MENÚ MÓVIL */}
      {mobileOpen && (
        <div className="md:hidden border-t border-amber-100 bg-white px-4 pb-4 space-y-3 text-sm font-medium text-stone-700">
          <a href="#home" onClick={() => setMobileOpen(false)} className="block pt-3">Inicio</a>
          <a href="#services" onClick={() => setMobileOpen(false)} className="block">Servicios</a>
          <a href="#about" onClick={() => setMobileOpen(false)} className="block">Nosotros</a>
          <a href="#contacto" onClick={() => setMobileOpen(false)} className="block">Contacto</a>

          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="block mt-4 px-4 py-2 border border-stone-300 rounded-lg text-center"
          >
            Iniciar Sesión
          </Link>

          <Link
            to="/register"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-2 rounded-lg bg-stone-900 text-white text-center"
          >
            Registrarse
          </Link>
        </div>
      )}

    </header>
  );
};

export default NavbarPublic;
