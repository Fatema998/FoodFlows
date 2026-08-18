function Input({ label, type = "text", error, ...props }) {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>}
      <input
        type={type}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
