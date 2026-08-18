import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const roleOptions = [
  { id: "CUSTOMER", label: "Customer", icon: "🍔" },
  { id: "RESTAURANT_OWNER", label: "Restaurant", icon: "🏪" },
  { id: "DELIVERY_RIDER", label: "Rider", icon: "🛵" },
];

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "", submit: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register(form);

      if (form.role === "CUSTOMER") {
        navigate("/onboarding/customer");
      } else if (form.role === "RESTAURANT_OWNER") {
        navigate("/onboarding/owner");
      } else {
        navigate("/onboarding/rider");
      }
    } catch (error) {
      setErrors({ submit: error?.message || "Registration failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight text-orange-500">FoodFlow</h1>
          <p className="text-slate-500 mt-2">Create your account and start your journey.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <h2 className="text-2xl font-bold text-slate-800">Create your account 🍔</h2>
          <p className="text-slate-500 mt-1 mb-6">Join FoodFlow today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
              {errors.fullName && <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="+1234567890"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
              {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 text-sm font-medium text-slate-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(event) => updateField("confirmPassword", event.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 text-sm font-medium text-slate-500"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">I want to join as</label>
              <div className="grid grid-cols-3 gap-3">
                {roleOptions.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => updateField("role", role.id)}
                    className={`p-4 rounded-2xl border text-center transition ${
                      form.role === role.id
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="text-2xl">{role.icon}</div>
                    <div className="text-sm font-semibold mt-2">{role.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {errors.submit && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300 text-white font-semibold py-3 rounded-xl transition"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;