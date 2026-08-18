function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition focus:outline-none disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-300",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    ghost: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
