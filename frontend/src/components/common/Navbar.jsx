import { Link } from "react-router-dom";

function Navbar({ searchQuery = "", onSearchChange = () => {} }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF5200] text-lg font-black text-white shadow-lg shadow-orange-200">
            F
          </span>
          <div>
            <span className="block text-xl font-black tracking-tight text-[#FF5200]">FoodFlow</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Fresh & fast</span>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 xl:flex">
          <span>📍</span>
          <span className="font-medium">Dhaka, Bangladesh</span>
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm">
            <span className="text-base">🔎</span>
            <input
              type="text"
              placeholder="Search food, restaurant or cuisine"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-slate-600 transition hover:text-[#FF5200]">Home</Link>
          <Link to="/orders" className="text-sm font-medium text-slate-600 transition hover:text-[#FF5200]">Orders</Link>
          <Link to="/cart" className="text-sm font-medium text-slate-600 transition hover:text-[#FF5200]">Cart</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#FF5200] hover:text-[#FF5200] sm:inline-flex">
            Login
          </Link>
          <Link to="/cart" className="relative rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-lg shadow-sm transition hover:border-[#FF5200]">
            🛒
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5200] text-[10px] font-bold text-white">
              2
            </span>
          </Link>
          <button className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-lg md:hidden">☰</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
