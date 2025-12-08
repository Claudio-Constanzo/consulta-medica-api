const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto text-center opacity-90 text-sm">
        © {new Date().getFullYear()} Clínica. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
