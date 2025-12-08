import { Link } from "react-router-dom";

const DashboardCard = ({ Icon, title, subtitle, buttonText, to }) => {
  return (
    <div className="bg-white rounded-3xl shadow border border-amber-100 p-6 flex flex-col">
      {/* Ícono */}
      <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-xl mb-4">
        <Icon className="text-amber-700" size={28} />
      </div>

      {/* Título */}
      <h2 className="text-xl font-semibold text-stone-900 mb-1">{title}</h2>

      {/* Subtítulo */}
      <p className="text-stone-600 flex-grow">{subtitle}</p>

      {/* Botón */}
      <Link
        to={to}
        className="mt-4 w-full text-center bg-stone-900 hover:bg-stone-800 text-white py-2 rounded-xl font-semibold transition"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default DashboardCard;
