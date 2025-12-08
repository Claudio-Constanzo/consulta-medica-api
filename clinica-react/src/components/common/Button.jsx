const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
}) => {
  const baseStyle =
    "px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base";

  const variants = {
    // Café oscuro, texto blanco
    primary:
      "bg-stone-900 hover:bg-stone-800 text-white shadow-md hover:shadow-lg border border-transparent",
    // Botón blanco con borde café
    secondary:
      "bg-white text-stone-900 border border-stone-300 hover:bg-stone-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
