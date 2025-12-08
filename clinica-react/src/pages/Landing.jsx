import { useState } from "react";
import NavbarPublic from "../components/layout/NavbarPublic";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";
import medicoImg from "../assets/images/medicoW.webp"; 

const serviciosCarousel = [
  {
    titulo: "Enfermedades del oído",
    desc: "Diagnóstico y tratamiento de infecciones, pérdida auditiva, vértigo y tinnitus.",
  },
  {
    titulo: "Patologías nasales y sinusales",
    desc: "Atención de rinitis, sinusitis y desviación del tabique, con tratamientos médicos o quirúrgicos.",
  },
  {
    titulo: "Trastornos de la voz y la laringe",
    desc: "Evaluación y manejo de disfonías, nódulos y alteraciones vocales.",
  },
  {
    titulo: "Otorrinolaringología pediátrica",
    desc: "Patologías de oídos, adenoides, amígdalas y problemas respiratorios en niños.",
  },
  {
    titulo: "Trastornos del sueño",
    desc: "Diagnóstico y tratamiento del ronquido y apnea del sueño para mejorar la respiración nocturna.",
  },
];

const Landing = () => {
  const [indice, setIndice] = useState(0);
  const total = serviciosCarousel.length;

  const irA = (nuevo) => {
    if (nuevo < 0) nuevo = total - 1;
    if (nuevo >= total) nuevo = 0;
    setIndice(nuevo);
  };

  const siguiente = () => irA(indice + 1);
  const anterior = () => irA(indice - 1);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* NAVBAR */}
      <NavbarPublic />

      {/* CONTENIDO */}
      <main className="flex-1">
        {/* HERO */}
        <section id="home" className="bg-amber-50/80 pt-28 pb-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-semibold text-stone-900 mb-4">
                Tu Salud es Nuestra Prioridad
              </h1>

              <p className="text-stone-600 mb-6">
                Atención médica de la más alta calidad, con énfasis en un trato
                cercano y personalizado.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* REDIRECCIÓN AL LOGIN */}
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = "/login")}
                >
                  Agendar Cita
                </Button>

                <Button
                  variant="secondary"
                  onClick={() =>
                    document.querySelector("#services")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  Nuestros Servicios
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">

            <header className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-900">
                Nuestros Servicios
              </h2>
              <p className="text-stone-600 mt-3">
                Ofrecemos una amplia gama de servicios tratados por el especialista.
              </p>
            </header>

            {/* Carrusel */}
            <div className="relative flex items-center gap-4">

              <button
                onClick={anterior}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-amber-200 bg-white shadow hover:bg-amber-50"
              >
                ‹
              </button>

              <div className="overflow-hidden flex-1">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${indice * 100}%)` }}
                >
                  {serviciosCarousel.map((srv) => (
                    <article
                      key={srv.titulo}
                      className="min-w-full bg-amber-50/60 border border-amber-100 rounded-3xl p-8 shadow-sm"
                    >
                      <h3 className="text-xl font-semibold text-stone-900 mb-2">
                        {srv.titulo}
                      </h3>
                      <p className="text-stone-700">{srv.desc}</p>
                    </article>
                  ))}
                </div>
              </div>

              <button
                onClick={siguiente}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-amber-200 bg-white shadow hover:bg-amber-50"
              >
                ›
              </button>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-4">
              {serviciosCarousel.map((_, i) => (
                <button
                  key={i}
                  onClick={() => irA(i)}
                  className={`h-2 w-2 rounded-full ${
                    i === indice ? "bg-amber-600" : "bg-amber-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* NOSOTROS */}
        <section id="about" className="py-20 bg-amber-50/60">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

            <div className="rounded-3xl shadow overflow-hidden h-80">
              <img
                src={medicoImg}
                alt="Médico especialista"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-900">
                Más de 30 Años de Experiencia
              </h2>

              <p className="text-stone-600">
                En nuestra consulta nos dedicamos a proporcionar atención médica
                de la más alta calidad, con énfasis en la atención personalizada.
              </p>

              <ul className="space-y-2 text-stone-700">
                <li>✓ Atención por especialista de vasta experiencia.</li>
                <li>✓ Certificación por la Universidad de Chile.</li>
                <li>✓ Otomicroscopía y nasofibroscopía.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 text-center mb-10">
              Contacto y Ubicación
            </h2>

            <div className="grid md:grid-cols-2 gap-10">

              <div className="space-y-4 text-sm md:text-base">
                <div>
                  <strong className="text-stone-900">Dirección</strong>
                  <p className="text-stone-700">
                    Colipi 484, Plaza Real, Torre Flamenco Oficina 504, 5to piso
                    <br /> Copiapó, Atacama
                  </p>
                </div>

                <div>
                  <strong className="text-stone-900">Teléfono</strong>
                  <p className="text-stone-700">+52 2230896</p>
                </div>

                <div>
                  <strong className="text-stone-900">Horarios</strong>
                  <p className="text-stone-700">
                    Lunes a jueves: 10:30 am – 01:00 pm y 03:00 pm – 07:00 pm
                  </p>
                  <p className="text-stone-700">Viernes: 10:30 am – 01:00 pm</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 text-center shadow">
                <p className="text-stone-700 mb-3">Mapa de Ubicación</p>

                <a
                  href="https://www.google.com/maps/place/27%C2%B022'01.5%22S+70%C2%B019'53.3%22W/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="primary">Ver en Google Maps</Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
