import { Link } from "react-router-dom";

function OnboardingHeader() {
  return (
    <header className="w-full max-w-5xl mx-auto flex items-center justify-between px-4 py-5">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-orange-500"
      >
        FoodFlow
      </Link>

      {/* Exit */}
      <button
        type="button"
        className="text-sm font-medium text-slate-500 hover:text-orange-500 transition"
      >
        Exit & Complete Later
      </button>
    </header>
  );
}

export default OnboardingHeader;